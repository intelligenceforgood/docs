# Impact Dashboard

The Impact Dashboard gives you an at-a-glance view of the platform's
effectiveness at detecting, classifying, and actioning fraud cases.

## KPI cards

The top row shows five key performance indicators with vs-prior-period trends:

| KPI                | Description                                         |
| ------------------ | --------------------------------------------------- |
| Total Cases        | New cases ingested in the selected period           |
| Total Loss         | Sum of reported loss amounts (USD)                  |
| Active Threats     | Threat entities with recent activity (see below)    |
| New Indicators     | Unique fraud indicators first seen in the period    |
| Median Action Time | Median hours between case creation and first action |

An upward arrow (green) indicates an increase; downward (red) a decrease.
The "change" label shows the absolute and percentage difference vs the prior
period of equal length.

### What counts as an "Active Threat"?

The Active Threats metric counts entities of **threat entity types** that
have an `active` lifecycle status. Threat entity types are the 14 categories
that represent actionable financial, contact, and digital infrastructure
indicators:

| Category                   | Types                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| **Financial**              | wallet_address, bank_account, account_number, routing_number, crypto_token, transaction_id |
| **Contact**                | email_address, phone_number, social_handle, contact_handle, payment_handle                 |
| **Digital infrastructure** | url, domain, ip_address                                                                    |

Contextual entities extracted by NER — such as person names, organizations,
and locations — are **excluded** from this count. They provide investigative
context but are not themselves threat indicators.

### What counts as a "New Indicator"?

New Indicators counts unique fraud indicators (URLs, email addresses, wallet
addresses, phone numbers, etc.) whose `first_seen` date falls within the
selected time period.

### Entity Lifecycle Statuses

Entities transition through lifecycle statuses automatically based on activity:

| Status        | Meaning                                                  |
| ------------- | -------------------------------------------------------- |
| **Active**    | Appeared in a case within the last 14 days.              |
| **Declining** | No new case activity for 14–29 days.                     |
| **Dormant**   | No new case activity for 30+ days.                       |
| **Resolved**  | All linked cases are closed.                             |
| **Flagged**   | Manually flagged by an analyst — never auto-transitions. |

The Active Threats KPI counts only entities in the **Active** status that
belong to the 14 threat entity types listed above.

## Period selector

Choose from **7 days**, **30 days**, **90 days**, **Quarter**, or **Year**.
The prior period is always the same length immediately preceding the selected
window.

## Charts

### Loss by fraud type

A horizontal bar chart showing total reported loss grouped by case
classification. Hover over a bar to see the exact amount and case count.

### Detection velocity

A line chart comparing proactive (platform-initiated) vs reactive
(user-reported) case detection rates per week. Increasing proactive share
indicates improving automated coverage.

### Pipeline funnel

A vertical bar chart showing how many records pass through each stage:
Intake → Ingestion → Classification → Review → Action. A steep drop-off
between stages may indicate bottlenecks worth investigating.

### Cumulative indicators

A stacked area chart showing the running total of unique indicators over time,
broken down by category (bank, crypto, domain, IP, other). This visualizes
how the indicator database grows and which categories dominate.
