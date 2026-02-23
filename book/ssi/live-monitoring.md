# Live Monitoring

During active investigations, SSI streams real-time events — screenshots, state changes, wallet discoveries, and guidance requests. You can watch the AI agent work and intervene when it needs help.

## Monitoring in the Console

1. Start an investigation from **SSI → Investigate** with **Active** or **Full** scan type.
2. Open the investigation detail page and switch to the **Live Monitor** tab.

The monitor displays:

- **Live screenshot** — updated after every agent action. Shows exactly what the agent sees.
- **Action log** — a scrolling timeline of agent decisions: page loads, form fills, button clicks, wallet discoveries.
- **State indicator** — the current agent state (INIT, LOAD_SITE, NAVIGATE, FILL_FORM, EXTRACT_WALLETS, COMPLETE, etc.).
- **Guidance panel** — appears when the agent requests human help (see below).

### Guidance commands

When the agent encounters a situation it cannot resolve (CAPTCHA, ambiguous UI, unexpected page), it emits a `guidance_needed` event. The Console shows a guidance panel where you can:

| Command      | What it does                                               |
| ------------ | ---------------------------------------------------------- |
| **Click**    | Click an element you specify (CSS selector or description) |
| **Type**     | Type text into a field                                     |
| **Go to**    | Navigate to a specific URL                                 |
| **Skip**     | Skip the current step and move on                          |
| **Continue** | Resume autonomous operation                                |

Type your instruction and click **Send**. The agent executes the command and resumes.

## CLI event output

When running batch investigations, use the `--events` flag to stream events as JSONL to your terminal:

```bash
ssi investigate batch urls.txt --events > events.jsonl
```

This enables log processing and alerting pipelines for automated batch runs.

> For programmatic WebSocket integration (event schemas, endpoint paths, bidirectional guidance protocol), see the [SSI API Reference](https://github.com/intelligenceforgood/ssi/blob/main/docs/api_reference.md).
