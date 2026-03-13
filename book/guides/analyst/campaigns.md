# Threat Campaigns

The Campaigns view surfaces groups of related fraud cases that share common
indicators, entities, or behavioral patterns. Campaigns are detected
automatically by the aggregation pipeline and can be refined manually.

## Browsing campaigns

Navigate to **Intelligence → Campaigns** to see the campaign list. Each card
shows the campaign name, status, case count, and risk badge. Use the search
field to filter by name or status.

## Understanding auto-detection

The analytics aggregation job groups cases into campaigns based on shared
wallet addresses, domains, phone numbers, and other entity overlaps. A campaign
starts as `detected` and transitions to `confirmed` once an analyst reviews it.

## Managing campaigns

On the campaign detail page you can:

- **Rename**: Click the campaign title → edit → save.
- **Merge**: Select two or more campaigns → "Merge" action. Cases from all
  selected campaigns move to the surviving campaign.
- **Split**: Unlink cases that do not belong → they form a new campaign automatically.
- **Link/unlink cases**: Use the "Manage" action to add or remove individual
  case IDs from the campaign.

All management operations are logged in the audit trail.

## Interpreting risk scores

The campaign risk score (0–100) combines:

| Factor               | Weight |
| -------------------- | ------ |
| Total loss           | 40 %   |
| Linked case count    | 30 %   |
| Entity co-occurrence | 20 %   |
| Recency              | 10 %   |

Campaigns scoring above 70 appear with a red risk badge and are prioritized for
LEA referral suggestions on the Intelligence Dashboard.
