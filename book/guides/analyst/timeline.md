# Timeline

The timeline provides a multi-track activity view showing cases, indicators,
and campaigns over time.

## Timeline Tracks

Three tracks are displayed as horizontal bar charts:

| Track      | Color | Data Source      |
| ---------- | ----- | ---------------- |
| Cases      | Blue  | `analytics_kpis` |
| Indicators | Green | `analytics_kpis` |
| Campaigns  | Amber | `analytics_kpis` |

Each track shows period counts as vertical bars. Hover over a bar to see the
exact count and period label.

## Period Selection

Choose a time window using the period buttons:

- **7d**: last 7 days
- **30d**: last 30 days
- **90d**: last 90 days (default)
- **quarter**: current quarter
- **year**: last 12 months

## Granularity

Control the resolution of the bar chart:

- **day**: one bar per day (best for 7d–30d ranges)
- **week**: one bar per week (default, good for 30d–90d)
- **month**: one bar per month (best for quarter–year ranges)

The API maps weekly data from `analytics_kpis` and monthly data from
`analytics_kpis_monthly` based on your selection.

## Event Navigation

- X-axis labels show the first and last period in each track.
- Badge counts show the number of periods with data.
- Compare tracks visually to correlate case surges with indicator
  or campaign activity.

## Tips

- Use day granularity with a 7d period to spot daily anomalies.
- Use month granularity with a year period for strategic trend reporting.
- Cross-reference timeline spikes with the Taxonomy Explorer to identify
  which fraud types are driving volume changes.
