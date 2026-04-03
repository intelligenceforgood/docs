# Entity Explorer

The Entity Explorer lets you browse, search, and drill into threat entities — crypto wallets, email addresses, phone numbers, bank accounts, and other identifiers extracted from fraud cases.

## Accessing the Entity Explorer

Open the analyst console and select **Entity Explorer** under the **Intelligence** section in the sidebar.

## Browsing Entities

The main view displays a paginated table of entities sorted by total loss or case count. Each row shows:

| Column          | Description                                        |
| --------------- | -------------------------------------------------- |
| **Entity Type** | Category badge (e.g., `crypto_wallet`, `email`).   |
| **Value**       | The canonical identifier (masked for researchers). |
| **Status**      | Lifecycle status (see below).                      |
| **Case Count**  | Number of linked fraud cases.                      |
| **Total Loss**  | Aggregate reported loss across all linked cases.   |
| **First Seen**  | Earliest case association date.                    |
| **Last Seen**   | Most recent case association date.                 |

### Entity Lifecycle Statuses

Each entity carries a lifecycle status that reflects its current threat level:

| Status        | Meaning                                                                           |
| ------------- | --------------------------------------------------------------------------------- |
| **Active**    | Appeared in a case within the last 14 days.                                       |
| **Declining** | No new case activity for 14–29 days.                                              |
| **Dormant**   | No new case activity for 30+ days.                                                |
| **Resolved**  | All linked cases are closed — the entity is no longer under review.               |
| **Flagged**   | Manually flagged by an analyst. This status is sticky and never auto-transitions. |

Status transitions happen automatically during the analytics refresh cycle.
The **Flagged** status is the exception — only an analyst can set or remove it.

## Searching and Filtering

- **Search bar**: Type a partial entity value to filter the table in real time.
- **Filter sidebar**: Narrow results by entity type, minimum loss threshold, or date range.
- **Sort**: Click column headers to reorder by case count, loss, or date.

## Entity Detail

Click any row to open the entity detail panel. The detail view includes:

- **Summary card** with full entity value, type badge, and aggregate stats.
- **Activity sparkline** showing case volume over time (powered by `GET /intelligence/entities/{type}/{value}/activity`).
- **Co-occurrence graph** displaying 1-hop neighbors — other entities that appear in the same cases (powered by `GET /intelligence/entities/{type}/{value}/neighbors`).
- **Linked cases table** listing every case that references the entity.

## Exporting

Use the **Export** button above the table to download entity data as CSV or XLSX. Bank account values are masked in exports for non-analyst roles.

## Role Restrictions

| Role       | Entity List       | Entity Detail |
| ---------- | ----------------- | ------------- |
| Researcher | Anonymized values | Blocked (403) |
| User       | Full values       | Full access   |
| Analyst+   | Full values       | Full access   |

Researchers see entity values masked to `***` plus the last four characters. Detail views return a `403 Forbidden` response for the researcher role.
