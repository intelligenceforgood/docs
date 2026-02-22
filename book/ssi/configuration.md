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

| `SSI_ENV`         | LLM                        | Storage                   | Identity | Typical use        |
| ----------------- | -------------------------- | ------------------------- | -------- | ------------------ |
| `local` (default) | Ollama (local)             | SQLite + local filesystem | Faker    | Development, demos |
| `dev`             | Gemini Flash via Vertex AI | PostgreSQL + GCS          | Faker    | Staging, testing   |
| `prod`            | Gemini Flash via Vertex AI | PostgreSQL + GCS          | Faker    | Production         |

## Environment variable reference

All variables use the `SSI_` prefix. Double underscores (`__`) denote nested sections.

### General

| Variable    | Description          | Default |
| ----------- | -------------------- | ------- |
| `SSI_ENV`   | Environment name     | `local` |
| `SSI_DEBUG` | Enable debug logging | `false` |

### LLM

| Variable                            | Description                       | Default                  |
| ----------------------------------- | --------------------------------- | ------------------------ |
| `SSI_LLM__PROVIDER`                 | LLM provider (`ollama`, `vertex`) | `ollama`                 |
| `SSI_LLM__MODEL`                    | Model name                        | `llama3.1`               |
| `SSI_LLM__OLLAMA_BASE_URL`          | Ollama API URL                    | `http://localhost:11434` |
| `SSI_LLM__TEMPERATURE`              | Sampling temperature              | `0.1`                    |
| `SSI_LLM__MAX_TOKENS`               | Max tokens per response           | `4096`                   |
| `SSI_LLM__TOKEN_BUDGET_PER_SESSION` | Max tokens per investigation      | `50000`                  |

### Browser

| Variable                    | Description             | Default |
| --------------------------- | ----------------------- | ------- |
| `SSI_BROWSER__HEADLESS`     | Run browser headless    | `true`  |
| `SSI_BROWSER__TIMEOUT_MS`   | Page load timeout (ms)  | `30000` |
| `SSI_BROWSER__RECORD_HAR`   | Record HAR file         | `true`  |
| `SSI_BROWSER__RECORD_VIDEO` | Record video of session | `false` |
| `SSI_BROWSER__SANDBOX`      | Use browser sandbox     | `true`  |

### OSINT

| Variable                        | Description          | Default                          |
| ------------------------------- | -------------------- | -------------------------------- |
| `SSI_OSINT__VIRUSTOTAL_API_KEY` | VirusTotal API key   | _(empty — skips check)_          |
| `SSI_OSINT__URLSCAN_API_KEY`    | urlscan.io API key   | _(empty — uses search fallback)_ |
| `SSI_OSINT__IPINFO_TOKEN`       | ipinfo.io token      | _(empty — uses free tier)_       |
| `SSI_OSINT__WHOIS_TIMEOUT_SEC`  | WHOIS lookup timeout | `10`                             |
| `SSI_OSINT__DNS_TIMEOUT_SEC`    | DNS lookup timeout   | `5`                              |

### Evidence

| Variable                        | Description                      | Default         |
| ------------------------------- | -------------------------------- | --------------- |
| `SSI_EVIDENCE__OUTPUT_DIR`      | Evidence output directory        | `data/evidence` |
| `SSI_EVIDENCE__STORAGE_BACKEND` | Storage backend (`local`, `gcs`) | `local`         |
| `SSI_EVIDENCE__GCS_BUCKET`      | GCS bucket name (production)     | _(empty)_       |

### Identity

| Variable                           | Description                             | Default |
| ---------------------------------- | --------------------------------------- | ------- |
| `SSI_IDENTITY__DEFAULT_LOCALE`     | Faker locale for identity generation    | `en_US` |
| `SSI_IDENTITY__ROTATE_PER_SESSION` | Generate new identity per investigation | `true`  |

### Stealth

| Variable                             | Description                              | Default       |
| ------------------------------------ | ---------------------------------------- | ------------- |
| `SSI_STEALTH__PROXY_URLS`            | Comma-separated proxy URLs               | _(empty)_     |
| `SSI_STEALTH__ROTATION_STRATEGY`     | Proxy rotation (`round_robin`, `random`) | `round_robin` |
| `SSI_STEALTH__RANDOMIZE_FINGERPRINT` | Randomize browser fingerprint            | `true`        |
| `SSI_STEALTH__APPLY_STEALTH_SCRIPTS` | Inject anti-detection scripts            | `true`        |

### CAPTCHA

| Variable                            | Description                                                  | Default |
| ----------------------------------- | ------------------------------------------------------------ | ------- |
| `SSI_CAPTCHA__STRATEGY`             | CAPTCHA handling (`skip`, `wait`, `accessibility`, `solver`) | `skip`  |
| `SSI_CAPTCHA__WAIT_SECONDS`         | Seconds to wait (if strategy is `wait`)                      | `15`    |
| `SSI_CAPTCHA__SCREENSHOT_ON_DETECT` | Screenshot when CAPTCHA detected                             | `true`  |

### Cost

| Variable                                 | Description                      | Default |
| ---------------------------------------- | -------------------------------- | ------- |
| `SSI_COST__BUDGET_PER_INVESTIGATION_USD` | Max cost per investigation (USD) | `1.0`   |
| `SSI_COST__WARN_AT_PCT`                  | Warn when budget reaches this %  | `80`    |
| `SSI_COST__ENABLED`                      | Enable cost tracking             | `true`  |

### Integration

| Variable                           | Description                           | Default                 |
| ---------------------------------- | ------------------------------------- | ----------------------- |
| `SSI_INTEGRATION__CORE_API_URL`    | i4g core API URL                      | `http://localhost:8000` |
| `SSI_INTEGRATION__PUSH_TO_CORE`    | Auto-push results to core             | `false`                 |
| `SSI_INTEGRATION__TRIGGER_DOSSIER` | Trigger dossier generation after push | `false`                 |
| `SSI_INTEGRATION__DATASET`         | Dataset label for core cases          | `ssi`                   |

## Config file overrides

Create `config/settings.local.toml` (git-ignored) for persistent local overrides:

```toml
[osint]
virustotal_api_key = "your-key-here"
ipinfo_token = "your-token-here"

[browser]
headless = false  # Watch the browser in action

[llm]
model = "llama3.1"
temperature = 0.1
```

## Proxy configuration

For stealth browsing through residential proxies (recommended for production):

```toml
[stealth]
proxy_urls = ["socks5://user:pass@proxy1.example:1080", "socks5://user:pass@proxy2.example:1080"]
rotation_strategy = "round_robin"
randomize_fingerprint = true
apply_stealth_scripts = true
```

Or via environment variables:

```bash
export SSI_STEALTH__PROXY_URLS="socks5://user:pass@proxy1.example:1080,socks5://user:pass@proxy2.example:1080"
```
