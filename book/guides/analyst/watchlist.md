# Watchlist & Alerts

The watchlist lets you pin entities for continuous monitoring. When new case
activity or loss thresholds are reached, the platform generates alerts
automatically.

## Pinning an Entity

1. Navigate to **Intelligence → Entity Explorer** or an entity detail page.
2. Click the **Pin to Watchlist** button next to the entity.
3. Optionally set an **alert threshold** (USD loss amount that triggers an
   alert) and add a **note** for context.

You can also add entities directly from the **Intelligence → Watchlist** page
using the **Add Entity** form (enter entity type and value).

## Managing Your Watchlist

Open **Intelligence → Watchlist** to see all pinned entities. The table shows:

| Column          | Description                                        |
| --------------- | -------------------------------------------------- |
| Entity Type     | wallet, email, domain, ip_address, etc.            |
| Value           | The canonical entity value                         |
| Alert Threshold | USD amount that triggers a loss alert              |
| Case Count      | Current number of linked cases (from entity_stats) |
| Created         | When the entity was pinned                         |
| Note            | Free-text analyst note                             |

Use the row actions to **edit** the threshold/note or **remove** the entity.

## Alerts

The watchlist check job runs every 30 minutes (configurable via
`I4G_ANALYTICS__WATCHLIST_CHECK_INTERVAL_MINUTES`). It generates alerts when:

- **New activity** — the entity appears in cases that were not present at the
  last check.
- **Loss threshold** — the entity's cumulative `total_loss_usd` exceeds the
  configured `alert_threshold`.

View alerts on the **Watchlist → Alerts** tab. Each alert shows the entity,
alert type, message, and timestamp. Mark alerts as read individually or in
bulk.

## API Reference

| Method | Endpoint                                   | Description              |
| ------ | ------------------------------------------ | ------------------------ |
| POST   | `/intelligence/watchlist/items`            | Pin an entity            |
| GET    | `/intelligence/watchlist/items`            | List pinned entities     |
| PUT    | `/intelligence/watchlist/items/{item_id}`  | Update threshold or note |
| DELETE | `/intelligence/watchlist/items/{item_id}`  | Remove from watchlist    |
| GET    | `/intelligence/watchlist/alerts`           | List alerts              |
| POST   | `/intelligence/watchlist/alerts/{id}/read` | Mark alert as read       |
| POST   | `/intelligence/watchlist/alerts/read-all`  | Mark all alerts as read  |

See `src/i4g/api/intelligence.py` for the full endpoint definitions.
