# Network Graph

The network graph visualizes entity relationships as an interactive force-directed graph.
Use it to explore how wallets, emails, phones, IPs, and domains connect across cases.

## Seeding a Graph

1. Navigate to **Intelligence → Network Graph**.
2. Enter a seed entity in the format `entity_type:value` (e.g., `wallet:0xABC123`).
3. Set the hop count (1–3) to control traversal depth.
4. Click the search button to load the graph.

## Expanding Neighbors

- Increase the hop count to expand the graph to include more distant connections.
- Higher hop counts reveal deeper clusters but produce denser visualizations.
- For graphs exceeding 500 nodes, the server pre-computes a spring layout to
  improve initial rendering performance.

## Filtering Edges

- **Entity type filter**: restrict displayed nodes to specific types (wallet,
  email, phone, ip, domain, url).
- **Risk threshold**: hide nodes below a minimum risk score to focus on
  high-risk entities.

## Visual Encoding

Nodes and edges use color coding to convey information at a glance:

| Entity Type | Color  |
| ----------- | ------ |
| wallet      | Red    |
| email       | Blue   |
| phone       | Green  |
| ip          | Amber  |
| domain      | Purple |
| url         | Pink   |

Edge colors indicate relationship types (co-occurrence, transaction, communication).
Node size scales with case count.

## Campaign Seeding

When a `campaign_id` is provided, the graph seeds from all entities associated
with that campaign rather than a single entity, revealing the campaign's full
entity network.

## Exporting Graph as Evidence

Click the download button to export the current graph view:

- **PNG**: raster image suitable for reports and presentations.
- **SVG**: vector image for high-quality print or further editing.

Exported images capture the current layout, zoom level, and filter state.
