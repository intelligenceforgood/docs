# Reports & Evidence

Every investigation produces a set of artifacts — human-readable reports, machine-readable threat intelligence, and tamper-evident evidence packages. This page explains each artifact and how to use it.

## Output directory structure

After an investigation completes, artifacts are saved to `data/evidence/<investigation-id>/`:

```
data/evidence/<investigation-id>/
├── report.pdf                  # Formatted PDF report with embedded evidence
├── report.md                   # Markdown version of the report
├── investigation.json          # Full structured result (machine-readable)
├── leo_evidence_report.md      # Law enforcement evidence summary
├── stix_bundle.json            # STIX 2.1 threat indicators (IOC bundle)
├── evidence.zip                # All artifacts with chain-of-custody manifest
├── wallet_manifest.json        # Extracted wallet addresses and metadata
├── screenshot.png              # Full-page screenshot
├── dom.html                    # DOM snapshot
├── network.har                 # HAR network recording
└── screenshots/                # Per-step screenshots (active investigations)
    ├── step_001_load.png
    ├── step_002_register.png
    └── ...
```

> Some files only appear when the target site is reachable and data is available. If the domain has been taken down, the report indicates which data could not be collected.

## PDF report

The PDF report is a self-contained document with an auto-generated table of contents and embedded evidence appendices:

| Section                | Contents                                                           |
| ---------------------- | ------------------------------------------------------------------ |
| **Target Information** | URL, domain, investigation timestamp                               |
| **Risk Assessment**    | Risk score (0–100), fraud classification                           |
| **WHOIS Data**         | Registrar, creation/expiration dates, registrant info, nameservers |
| **DNS Records**        | A, MX, NS, TXT records                                             |
| **SSL Certificate**    | Issuer, validity period, self-signed detection                     |
| **IP Geolocation**     | Hosting country, city, ASN, organization                           |
| **Form Fields**        | Every input the site presents                                      |
| **Wallet Addresses**   | Extracted crypto addresses with token/network                      |
| **PII Exposure**       | What personal data the scam collects, in what order                |
| **External Resources** | Third-party scripts, stylesheets, iframes                          |
| **VirusTotal**         | Detection count and engine results                                 |
| **Agent Session**      | Step-by-step action log (active investigations)                    |

### Embedded appendices

The PDF embeds text-based evidence as appendix pages:

- **A: Screenshot** — full-page capture
- **B: DOM Snapshot** — first 500 lines of HTML
- **C: Investigation JSON** — first 300 lines of structured data
- **D: Network Activity** — HAR summary table with first 30 requests
- **E: Wallet Manifest** — all extracted wallet addresses
- **F: STIX IOC Bundle** — threat indicators

Each appendix links back to the main Evidence Artifacts table, and each table entry links to its appendix. Binary artifacts (agent video) are noted as "see evidence ZIP."

Control embedding with the `embed_evidence` parameter (default: `true`).

## Downloading from the Console

On the investigation detail page (**Results** tab):

- Click **Download PDF Report** for the formatted report.
- Click **Download Evidence ZIP** for the complete package.
- Click **Export Wallets** to download wallet data as XLSX or CSV.

## LEA evidence report

The `leo_evidence_report.md` is tailored for law enforcement submission. It uses plain language, avoids technical jargon, and includes:

- Investigation summary and timeline.
- Wallet addresses with blockchain network identification.
- PII exposure analysis — which data the scam collected from the synthetic identity.
- Chain-of-custody statement confirming all PII used was synthetic.
- Evidence integrity: SHA-256 hashes for every artifact.

## STIX 2.1 bundle

The `stix_bundle.json` is a machine-readable threat intelligence file containing:

- **Indicators** — IP addresses, domains, URLs, and wallet addresses as threat indicators.
- **Observed data** — what SSI actually saw during the investigation.
- **Relationships** — links between indicators and the scam infrastructure.

Import into threat intelligence platforms (MISP, OpenCTI, etc.) for correlation with other investigations.

## Evidence ZIP

The `evidence.zip` is the primary package for evidence sharing. It contains:

- All investigation artifacts (screenshots, DOM, HAR, reports).
- `manifest.json` with SHA-256 hashes for every file — proves nothing was modified after collection.
- `wallet_manifest.json` with extracted wallet addresses.
- A legal notice confirming all PII used was synthetic.

## Wallet manifest

The `wallet_manifest.json` lists every wallet address found during the investigation:

```json
{
  "investigation_id": "abc123",
  "extracted_at": "2026-02-22T10:30:00Z",
  "wallets": [
    {
      "address": "TQn9Y2khEsLJW1ChVWFMSMzKC9BhFoqqvd",
      "token": "USDT",
      "network": "Tron",
      "confidence": "high",
      "source": "deposit_page",
      "page_url": "https://scam-site.example/deposit"
    }
  ]
}
```

## API endpoints for evidence

| Method | Path                                | Description                                                                |
| ------ | ----------------------------------- | -------------------------------------------------------------------------- |
| `GET`  | `/investigations/{id}`              | Full investigation detail (includes wallets, PII exposures, agent actions) |
| `GET`  | `/investigations/{id}/wallets.xlsx` | Export wallets as XLSX                                                     |
| `GET`  | `/investigations/{id}/wallets.csv`  | Export wallets as CSV                                                      |
| `GET`  | `/report/{task_id}/pdf`             | Download PDF report                                                        |
