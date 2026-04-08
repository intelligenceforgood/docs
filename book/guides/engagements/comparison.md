# Cross-Engagement Comparison

Managers and administrators can compare results across multiple engagements
to track semester-over-semester trends, benchmark university programs, and
prepare executive reports.

## Accessing the Comparison View

1. Go to **Admin → Engagement Management** (`/admin/engagements`).
2. Click **Compare Engagements** (visible when at least one past engagement
   exists).

The comparison page shows a side-by-side grid of active and completed
engagements, limited to the 10 most recent.

## Comparison Grid

Each engagement card in the grid displays:

| Metric                          | Description                                    |
| ------------------------------- | ---------------------------------------------- |
| **Name**                        | Engagement name (e.g., "Spring 2026 — UAB").   |
| **Status**                      | Current lifecycle stage (active or completed). |
| **Case Count**                  | Total cases assigned.                          |
| **Cases Reviewed**              | Number of reviewed cases.                      |
| **Completion %**                | Review progress.                               |
| **Analyst Count**               | Number of participating analysts.              |
| **Avg Review Time**             | Average hours per review.                      |
| **Classification Distribution** | Breakdown of case classifications.             |

Use this view to:

- **Benchmark programs.** Compare UAB's completion rate to GWU's.
- **Track improvement.** See if average review time is decreasing over
  semesters.
- **Identify outliers.** Spot engagements with unusually low accuracy or
  high remaining case counts.

## Cross-Engagement API Endpoints

For programmatic access or custom reporting, three comparison endpoints are
available:

### Compare KPIs

```
GET /engagements/compare/kpis
```

Returns the latest weekly KPI snapshot for each engagement: total cases,
proactive vs. reactive cases, total loss, new indicators, new entities,
and cases actioned.

### Semester Trends

```
GET /engagements/compare/trends
```

Returns weekly KPI time series for each engagement. Use this for charting
trends over time (e.g., case volume growth, loss detection acceleration).

### University Comparison

```
GET /engagements/compare/universities
```

Returns aggregated metrics grouped by university (derived from engagement
metadata). Shows per-university totals: engagement count, total cases, total
loss, indicators, entities, and cases actioned.

## BigQuery & Looker

All engagement data flows to BigQuery via the platform's export job. The
`engagement_id` dimension is included on:

- `cases` — linking each case to its engagement.
- `platform_kpis` — per-engagement and global KPI rows.
- `engagement_analyst_stats` — per-analyst performance per engagement.

This enables ad-hoc analytics in BigQuery and Looker dashboards for:

- Semester-over-semester trend analysis.
- University partnership comparison reports.
- Executive board-level impact metrics across all engagements.
- Custom visualizations, PDF scheduling, and sharing.

## Preparing an Executive Report

1. Complete all active engagements and export leaderboard CSVs.
2. Use the comparison view for a quick visual summary.
3. For deeper analysis, query BigQuery:
   - `SELECT * FROM engagement_analyst_stats WHERE engagement_id = '...'`
   - `SELECT * FROM platform_kpis WHERE engagement_id = '...'`
4. Build a Looker dashboard from the exported tables for recurring reporting
   needs.
5. Include the engagement's classification distribution and top
   classifications in narrative sections.

## Tips

- **Name engagements consistently.** Use "[Season Year — Institution]" so
  comparison views and BigQuery queries are easy to filter.
- **Include university metadata.** When creating an engagement, add
  `{"university": "UAB"}` to the metadata field. The university comparison
  endpoint aggregates by this field.
- **Archive only after exporting.** Archived engagements still flow to
  BigQuery, but the in-app comparison view only shows active and completed
  engagements.
