# SSI Architecture

The Scam Site Investigator (SSI) is an always-on Cloud Run service that automates browser-based reconnaissance, OSINT collection, and cryptocurrency wallet extraction for suspected scam websites.

## Investigation Flow

![SSI Architecture](../assets/architecture/ssi_architecture.svg)

<details>
<summary>Mermaid source (click to expand)</summary>

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'14px', 'fontFamily':'system-ui, sans-serif'}, 'flowchart': {'curve':'basis', 'padding':16}}}%%
flowchart TB
    classDef trigger   fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef ssi       fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#bf360c
    classDef store     fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#004d40
    classDef ai        fill:#fce4ec,stroke:#ad1457,stroke-width:2px,color:#880e4f
    classDef external  fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px,color:#4a148c
    classDef core      fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20

    subgraph Trigger["🔗 Investigation Trigger"]
        CLI["ssi investigate<br/>CLI command"]:::trigger
        API["Core API<br/>POST /trigger/investigate"]:::trigger
    end

    subgraph SSI["🕵️ SSI Service (ssi-svc)"]
        Orchestrator["Orchestrator<br/>investigation pipeline"]:::ssi

        subgraph Browser["🌐 Browser Automation"]
            Playwright["Playwright<br/>Chromium headless"]:::ssi
            Screenshots["Screenshot capture<br/>full-page + viewport"]:::ssi
            DOMExtract["DOM extraction<br/>forms · scripts · links"]:::ssi
        end

        subgraph OSINT["🔍 OSINT Modules"]
            DNS["Passive DNS<br/>WHOIS · registrar"]:::ssi
            TLS["TLS Certificate<br/>issuer · SAN · expiry"]:::ssi
            Hosting["Hosting analysis<br/>IP · ASN · CDN"]:::ssi
        end

        subgraph Wallets["💰 Wallet Extraction"]
            CryptoScan["Regex + heuristic scan<br/>BTC · ETH · USDT"]:::ssi
            Allowlist["Wallet allowlist<br/>filter known-good"]:::ssi
        end

        Identity["Identity Vault<br/>synthetic PII generation"]:::ssi
    end

    subgraph Storage["💾 Persistence"]
        ScanStore["ScanStore<br/>scan results · sessions"]:::store
        DB[("Cloud SQL PG 15<br/>cases · entities · wallets")]:::store
        Evidence[("GCS · i4g-evidence<br/>screenshots · DOM")]:::store
    end

    subgraph CorePlatform["⚡ Core Platform"]
        CoreAPI["Core API<br/>case management"]:::core
        Analytics["Analytics Aggregation<br/>entity stats refresh"]:::core
    end

    subgraph External["🌍 External"]
        ECX["eCrimeX<br/>indicator sharing"]:::external
        Gemini["Vertex AI · Gemini<br/>classify · extract"]:::ai
    end

    CLI --> Orchestrator
    API --> Orchestrator

    Orchestrator --> Playwright
    Playwright --> Screenshots
    Playwright --> DOMExtract

    Orchestrator --> DNS
    Orchestrator --> TLS
    Orchestrator --> Hosting

    DOMExtract --> CryptoScan
    CryptoScan --> Allowlist

    Orchestrator --> Identity

    Orchestrator --> ScanStore
    ScanStore -- "create case record" --> DB
    Screenshots --> Evidence
    Allowlist -- "wallet indicators" --> DB

    Orchestrator -- "classify site" --> Gemini

    DB -- "entity stats" --> Analytics
    DB -- "share indicators" --> ECX
    CoreAPI -- "query cases" --> DB
```

</details>

## Key Components

| Component             | Location                               | Purpose                                                                  |
| :-------------------- | :------------------------------------- | :----------------------------------------------------------------------- |
| **Orchestrator**      | `src/ssi/investigator/orchestrator.py` | Entry point; coordinates browser, OSINT, and wallet extraction steps     |
| **Browser Module**    | `src/ssi/browser/`                     | Playwright-based page navigation, screenshot capture, DOM extraction     |
| **OSINT Modules**     | `src/ssi/osint/`                       | Passive DNS, WHOIS, TLS certificate, and hosting analysis                |
| **Wallet Extraction** | Embedded in orchestrator               | Regex + heuristic scanning for cryptocurrency addresses (BTC, ETH, USDT) |
| **Identity Vault**    | `src/ssi/identity/vault.py`            | Generates synthetic PII for safe interaction with suspicious sites       |
| **ScanStore**         | `src/ssi/store/scan_store.py`          | Persists scan results and creates cases via direct DB writes             |
| **Wallet Allowlist**  | `config/wallet_allowlist.json`         | Filters known-good exchange/service wallets from indicator submissions   |

## Integration with Core

SSI writes directly to the shared database — it does **not** go through the Core API for data persistence. This design keeps investigation latency low and avoids circular API dependencies.

| Integration Point             | Direction      | Mechanism                                                                               |
| :---------------------------- | :------------- | :-------------------------------------------------------------------------------------- |
| **Case creation**             | SSI → DB       | `ScanStore.create_case_record()` writes cases with wallet indicators and OSINT entities |
| **Evidence storage**          | SSI → GCS      | Screenshots, DOM snapshots, and session logs stored in the shared evidence bucket       |
| **Investigation trigger**     | Core API → SSI | `POST /trigger/investigate` on the SSI service endpoint                                 |
| **Case ↔ investigation link** | Core DB        | `case_investigations` join table — one case can have many investigations and vice versa |
| **Auto-investigation**        | Core → SSI     | `auto_investigate` job finds case URLs, deduplicates, and triggers SSI via HTTP         |
| **URL deduplication**         | Core DB        | `site_scans.normalized_url` with staleness window prevents redundant scans              |
| **eCrimeX sharing**           | DB → ECX       | Extracted indicators are shared via the eCrimeX integration pipeline                    |
| **Analytics refresh**         | DB → Analytics | Entity stats from SSI-created cases feed into the aggregation pipeline                  |

### Case ↔ Investigation Linking

The `case_investigations` join table provides a many-to-many relationship between cases and SSI investigations. A single investigation (identified by `scan_id`) can be linked to multiple cases that share the same URL, and a single case can have multiple investigations for different URLs:

```
cases ──1:N── case_investigations ──N:1── site_scans
              (case_id, scan_id)
              trigger_type:  manual | auto | case_created
```

Linking happens at three points:

1. **Case-created scans** — `ScanStore.create_case_record()` writes to both `site_scans.case_id` and `case_investigations` with `trigger_type='case_created'`.
2. **Manual triggers** — `POST /cases/{id}/investigate` creates a `case_investigations` row with `trigger_type='manual'`.
3. **Auto-investigation** — The `auto_investigate` worker job queries URL indicators, deduplicates by `normalized_url`, and links results with `trigger_type='auto'`.

### Auto-Investigation

The `auto_investigate` job (`src/i4g/worker/jobs/auto_investigate.py`) runs as a Cloud Run job or via CLI:

1. Query `indicators` for URLs not yet linked to any investigation.
2. Normalize and group URLs to avoid duplicate triggers.
3. Filter through the domain blocklist (configurable via `auto_investigate.domain_blocklist`).
4. Check each URL against `site_scans.normalized_url` with a staleness window.
5. Trigger SSI investigations for qualifying URLs.
6. Link results back to all originating cases via `case_investigations`.

Configuration lives under the `auto_investigate` settings section — see [Configuration](../config/settings.md).

### Evidence Storage

Evidence artifacts (screenshots, DOM snapshots, reports) use UUID-prefix sharding for even distribution across storage backends:

```
scans/{hex[0:2]}/{hex[2:4]}/{scan_id}/
  report.pdf
  screenshots/step-001.png
  metadata.json
```

See [Evidence Storage](evidence-storage.md) for the full design.

## Deployment

- **Runtime:** Always-on Cloud Run service (min instances = 1 for warm start)
- **Docker image:** `ssi-svc` (includes Playwright + Chromium)
- **Conda environment:** `i4g-ssi` (separate from core `i4g`)
- **Config:** `SSI_*` environment variables (see `ssi/config/settings.default.toml`)

For the full SSI user guide, see the [Scam Site Investigator](../ssi/README.md) section.
