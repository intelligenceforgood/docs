# Cross-Engagement Comparison

Running competitions at multiple universities or across several semesters?
The comparison view lets you see how engagements stack up against each other —
ideal for benchmarking programs, tracking semester-over-semester improvement,
and preparing executive reports.

## Accessing the Comparison View

1. Click **Engagements** in the sidebar to open the management page.
2. Click **Compare Engagements** (this link appears once you have at least
   one past engagement).

The comparison page shows a side-by-side grid of your most recent active and
completed engagements (up to 10).

## Comparison Grid

Each engagement card in the grid displays:

| Metric                          | Description                                    |
| ------------------------------- | ---------------------------------------------- |
| **Name**                        | Engagement name (e.g. "Spring 2026 — UAB").    |
| **Status**                      | Current lifecycle stage (active or completed). |
| **Case Count**                  | Total cases assigned.                          |
| **Cases Reviewed**              | Number of reviewed cases.                      |
| **Completion %**                | Review progress.                               |
| **Analyst Count**               | Participating analysts.                        |
| **Avg Review Time**             | Average hours per review.                      |
| **Classification Distribution** | Breakdown of case classifications.             |

**Use this view to:**

- **Benchmark programs** — compare UAB's completion rate to GWU's.
- **Track improvement** — see if average review time is decreasing over
  semesters.
- **Identify outliers** — spot engagements with unusually low accuracy or
  high remaining case counts.

## Cross-Engagement API Endpoints

If you need programmatic access for custom reporting or external dashboards,
three comparison endpoints are available:

### Compare KPIs

```http
GET /engagements/compare/kpis
```

Returns the latest weekly KPI snapshot for each engagement: total cases,
proactive vs. reactive split, total loss, indicators, entities, and cases
actioned.

### Semester Trends

```http
GET /engagements/compare/trends
```

Returns weekly KPI time series for each engagement — perfect for charting
trends over time (case volume growth, loss detection acceleration, etc.).

### University Comparison

```http
GET /engagements/compare/universities
```

Returns aggregated metrics grouped by university (derived from engagement
metadata). Per-university totals include engagement count, total cases,
total loss, indicators, entities, and cases actioned.

## BigQuery & Looker Integration

All engagement data flows to BigQuery via the platform's export job. The
`engagement_id` dimension is available on:

- **cases** — linking each case to its engagement.
- **platform_kpis** — per-engagement and global KPI rows.
- **engagement_analyst_stats** — per-analyst performance per engagement.

This powers ad-hoc analytics and Looker dashboards for:

- Semester-over-semester trend analysis.
- University partnership comparison reports.
- Executive board-level impact metrics.
- Custom visualizations, PDF scheduling, and sharing.

## Preparing an Executive Report

Start with these steps:

- Complete all active engagements and export leaderboard CSVs.
- Use the comparison view for a quick visual summary.
- For deeper analysis, query BigQuery:

  ```sql
  SELECT * FROM engagement_analyst_stats WHERE engagement_id = '...';
  SELECT * FROM platform_kpis WHERE engagement_id = '...';
  ```

- Build a recurring Looker dashboard from the exported tables.
- Include classification distribution and top classifications in the
  narrative sections of your report.

## Tips

- **Name engagements consistently.** Use _"Season Year — Institution"_ so
  comparison views and BigQuery queries are easy to filter.
- **Include university metadata.** Add `{"university": "UAB"}` to the
  metadata field when creating an engagement. The university comparison
  endpoint aggregates by this field.
- **Archive only after exporting.** Archived engagements still flow to
  BigQuery, but the in-app comparison view only shows active and completed
  engagements.
