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

| Variable                        | Description               | Default                 |
| ------------------------------- | ------------------------- | ----------------------- |
| `SSI_INTEGRATION__CORE_API_URL` | i4g core API URL          | `http://localhost:8000` |
| `SSI_INTEGRATION__PUSH_TO_CORE` | Auto-push results to core | `false`                 |

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
