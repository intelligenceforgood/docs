# Impact Dashboard

The Impact Dashboard gives you an at-a-glance view of the platform's
effectiveness at detecting, classifying, and actioning fraud cases.

## KPI cards

The top row shows five key performance indicators with vs-prior-period trends:

| KPI                | Description                                         |
| ------------------ | --------------------------------------------------- |
| Total Cases        | New cases ingested in the selected period           |
| Total Loss         | Sum of reported loss amounts (USD)                  |
| Active Threats     | Entities currently flagged in entity_stats          |
| New Indicators     | Unique indicators first seen in the period          |
| Median Action Time | Median hours between case creation and first action |

An upward arrow (green) indicates an increase; downward (red) a decrease.
The "change" label shows the absolute and percentage difference vs the prior
period of equal length.

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
