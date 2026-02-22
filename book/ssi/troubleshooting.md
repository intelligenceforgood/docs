# Troubleshooting

Common issues and how to resolve them.

## Ollama / LLM issues

### "Connection refused" when running investigations

Ollama is not running. Start it in a separate terminal:

```bash
ollama serve
```

### LLM responses are slow

- Ensure Ollama is using GPU acceleration: `ollama ps`.
- On Apple Silicon Macs, GPU offload is automatic. On Linux, confirm CUDA or ROCm support.
- Reduce the token budget if investigations cost too much time: `SSI_LLM__TOKEN_BUDGET_PER_SESSION=30000`.

### Wrong model loaded

Check the active model:

```bash
ssi settings show | grep model
```

Pull the expected model if missing:

```bash
ollama pull llama3.3
```

## OSINT checks

### WHOIS lookup times out

Some WHOIS servers are slow or rate-limited. Skip the check:

```bash
ssi investigate url "https://example.com" --passive --skip-whois
```

Or increase the timeout in `config/settings.local.toml`:

```toml
[osint]
whois_timeout_sec = 30
```

### VirusTotal check skipped

You need an API key. Get a free one at [virustotal.com](https://www.virustotal.com/gui/join-us) and set it:

```bash
export SSI_OSINT__VIRUSTOTAL_API_KEY="your-key-here"
```

### urlscan.io returns no results

Without an API key, SSI falls back to the public search endpoint which has limited data. For full results, set:

```bash
export SSI_OSINT__URLSCAN_API_KEY="your-key-here"
```

## Browser issues

### Browser crashes or hangs

Try disabling the sandbox:

```bash
export SSI_BROWSER__SANDBOX=false
```

Or increase the page load timeout:

```bash
export SSI_BROWSER__TIMEOUT_MS=60000
```

### "playwright install" fails

Ensure system dependencies are available. On Ubuntu/Debian:

```bash
playwright install-deps chromium
```

On macOS, Chromium installs without additional system packages.

### Agent gets stuck in a loop

The agent has built-in loop detection and limits: 20 steps max and a configurable token budget. Safety mechanisms include:

- **Repeated action detection** — aborts if the same action fails 3 times.
- **Scroll loop detection** — stops scrolling if page content does not change.
- **Blank page backoff** — retries with progressive delays if the page is empty.

If the agent consistently fails on a specific site, try:

1. Run a passive-only scan first to understand the page structure.
2. Create a playbook for the site pattern (see [Playbooks](playbooks.md)).
3. Use live monitoring to send guidance commands (see [Live Monitoring](live-monitoring.md)).

## PDF report issues

### PDF generation skipped

The native PDF libraries (GLib, Cairo, Pango) are missing. Install them:

```bash
# macOS
brew install glib cairo pango

# Ubuntu / Debian
sudo apt-get install libglib2.0-dev libcairo2-dev libpango1.0-dev
```

Investigations still complete without these — only PDF rendering is skipped.

## Performance

### Investigation takes too long

Passive-only scans take 30–60 seconds. Full investigations with the AI agent take 2–5 minutes depending on site complexity.

To speed things up:

- Skip checks you do not need (`--skip-whois`, `--skip-virustotal`).
- Reduce the token budget: `SSI_LLM__TOKEN_BUDGET_PER_SESSION=30000`.
- Ensure Ollama uses GPU acceleration.
- For batch runs, increase `--concurrency` to process URLs in parallel.

### Database grows too large

Investigation results are stored in SQLite (local) or PostgreSQL (dev/prod). To manage local storage:

- Delete old evidence directories under `data/evidence/`.
- The SQLite database is at `data/ssi.db` — back up and recreate if needed.

## Getting help

- Check `ssi settings validate` for configuration issues.
- Run with `SSI_DEBUG=true` for verbose logging.
- Review the [CLI Reference](cli-reference.md) for correct command syntax.
- File issues in the SSI repository for bugs or feature requests.
