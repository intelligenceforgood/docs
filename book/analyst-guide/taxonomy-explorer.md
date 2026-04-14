# Taxonomy Explorer

The taxonomy explorer provides three complementary views of the fraud classification
taxonomy: Sankey diagram, heatmap, and trend analysis.

## Sankey Diagram

The default view shows a flow diagram from categories to subcategories. Each
category node is connected to its subcategories by proportional flow links.

- Categories appear on the left; subcategories on the right.
- Link width indicates case volume flowing from category to subcategory.
- Use the period selector (30d, 90d, quarter, year) to change the time range.

## Heatmap Exploration

Switch to the **Heatmap** view to see a category × time grid:

- Rows represent fraud categories.
- Columns represent time periods (configurable granularity: day, week, month).
- Cell intensity shows case count — darker cells indicate higher volume.
- Hover over a cell to see the exact count.

Use the heatmap to identify seasonal patterns or emerging fraud types.

## Trend Analysis

The **Trend** view shows time-series sparklines per category:

- Each category gets its own colored sparkline showing case volume over time.
- Totals are displayed next to each category name.
- X-axis labels show the first and last period.

Use trends to track whether a specific fraud type is growing or declining.

## Tips

- Start with the Sankey view for a structural overview, then drill into
  trends for temporal patterns.
- The heatmap is useful for identifying which categories spike in specific
  periods (e.g., holiday-related fraud patterns).
- All three views share the same period filter for consistent comparison.
