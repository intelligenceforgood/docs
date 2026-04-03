# Timeline

The timeline provides a multi-track activity view showing cases, indicators,
and campaigns over time.

## Timeline Tracks

Three tracks are displayed as horizontal bar charts:

| Track      | Color | Description                        |
| ---------- | ----- | ---------------------------------- |
| Cases      | Blue  | New cases ingested per period      |
| Indicators | Green | New indicators discovered          |
| Campaigns  | Amber | Active threat campaigns per period |

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

The system provides weekly and monthly data depending on the granularity
selected.

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
