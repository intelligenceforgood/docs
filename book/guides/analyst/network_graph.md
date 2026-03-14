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

## Temporal Animation

The temporal slider lets you animate how the graph grew over time:

1. Click the **Timeline** toggle in the graph toolbar.
2. Use the date slider or **Play** button to step through time intervals.
3. Nodes appear as they enter the dataset, with edges following.

The animation uses each entity's `first_seen` timestamp. Snapshots are computed
server-side via `GET /intelligence/graph/temporal` and cached for the current
seed.

## Community Clusters

Louvain community detection automatically identifies dense subgraphs:

1. Click **Clusters** in the graph toolbar.
2. Nodes are color-coded by community. A cluster summary panel shows each
   community's size, density, average risk score, and entity type breakdown.
3. Adjust the **Resolution** slider to produce more (higher values) or fewer
   clusters.

The API endpoint `GET /intelligence/graph/clusters` returns the graph payload
with an additional `clusters` array. Each cluster contains `id`, `size`,
`members`, `density`, `avg_risk_score`, and `entity_types`.

## Infrastructure Edges

Infrastructure edges reveal shared hosting relationships between entities:

- **Shared IP** — two entities resolve to the same IP address.
- **Shared registrar** — domains registered through the same registrar.
- **Shared hosting** — entities hosted on the same infrastructure provider.
- **Shared case** — entities co-occurring across multiple cases.

Infrastructure edges appear as dashed lines on the graph. They are computed
by the infrastructure clustering job (runs every 6 hours by default) and
stored in the `infrastructure_edges` table. Toggle infrastructure edges
on/off using the **Infrastructure** checkbox in the graph filters.
