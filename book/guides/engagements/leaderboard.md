# Leaderboard & Analytics

The leaderboard ranks analysts within an engagement by a composite score that
balances accuracy, throughput, and quality. This page explains how scoring
works, what each metric means, and how to export results.

## Accessing the Leaderboard

Managers navigate to the leaderboard from the Engagement Management page:

1. Go to **Admin → Engagement Management** (`/admin/engagements`).
2. Find the engagement in the table.
3. Click the **Leaderboard** icon (trophy) in the actions column.

The leaderboard page shows two sections:

- **Analytics Summary** — engagement-level metrics at the top.
- **Analyst Leaderboard** — ranked table of individual analyst performance.

## Analytics Summary

The top section displays eight metric cards:

| Metric              | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| **Total Cases**     | Number of cases assigned to the engagement.                            |
| **Reviewed**        | Cases that have received at least one review.                          |
| **Remaining**       | Cases awaiting review.                                                 |
| **Completion**      | Percentage of cases reviewed (reviewed / total × 100).                 |
| **Analysts**        | Number of analysts who have activity in this engagement.               |
| **Avg Review Time** | Average time from case assignment to first review action, in hours.    |
| **Days Elapsed**    | Days since the engagement's start date.                                |
| **Days Remaining**  | Days until the engagement's end date. Shows "—" if no end date is set. |

Below the metric cards, a **Classification Distribution** chart shows a
horizontal breakdown of case classifications within the engagement (e.g.,
pig butchering, romance scam, investment fraud) with counts and percentages.

## Leaderboard Table

The leaderboard ranks analysts from highest to lowest composite score:

| Column       | Description                                                      |
| ------------ | ---------------------------------------------------------------- |
| **Rank**     | Position in the leaderboard. Top 3 are highlighted in gold.      |
| **Analyst**  | The analyst's email address.                                     |
| **Cases**    | Number of cases reviewed by this analyst.                        |
| **Accuracy** | Classification accuracy vs. consensus or ground truth (0.0–1.0). |
| **Actions**  | Total actions logged (close case, share, escalate, etc.).        |
| **Score**    | Composite score used for ranking.                                |

## How the Composite Score Works

The composite score combines three dimensions:

$$
\text{composite} = w_a \times \text{accuracy} + w_t \times \text{normalized\_throughput} + w_q \times (1 - \text{normalized\_risk\_mae})
$$

Where:

- $w_a$, $w_t$, $w_q$ are configurable weights (default: equal weighting).
- **accuracy** = classification accuracy (0.0–1.0).
- **normalized_throughput** = this analyst's cases reviewed ÷ max cases
  reviewed by any analyst in the engagement.
- **normalized_risk_mae** = this analyst's mean absolute error in risk scoring
  ÷ max MAE in the engagement. Subtracted from 1 so lower error = higher
  score.

The weights are configurable by platform administrators via the
`I4G_ANALYTICS__LEADERBOARD_WEIGHTS` setting.

## Accuracy Scoring

Classification accuracy measures how closely an analyst's case classifications
match the consensus. The consensus is derived from the collective
classifications of all reviewers in the engagement.

- If multiple analysts classify the same case, the majority classification
  is treated as the reference.
- An analyst's accuracy is: _number of cases where their classification
  matches the consensus ÷ total cases they reviewed_.

> **Note:** Accuracy scoring is most meaningful when multiple analysts review
> the same cases. In engagements where each case is reviewed by only one
> analyst, accuracy is not computed.

## Risk Score MAE

The Risk Score Mean Absolute Error measures how far an analyst's risk
assessments deviate from the consensus:

$$
\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} | \text{analyst\_score}_i - \text{consensus\_score}_i |
$$

A lower MAE indicates more consistent risk assessment aligned with peers.

## Viewing as an Analyst

Analysts who navigate to the leaderboard see:

- The full ranked table with all participants.
- Their own row highlighted for quick identification.
- All metric columns (cases, accuracy, actions, score).

## Exporting Data

Two export options are available from the leaderboard page (manager+ only):

### CSV Export

Click **Export CSV** to download a file with columns:

```
Rank, Analyst, Cases Reviewed, Avg Review Time (s),
Classification Accuracy, Risk Score MAE, Actions Logged,
Composite Score
```

Use this for spreadsheet analysis, award certificates, or grant reporting.

### JSON Export

Click **Export JSON** to download a structured file containing:

- **summary** — engagement metadata (name, status, case count, completion %,
  classification distribution, analyst count, avg review time).
- **leaderboard** — array of analyst entries with all metrics.

Use this for programmatic processing, dashboards, or archival.

## Per-Engagement KPIs in the Dashboard

When an engagement is selected, the platform's dashboard KPIs are scoped to
that engagement. The `platform_kpis` table stores per-engagement breakdowns
alongside the global aggregate:

| KPI                    | What It Shows (Engagement-Scoped)                                      |
| ---------------------- | ---------------------------------------------------------------------- |
| **Total Cases**        | Cases in the selected engagement.                                      |
| **Total Loss**         | Sum of reported losses for the engagement's cases.                     |
| **Active Threats**     | Threat entities linked to the engagement's cases with recent activity. |
| **New Indicators**     | Indicators first seen in cases belonging to this engagement.           |
| **Median Action Time** | Median time to first action for the engagement's cases.                |

## When Analytics Update

Engagement analytics are computed by the analytics aggregation job, which runs
on a configurable schedule. Metrics update each time the job executes. The
leaderboard reflects the latest completed aggregation run.

Real-time progress (case count, reviewed count) is computed on-the-fly from
the engagement summary endpoint and updates immediately as analysts work.
