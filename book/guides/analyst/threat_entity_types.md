# Threat Entity Types

The platform extracts many entity types from fraud cases — from wallet
addresses and email accounts to person names and locations. Not all of these
are **threat entities**. This page explains which types are considered
actionable threats and how the platform uses them.

## What Is a Threat Entity?

A threat entity is an identifier that represents financial, contact, or
digital infrastructure used to facilitate fraud. These are the entities that
analysts investigate, watchlist, and report to law enforcement.

The platform defines **14 threat entity types** across three categories:

| Category                   | Entity Types                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| **Financial**              | wallet_address, bank_account, account_number, routing_number, crypto_token, transaction_id |
| **Contact**                | email_address, phone_number, social_handle, contact_handle, payment_handle                 |
| **Digital infrastructure** | url, domain, ip_address                                                                    |

## What Is Excluded?

Contextual entities extracted via NER (Named Entity Recognition) are
**not** threat entities. These include:

- **Person names** — names mentioned in scam narratives
- **Organizations** — company or brand names referenced in cases
- **Locations** — cities, countries, and addresses

These contextual entities provide valuable investigative context (e.g.,
which brands are being impersonated, which regions are targeted) but are
not themselves indicators of fraud infrastructure.

## Where Threat Entity Types Matter

The threat entity type distinction affects several platform features:

| Feature             | Behavior                                                                                        |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| **Active Threats**  | The Impact Dashboard's Active Threats KPI counts only threat entity types with `active` status. |
| **Entity Explorer** | Displays all entity types, but threat entities receive risk scores and lifecycle tracking.      |
| **Watchlist**       | Only threat entity types can be pinned for continuous monitoring.                               |
| **Partner Feed**    | The indicator feed exports threat entities only.                                                |
| **STIX Export**     | Threat entities map to STIX Cyber Observable types.                                             |

## Entity Lifecycle

Every threat entity progresses through a lifecycle based on case activity:

| Status        | Condition                                            |
| ------------- | ---------------------------------------------------- |
| **Active**    | Appeared in a case within the last 14 days.          |
| **Declining** | No new case activity for 14–29 days.                 |
| **Dormant**   | No new case activity for 30+ days.                   |
| **Resolved**  | All linked cases are closed.                         |
| **Flagged**   | Manually set by an analyst — never auto-transitions. |

The analytics refresh cycle updates statuses automatically. The **Flagged**
status is the only manual override — an analyst sets it to keep an entity
under watch regardless of activity patterns.

## Campaigns and Threat Entities

Threat campaigns are built from clusters of cases sharing threat entities.
When multiple cases reference the same wallet address, email, or domain, the
platform groups them into a campaign and computes a composite risk score.

Contextual entities (person, organization, location) do not contribute to
campaign clustering but are included in campaign detail views for context.
