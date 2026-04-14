# Partner Feed

The partner feed provides a machine-readable, paginated indicator feed for
external organizations — threat intelligence partners, financial
institutions, and law enforcement agencies. Partners authenticate with
dedicated API keys separate from the analyst Console.

## How the Feed Works

Partners query the indicator feed endpoint to receive threat indicators
discovered by the platform. Each indicator includes its type, value, risk
score, case count, loss total, and timestamps.

The feed supports three output formats:

| Format       | Best for                                             |
| ------------ | ---------------------------------------------------- |
| **JSON**     | Programmatic integration (default).                  |
| **CSV**      | Spreadsheet analysis and bulk import.                |
| **STIX 2.1** | Threat intelligence platforms (MISP, OpenCTI, etc.). |

## Indicator Data

Each indicator in the feed includes:

| Field          | Description                                             |
| -------------- | ------------------------------------------------------- |
| **Category**   | Indicator category (crypto wallet, email, domain, etc.) |
| **Type**       | Specific entity type within the category.               |
| **Value**      | The indicator value (wallet address, email, URL, etc.). |
| **Case Count** | Number of cases this indicator appears in.              |
| **Loss Sum**   | Total reported financial loss linked to this indicator. |
| **Risk Score** | Platform-computed risk score (0–100).                   |
| **First Seen** | When this indicator was first extracted.                |
| **Last Seen**  | Most recent case containing this indicator.             |
| **TLP**        | Traffic Light Protocol classification.                  |

## Managing API Keys

Partner API keys are created and managed by platform administrators.
Each key has:

- A **partner name** for identification.
- A **key prefix** (first 8 characters) shown in the Console for
  identification without exposing the full key.
- An optional **expiration date**.
- An **active/inactive** toggle.

To revoke a partner's access, deactivate their key. The partner receives
a 403 response on their next request.

> The raw API key is shown only once at creation time — it cannot be
> recovered later. If a partner loses their key, create a new one and
> deactivate the old one.

## Rate Limiting

Each key has a configurable requests-per-minute limit. When exceeded, the
partner receives an HTTP 429 response. Set rate limits based on the
partner's integration pattern:

| Pattern               | Suggested limit                 |
| --------------------- | ------------------------------- |
| Periodic batch pull   | 10/min                          |
| Real-time integration | 60/min                          |
| Bulk initial import   | Temporarily higher, then reduce |

## Audit Logging

Every partner feed request is logged with:

- Which key was used and which partner it belongs to.
- The endpoint and filter parameters of the request.
- Number of indicators returned.
- HTTP status code and client IP.

Use the audit log to monitor partner activity, detect unusual access
patterns, and support compliance reporting.

## Learn more

- [Threat Indicators](../key-concepts/indicators.md) — what indicators are
  and how they're curated
- [API Reference](../api/README.md) — partner integration documentation
