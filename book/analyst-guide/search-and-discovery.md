# Search & Discovery

The Console offers two complementary ways to find cases: **Search**
for structured, filter-driven queries and **Discovery** for
open-ended semantic exploration.

## When to use each

| Tool          | Best for                                               |
| ------------- | ------------------------------------------------------ |
| **Search**    | Known criteria — specific taxonomy, entity, date range |
| **Discovery** | Exploratory — "find cases like this one"               |

## Search

Navigate to the **Search** page from the sidebar.

<!-- TODO: Replace with actual screenshot -->
<!-- ![Search page](../assets/screenshots/analyst-search.png) -->

### Applying filters

Click the filter bar to add criteria. Applied filters appear as
badges above the results. Available filters:

| Filter             | What it does                                               |
| ------------------ | ---------------------------------------------------------- |
| **Source**         | Filter by data source                                      |
| **Taxonomy**       | Match fraud classification axes (Intent, Channel, etc.)    |
| **Indicator type** | Narrow to cases with specific entity types                 |
| **Dataset**        | Restrict to a specific ingestion batch                     |
| **Time range**     | Presets for 7, 30, or 90 days                              |
| **Entity**         | Match a specific entity value (exact, contains, or prefix) |
| **Campaign**       | Filter by linked campaign                                  |

Click any badge to modify or remove it. Text in the search bar
drives semantic retrieval; filters constrain the structured slice.
The Console merges both streams in the results.

### Reading results

Each result card shows:

- **Merged score** — combined relevance from text and filters.
- **Confidence percentage** — how well the result matches your query.
- **Expand** the card to see classification details, entity chips,
  and example excerpts.

### Saving searches

1. Enter text and/or apply filters.
2. Click **Save search** and give it a name.
3. Manage saved searches from the panel below results — toggle
   favorites, rename, or delete.

Search history is accessible alongside saved searches for quick
re-runs.

<!-- TODO: Replace with actual screenshot -->
<!-- ![Saved searches](../assets/screenshots/analyst-search-drawer.png) -->

## Discovery

Navigate to the **Discovery** page from the sidebar.

<!-- TODO: Replace with actual screenshot -->
<!-- ![Discovery page](../assets/screenshots/analyst-discovery.png) -->

Discovery uses semantic understanding to surface cases that match
the _meaning_ of your query, even when exact keywords differ. This
is ideal for:

- Fuzzy lookups when you do not yet know which structured filters
  to apply.
- Exploring the full case corpus with natural language questions.

### Workflow

1. Type a natural language query (e.g., "pig butchering crypto
   romance scam targeting elderly victims").
2. Review the ranked results. Each card shows relevance signals and
   structured fields.
3. Expand a result to see the full payload or switch to
   **Show raw JSON** for unfiltered data.
4. If you need structured filters, switch to the **Search** tab.

### PII handling

Discovery applies client-side PII redaction. Emails, names, and
addresses appear as `████████` blocks in the displayed text to
protect victim identity.
