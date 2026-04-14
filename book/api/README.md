# API Reference

The I4G API allows trusted integration partners to submit evidence,
query intelligence data, and retrieve reports programmatically. Access
is limited to authenticated partners — this section covers what you
need to get started.

{% hint style="info" %}
The API is currently available to vetted partner organizations only.
If you're interested in integrating, contact your I4G liaison.
{% endhint %}

## In this section

| Page                                    | What you'll learn                         |
| --------------------------------------- | ----------------------------------------- |
| [Authentication](authentication.md)     | How to authenticate API requests          |
| [Sample Workflows](sample-workflows.md) | Common integration patterns with examples |
| [Taxonomy Codes](taxonomy-reference.md) | Fraud classification codes and labels     |

## Interactive documentation

If you have API access, the running API provides interactive docs:

- **Swagger UI** at `/docs` — try endpoints directly in the browser.
- **ReDoc** at `/redoc` — full schema reference with search.

Your I4G liaison can provide the base URL for your environment.

## What you can do with the API

| Capability             | Description                                        |
| ---------------------- | -------------------------------------------------- |
| **Submit evidence**    | Send fraud reports and evidence programmatically   |
| **Search cases**       | Query cases by date, taxonomy, or entity matches   |
| **Query intelligence** | Access entity, indicator, and campaign data        |
| **Download reports**   | Retrieve dossiers, STIX bundles, and CSV exports   |
| **Check taxonomy**     | Look up fraud classification codes and definitions |

## References

1. [Full API Endpoint Reference](https://github.com/intelligenceforgood/core/blob/main/docs/api_reference.md)
   — complete endpoint catalog with schemas and response types.
   | `GET` | `/campaigns` | Threat campaign management (governance CRUD) |
   | `GET` | `/exports/researcher/entities` | Anonymized researcher export (aggregate only) |

## PII Vault Endpoints (Q1 2026)

| Method | Path                    | Description                                             |
| ------ | ----------------------- | ------------------------------------------------------- |
| `GET`  | `/intakes/{id}/contact` | Decrypt victim contact fields (analyst role required)   |
| `GET`  | `/accounts/me`          | Resolve current user identity from forwarded IAP header |

For complete parameter schemas and response types, use the interactive Swagger UI at `/docs` or see [core/docs/api_reference.md](https://github.com/intelligenceforgood/core/blob/main/docs/api_reference.md).
