# Scam Site Investigator

The Scam Site Investigator (SSI) automates the analysis of suspicious websites — from passive reconnaissance to full AI-driven scam funnel traversal. It discovers infrastructure behind phishing, crypto, and romance-scam sites, extracts cryptocurrency wallet addresses, and generates court-ready evidence packages.

> **Deployment note:** In production, all SSI API endpoints are served by the core FastAPI gateway (no standalone `ssi-api` service). The `ssi` CLI and standalone FastAPI app remain available for local development and testing. The SSI Cloud Run Job handles browser automation and OSINT, writing results directly to the shared Cloud SQL database.

## Who is this for?

| Audience            | Typical workflow                                                                 |
| ------------------- | -------------------------------------------------------------------------------- |
| **Analysts**        | Submit URLs in the Console, review risk scores, download evidence                |
| **Investigators**   | Use live monitoring to watch the AI agent interact with scam sites in real time  |
| **Admins**          | Automate batch scans via the `ssi` CLI; manage configuration                     |
| **Law Enforcement** | Receive evidence ZIPs, STIX bundles, and PDF reports with chain-of-custody proof |

## Key capabilities

- **Passive reconnaissance** — WHOIS, DNS, SSL/TLS, GeoIP, VirusTotal, urlscan.io, form field inventory, screenshot, DOM capture, and HAR recording. No interaction with the target site.
- **Active investigation** — An AI agent fills forms with synthetic (provably fake) PII, follows the scam funnel page by page, and records every step.
- **Wallet extraction** — Regex + LLM verification discovers cryptocurrency addresses (ETH, BTC, TRX, SOL, and 20+ other networks). Results export to XLSX, CSV, or JSON.
- **Live monitoring** — Watch the agent work in real time via the Console or WebSocket. Send guidance commands when manual intervention is needed.
- **Playbooks** — Predefined step sequences for known scam-site templates skip LLM calls and execute faster, with automatic fallback to the AI agent if a step fails.
- **Evidence packaging** — PDF reports, Markdown summaries, LEA reports, STIX 2.1 bundles, and signed evidence ZIPs with SHA-256 manifests.
- **Batch processing** — Feed a file of URLs and investigate them in parallel with concurrency control and resume support.

## How to access

| Surface         | URL / Command                                                                           | Notes                                                                 |
| --------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **i4g Console** | `https://app.intelligenceforgood.org/ssi` (prod) or `http://localhost:3000/ssi` (local) | Primary interface — all API calls route through the core gateway      |
| **`ssi` CLI**   | `ssi investigate url "<URL>"`                                                           | For admins and scripted automation (local dev / standalone mode only) |

## Section map

- [Getting Started](getting-started.md) — access the Console and run your first investigation.
- [Investigating Sites](investigating-sites.md) — passive scans, full investigations, and how the AI agent works.
- [Wallet Extraction](wallet-extraction.md) — discover, validate, and export cryptocurrency wallet addresses.
- [Live Monitoring](live-monitoring.md) — watch investigations in real time and send guidance commands.
- [Playbooks](playbooks.md) — understand and manage predefined investigation sequences.
- [Batch Investigations](batch-investigations.md) — process multiple URLs at scale.
- [Reports & Evidence](reports-evidence.md) — understand the artifacts SSI produces.
- [CLI Reference](cli-reference.md) — command-line reference for admins.
- [Configuration](configuration.md) — key settings and environment profiles.
- [Troubleshooting](troubleshooting.md) — common issues and solutions.
