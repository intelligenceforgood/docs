# Getting Started

This page walks you through installing SSI, verifying the setup, and running your first investigation.

## Prerequisites

You need:

- **Python 3.11 or later** — check with `python3 --version`.
- **Ollama** — a local LLM runtime for the AI agent. Download from [ollama.com](https://ollama.com).
- **Llama 3.3 model** — pulled via Ollama (see below).
- **Native PDF libraries** — GLib, Cairo, and Pango (required by WeasyPrint for PDF report generation).

### Install Ollama and pull the model

```bash
# macOS
brew install ollama

# Start the Ollama service (keep running in a dedicated terminal)
ollama serve

# Pull the Llama 3.3 model (~2 GB download)
ollama pull llama3.3
```

> The model requires ~2 GB of disk space and runs well on 16 GB+ RAM. On Apple Silicon Macs it uses the GPU automatically.

### Install native PDF libraries

WeasyPrint generates PDF investigation reports but depends on OS-level libraries that pip cannot install:

```bash
# macOS (pick one)
brew install glib cairo pango
conda install -c conda-forge glib cairo pango   # if using conda

# Ubuntu / Debian
sudo apt-get install libglib2.0-dev libcairo2-dev libpango1.0-dev
```

If these are missing, investigations still complete but PDF generation is skipped with a warning.

## Installation

```bash
cd /path/to/i4g/ssi

# Create a virtual environment
conda create -n i4g-ssi python=3.13 && conda activate i4g-ssi
# — or —
python3 -m venv .venv && source .venv/bin/activate

# Install SSI and browser engine
make setup
```

`make setup` runs `pip install -e ".[dev,test]"` followed by `playwright install chromium`.

Verify the CLI:

```bash
ssi --version
```

## Verify your setup

Run the settings validation command:

```bash
ssi settings validate
```

Expected output:

```
✅ Settings valid
   Environment: local
   LLM provider: ollama
   Evidence dir: data/evidence
```

If Ollama is not running you see a warning — start it with `ollama serve` in a separate terminal.

Inspect the full resolved configuration:

```bash
ssi settings show
```

## Run your first investigation

A passive scan collects infrastructure intelligence **without** interacting with the target site — the safest starting point.

### Using the Console (web UI)

1. Start the local services (three terminals):

| Terminal | Command                 | Purpose                  |
| -------- | ----------------------- | ------------------------ |
| 1        | `ollama serve`          | LLM runtime              |
| 2        | `cd ssi/ && make serve` | SSI API on port 8100     |
| 3        | `cd ui/ && pnpm dev`    | i4g Console on port 3000 |

2. Open **http://localhost:3000/ssi** in your browser.
3. Paste a suspicious URL into the input field.
4. Select **Passive** as the scan type.
5. Click **Investigate**.
6. The progress tracker shows stages: Queued → Analysing → Generating Report.
7. When complete, a result card displays the risk score, fraud classification, WHOIS summary, and threat indicator count.

### Using the CLI

```bash
ssi investigate url "<SUSPICIOUS_URL>" --passive
```

Results are saved to `data/evidence/<investigation-id>/`. Open the Markdown report for a human-readable summary, or the PDF for a formatted version.

### Where to find live test URLs

Scam and phishing sites are short-lived. Use these community databases to find a live URL to practice with:

| Source        | URL                                           | Notes                                                          |
| ------------- | --------------------------------------------- | -------------------------------------------------------------- |
| **PhishTank** | [phishtank.org](https://phishtank.org/)       | Community-curated phishing URLs. Filter by "valid (verified)". |
| **OpenPhish** | [openphish.com](https://openphish.com/)       | Automated phishing intelligence feed.                          |
| **URLhaus**   | [urlhaus.abuse.ch](https://urlhaus.abuse.ch/) | Malware URL exchange. Filter by "online" status.               |

> **Safety**: SSI runs investigations in a sandboxed browser. Never visit these URLs in your regular browser.

## Next steps

- [Investigating Sites](investigating-sites.md) — learn about passive vs active scans and how the AI agent works.
- [Wallet Extraction](wallet-extraction.md) — extract cryptocurrency addresses from scam sites.
- [Live Monitoring](live-monitoring.md) — watch the agent in real time.
