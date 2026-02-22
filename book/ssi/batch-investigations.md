# Batch Investigations

Process multiple URLs in a single run with concurrency control, structured event output, and resume support.

## From the Console

The Console supports single-URL submission. For batch processing, use the CLI or API.

## From the CLI

### Basic batch

Create a text file with one URL per line:

```
https://suspicious-site-1.example
https://suspicious-site-2.example
https://suspicious-site-3.example
# Lines starting with # are skipped
```

Run:

```bash
# Passive-only batch
ssi investigate batch urls.txt --passive

# Full investigation batch
ssi investigate batch urls.txt

# Custom output directory
ssi investigate batch urls.txt --output ./batch-evidence
```

Each URL gets its own timestamped subdirectory under the output folder.

### Concurrency

Control how many investigations run in parallel:

```bash
ssi investigate batch urls.txt --concurrency 3
```

The default is sequential (one at a time). Higher concurrency values use `asyncio.Semaphore` to cap parallel execution — useful for large batches but increases memory and CPU usage.

### Structured JSON input

For per-URL options, use a JSON file instead of plain text:

```json
[
  {
    "url": "https://site-a.example",
    "scan_type": "full",
    "tags": ["phishtank", "2026-02"]
  },
  {
    "url": "https://site-b.example",
    "scan_type": "passive",
    "playbook_override": "fake-exchange-register"
  }
]
```

```bash
ssi investigate batch input.json --format json
```

A JSON schema for the batch input format is available at `config/schemas/batch_input.schema.json`.

### Event streaming

Emit real-time JSONL events to stdout — the same event types as the WebSocket monitor:

```bash
ssi investigate batch urls.txt --events > events.jsonl
```

Each line is a JSON object (`state_change`, `action`, `wallet_found`, `complete`, etc.). Pipe to a log aggregator or alerting system for automated processing.

### Resume support

If a batch run is interrupted, resume from where it left off:

```bash
ssi investigate batch urls.txt --output ./batch-evidence --resume
```

The `--resume` flag checks the output directory and skips URLs that already have completed results.

## Querying past investigations

### From the Console

Navigate to **SSI → Investigations** to browse past investigations. Filter by domain, status, date range, or risk score.

### From the CLI

```bash
# List recent investigations
ssi investigate list

# Show detail for a specific investigation
ssi investigate show <scan-id>
```

## From the API

```bash
# Submit a single investigation
curl -X POST http://localhost:8100/investigate \
  -H "Content-Type: application/json" \
  -d '{"url": "https://suspicious.example", "passive_only": false}'

# List past investigations
curl http://localhost:8100/investigations

# Get investigation detail
curl http://localhost:8100/investigations/<scan-id>

# List active investigations
curl http://localhost:8100/investigations/active
```

## Scheduling batch runs

For recurring scans (e.g., daily PhishTank feed processing), schedule the batch command with cron or Cloud Scheduler:

```bash
# Example crontab entry — run every day at 06:00 UTC
0 6 * * * cd /path/to/ssi && ssi investigate batch /data/feeds/daily-urls.txt \
  --output /data/batch-results --events --resume >> /var/log/ssi-batch.log 2>&1
```

For GCP deployments, use `ssi job batch` as a Cloud Run Job that reads a manifest from GCS.
