# Getting Started

This page walks you through accessing SSI and running your first investigation.

> **Architecture note:** In production, SSI investigations are triggered through the core FastAPI gateway (`POST /investigations/ssi`), which calls the SSI Cloud Run Service (`POST /trigger/investigate`) for browser automation and OSINT. Investigation results, wallets, and evidence are served by core's API endpoints. The standalone SSI FastAPI app (`ssi/src/ssi/api/app.py`) remains available for local development and CLI use.

## Using the Console (recommended)

The i4g Console is the primary interface for analysts and investigators.

1. Open the Console:
   - **Production**: `https://app.intelligenceforgood.org/ssi`
   - **Local development**: `http://localhost:3000/ssi`
2. Log in with your i4g credentials.

### Run your first investigation

A passive scan collects infrastructure intelligence **without** interacting with the target site — the safest starting point.

1. Navigate to **SSI → Investigate**.
2. Paste a suspicious URL into the input field.
3. Select **Passive** as the scan type.
4. Click **Investigate**.
5. The progress tracker shows stages: Queued → Analysing → Generating Report.
6. When complete, a result card displays the risk score, fraud classification, WHOIS summary, and threat indicator count.

### Where to find live test URLs

Scam and phishing sites are short-lived. Use these community databases to find a live URL to practice with:

| Source        | URL                                           | Notes                                                          |
| ------------- | --------------------------------------------- | -------------------------------------------------------------- |
| **PhishTank** | [phishtank.org](https://phishtank.org/)       | Community-curated phishing URLs. Filter by "valid (verified)". |
| **OpenPhish** | [openphish.com](https://openphish.com/)       | Automated phishing intelligence feed.                          |
| **URLhaus**   | [urlhaus.abuse.ch](https://urlhaus.abuse.ch/) | Malware URL exchange. Filter by "online" status.               |

> **Safety**: SSI runs investigations in a sandboxed browser. Never visit these URLs in your regular browser.

## Using the CLI (admins)

Admins and operators who need command-line access can also run investigations via the `ssi` CLI. For installation and environment setup, see the [SSI Developer Guide](https://github.com/intelligenceforgood/ssi/blob/main/docs/developer_guide.md).

Once the CLI is installed, verify your setup:

```bash
ssi settings validate
```

Run a passive scan:

```bash
ssi investigate url "<SUSPICIOUS_URL>" --passive
```

Results are saved to `data/evidence/<investigation-id>/`. Open the Markdown report for a human-readable summary, or the PDF for a formatted version.

See the [CLI Reference](cli-reference.md) for the full command list.

## Next steps

- [Investigating Sites](investigating-sites.md) — learn about passive vs active scans and how the AI agent works.
- [Wallet Extraction](wallet-extraction.md) — extract cryptocurrency addresses from scam sites.
- [Live Monitoring](live-monitoring.md) — watch the agent in real time.
