# Indicator Registry

The Indicator Registry is a categorized, searchable catalog of fraud indicators extracted from intake narratives and linked to cases.

## Accessing the Indicator Registry

Open the analyst console and select **Indicator Registry** under the **Intelligence** section in the sidebar.

## Browsing Indicators

The default view displays indicators in a segmented list. Category tabs at the top let you switch between indicator types:

| Category   | Examples                               |
| ---------- | -------------------------------------- |
| **crypto** | Bitcoin/Ethereum wallet addresses      |
| **bank**   | Bank account and routing numbers       |
| **email**  | Email addresses used in fraud schemes  |
| **phone**  | Phone numbers reported by victims      |
| **url**    | Fraudulent URLs and domains            |
| **social** | Social media handles and profile links |

Each indicator row shows the value, category badge, confidence score, linked case count, and first/last seen dates.

## Searching and Filtering

- **Search bar**: Filter by partial indicator value.
- **Category tabs**: Click a tab to restrict the list to a single category.
- **Confidence filter**: Set a minimum confidence threshold to focus on high-quality indicators.

## Bulk Actions

Select multiple indicators using the checkboxes to perform bulk operations:

- **Export selected** as CSV, XLSX, or STIX 2.1 bundle.
- **Tag selected** with campaign or investigation labels.

## Indicator Detail

Click an indicator row to open the detail panel showing:

- Full indicator value and metadata (source, extraction confidence, dates).
- Linked cases and intake records.
- Related indicators that co-occur in the same cases.

## STIX Export

The registry supports exporting indicators as a STIX 2.1 bundle for sharing with threat intelligence partners. Select **STIX** from the export format dropdown to generate a conformant bundle with `indicator` and `identity` SDOs.

## Role Restrictions

| Role       | Indicator List    | Indicator Detail |
| ---------- | ----------------- | ---------------- |
| Researcher | Anonymized values | Blocked (403)    |
| User       | Full values       | Full access      |
| Analyst+   | Full values       | Full access      |

Researchers see indicator values masked to `***` plus the last four characters. Detail views return a `403 Forbidden` response for the researcher role.
