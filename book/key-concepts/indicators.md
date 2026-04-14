# Threat Indicators

A **threat indicator** is a threat entity that has been verified, enriched,
and promoted to the Indicator Registry — the platform's curated catalog of
high-confidence fraud signals ready for sharing with partners and law
enforcement.

## Entities vs. indicators

Not every entity becomes an indicator. The distinction is important:

![Entity to indicator funnel](../assets/diagrams/entity-indicator-funnel.svg)

<!--
Funnel diagram:
Raw text → Extracted entities → Promoted indicators → Partner feed / STIX
-->

| Aspect        | Entity                                 | Indicator                              |
| ------------- | -------------------------------------- | -------------------------------------- |
| **Source**    | Automatically extracted from evidence  | Promoted from entity pool              |
| **Quality**   | Varies — includes noise and false hits | Vetted — high confidence only          |
| **Purpose**   | Internal investigation and linking     | External sharing and intelligence feed |
| **Lifecycle** | Tracked by platform activity           | Curated in the Indicator Registry      |

Entities are _extracted_ (raw). Indicators are _curated_ (analyst-reviewed
or auto-promoted based on confidence thresholds).

## How entities become indicators

An entity can be promoted to indicator status through two paths:

1. **Auto-promotion** — when an entity meets confidence and frequency
   thresholds (e.g., appears in 3+ cases with confidence > 0.8), the
   platform promotes it automatically
2. **Analyst promotion** — an analyst manually promotes an entity from the
   Entity Explorer or case detail view

Once promoted, the indicator appears in the Indicator Registry and becomes
eligible for export and partner sharing.

## Indicator categories

Indicators are organized by the same categories as threat entities:

| Category   | Examples                               |
| ---------- | -------------------------------------- |
| **Crypto** | Bitcoin and Ethereum wallet addresses  |
| **Bank**   | Bank account and routing numbers       |
| **Email**  | Email addresses used in fraud schemes  |
| **Phone**  | Phone numbers reported by victims      |
| **URL**    | Fraudulent URLs and domains            |
| **Social** | Social media handles and profile links |

## What you can do with indicators

The Indicator Registry supports several export and sharing actions:

- **Export** — download selected indicators as CSV, XLSX, or STIX 2.1
  bundle
- **Tag** — label indicators with campaign or investigation tags
- **Submit to eCrimeX** — share indicators with the eCrimeX threat
  intelligence network
- **Partner feed** — indicators flow to integrated partner organizations
  automatically

## STIX 2.1 export

When exported as STIX, indicators map to standard STIX Cyber Observable
types. This makes them directly ingestible by any threat intelligence
platform that supports STIX 2.1 — no manual translation required.

## What you'll see in the Console

- **Indicator Registry** — segmented list with category tabs, search bar,
  and confidence filter
- **Indicator detail** — full value, metadata, linked cases, and related
  indicators
- **Bulk actions** — select multiple indicators for export or tagging

## Role restrictions

| Role       | Indicator list    | Indicator detail |
| ---------- | ----------------- | ---------------- |
| Researcher | Anonymized values | Blocked          |
| User       | Full values       | Full access      |
| Analyst+   | Full values       | Full access      |

Researchers see indicator values masked for privacy. Full access requires
the User role or above.

## Learn more

- [Entities](entities.md) — the raw entities from which indicators are
  promoted
- [Indicator Registry](../analyst-guide/indicator-registry.md) — using
  the Console to browse and export indicators
