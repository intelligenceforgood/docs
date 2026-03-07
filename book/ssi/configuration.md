# Configuration

SSI uses a layered configuration system. Settings resolve in this order (last wins):

1. `config/settings.default.toml` — shared defaults checked into the repo.
2. `config/settings.<env>.toml` — environment-specific (e.g., `settings.dev.toml`).
3. `config/settings.local.toml` — personal overrides (git-ignored).
4. Environment variables (`SSI_*` with `__` for nesting).
5. CLI flags — last-mile overrides.

View the resolved configuration:

```bash
ssi settings show
```

## Environment profiles

| `SSI_ENV`         | LLM                        | Storage                   | Typical use        |
| ----------------- | -------------------------- | ------------------------- | ------------------ |
| `local` (default) | Ollama (local)             | SQLite + local filesystem | Development, demos |
| `dev`             | Gemini Flash via Vertex AI | PostgreSQL + GCS          | Staging, testing   |
| `prod`            | Gemini Flash via Vertex AI | PostgreSQL + GCS          | Production         |

## Key settings

These are the settings most users and admins adjust. All use the `SSI_` prefix; double underscores (`__`) denote nesting.

### OSINT API keys

Passive scans are more thorough with API keys. Without them, SSI skips those checks or uses free-tier fallbacks.

| Variable                        | Description        | How to get one                                                   |
| ------------------------------- | ------------------ | ---------------------------------------------------------------- |
| `SSI_OSINT__VIRUSTOTAL_API_KEY` | VirusTotal API key | Free at [virustotal.com](https://www.virustotal.com/gui/join-us) |
| `SSI_OSINT__URLSCAN_API_KEY`    | urlscan.io API key | Free at [urlscan.io](https://urlscan.io/user/signup)             |
| `SSI_OSINT__IPINFO_TOKEN`       | ipinfo.io token    | Free at [ipinfo.io](https://ipinfo.io/signup)                    |

### Browser

| Variable                | Description          | Default |
| ----------------------- | -------------------- | ------- |
| `SSI_BROWSER__HEADLESS` | Run browser headless | `true`  |

Set to `false` to watch the agent interact with the site in a visible browser window (useful for debugging).

### LLM

| Variable            | Description                       | Default    |
| ------------------- | --------------------------------- | ---------- |
| `SSI_LLM__PROVIDER` | LLM provider (`ollama`, `vertex`) | `ollama`   |
| `SSI_LLM__MODEL`    | Model name                        | `llama3.1` |

### Core integration

SSI writes investigation results directly to the core database (shared Cloud SQL in cloud, shared SQLite in local dev). The `SSI_STORAGE__DB_URL` setting controls which database SSI connects to.

| Variable                        | Description                                           | Default                               |
| ------------------------------- | ----------------------------------------------------- | ------------------------------------- |
| `SSI_STORAGE__DB_URL`           | Database URL for shared storage                       | `sqlite:///../core/data/i4g_store.db` |
| `SSI_INTEGRATION__CORE_API_URL` | i4g core API URL (for event relay + guidance polling) | `http://localhost:8000`               |
| `SSI_INTEGRATION__PUSH_TO_CORE` | Create case record after investigation                | `true`                                |

> In production, SSI does not run its own API service. All SSI API endpoints (history, wallets, evidence, playbooks) are served by the Core API. The standalone SSI FastAPI app is used only for local development.

### eCrimeX (eCX) enrichment

SSI enriches investigations with community intelligence from the [APWG eCrimeX](https://ecrimex.net) platform. When enabled, SSI queries eCX for known phishing URLs, malicious domains, suspicious IPs, and cryptocurrency addresses linked to fraud.

| Variable                      | Description                               | Default                        |
| ----------------------------- | ----------------------------------------- | ------------------------------ |
| `SSI_ECX__ENABLED`            | Enable eCX integration                    | `false`                        |
| `SSI_ECX__API_KEY`            | eCX API bearer token                      | (none)                         |
| `SSI_ECX__BASE_URL`           | eCX API base URL                          | `https://api.ecrimex.net`      |
| `SSI_ECX__ATTRIBUTION`        | Attribution string sent with eCX requests | `i4g-ssi`                      |
| `SSI_ECX__TIMEOUT`            | HTTP timeout in seconds                   | `10`                           |
| `SSI_ECX__ENRICHMENT_ENABLED` | Auto-enrich during investigations         | `true`                         |
| `SSI_ECX__CACHE_TTL_HOURS`    | Hours to cache enrichment results         | `24`                           |
| `SSI_ECX__CURRENCY_MAP_PATH`  | Path to eCX currency symbol mapping JSON  | `config/ecx_currency_map.json` |

### eCX submission (Phase 2)

SSI can submit investigation findings back to eCX. Two safety gates prevent accidental submissions.

| Variable                               | Description                                         | Default |
| -------------------------------------- | --------------------------------------------------- | ------- |
| `SSI_ECX__SUBMISSION_ENABLED`          | Enable submission pipeline (safety gate 1)          | `false` |
| `SSI_ECX__SUBMISSION_AGREEMENT_SIGNED` | Confirm APWG data sharing agreement (safety gate 2) | `false` |
| `SSI_ECX__AUTO_SUBMIT_THRESHOLD`       | Risk score >= this auto-submits to eCX              | `80`    |
| `SSI_ECX__QUEUE_THRESHOLD`             | Risk score >= this queues for analyst review        | `50`    |

Both `SUBMISSION_ENABLED` and `SUBMISSION_AGREEMENT_SIGNED` must be `true` before any indicator data leaves SSI.

### eCX polling (Phase 3)

SSI can poll eCX for new records and optionally trigger investigations automatically. The poller uses cursor-based delta polling — it only fetches records newer than the last poll.

| Variable                                | Description                                   | Default |
| --------------------------------------- | --------------------------------------------- | ------- |
| `SSI_ECX__POLLING_ENABLED`              | Enable inbound polling                        | `false` |
| `SSI_ECX__POLLING_MODULES`              | eCX modules to poll (comma-separated)         | `phish` |
| `SSI_ECX__POLLING_INTERVAL_MINUTES`     | Cloud Scheduler cadence                       | `15`    |
| `SSI_ECX__POLLING_CONFIDENCE_THRESHOLD` | Minimum confidence for polled records         | `50`    |
| `SSI_ECX__POLLING_AUTO_INVESTIGATE`     | Auto-trigger SSI investigations for new phish | `false` |
| `SSI_ECX__POLLING_BRANDS`               | Brand allowlist (empty = all)                 | `[]`    |
| `SSI_ECX__POLLING_TLDS`                 | TLD allowlist (empty = all)                   | `[]`    |

To enable eCX enrichment locally, add to `config/settings.local.toml`:

```toml
[ecx]
enabled = true
api_key = "your-ecx-api-key"
```

## Local config file

Create `config/settings.local.toml` (git-ignored) for persistent local overrides:

```toml
[osint]
virustotal_api_key = "your-key-here"
ipinfo_token = "your-token-here"

[browser]
headless = false  # Watch the browser in action
```

> For the complete environment variable reference (40+ settings covering stealth, CAPTCHA, cost budgets, evidence storage, and more), see the [SSI Developer Guide](https://github.com/intelligenceforgood/ssi/blob/main/docs/developer_guide.md).
