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

## Monitoring via WebSocket

For programmatic integration, connect to the WebSocket endpoints directly.

### Read-only event stream

```
ws://localhost:8100/ws/monitor/{investigation_id}
```

Events arrive as JSON:

```json
{"type": "state_change", "from": "LOAD_SITE", "to": "NAVIGATE", "timestamp": "..."}
{"type": "screenshot", "data": "<base64>", "timestamp": "..."}
{"type": "action", "action": "click", "target": "Register button", "timestamp": "..."}
{"type": "wallet_found", "address": "TQn9Y2...", "token": "USDT", "network": "Tron", "timestamp": "..."}
{"type": "complete", "risk_score": 85, "timestamp": "..."}
```

### Bidirectional guidance channel

```
ws://localhost:8100/ws/guidance/{investigation_id}
```

The server emits `guidance_needed` events. Send commands back:

```json
{"command": "click", "target": "#submit-btn"}
{"command": "type", "target": "#email", "value": "test@example.com"}
{"command": "goto", "url": "https://example.com/deposit"}
{"command": "skip"}
{"command": "continue"}
```

## Event types

| Event             | Description                | Payload                        |
| ----------------- | -------------------------- | ------------------------------ |
| `state_change`    | Agent moved to a new state | `from`, `to`                   |
| `screenshot`      | New screenshot captured    | `data` (base64 PNG)            |
| `action`          | Agent performed an action  | `action`, `target`, `value`    |
| `guidance_needed` | Agent requests human input | `reason`, `screenshot`         |
| `wallet_found`    | Wallet address discovered  | `address`, `token`, `network`  |
| `complete`        | Investigation finished     | `risk_score`, `classification` |

## CLI event output

When running batch investigations, use the `--events` flag to emit the same event stream as JSONL to stdout:

```bash
ssi investigate batch urls.txt --events > events.jsonl
```

Each line is a JSON object with the same structure as the WebSocket events, enabling log processing and alerting pipelines.
