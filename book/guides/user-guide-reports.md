# Reports

The Reports section lets you generate, browse, and download analytical reports
from the platform.

## Report Builder

Navigate to **Reports → Builder** to create a new report.

1. **Select a template**: Choose from Executive Summary, LEA Evidence Dossier,
   Campaign Bulletin, or SAR Supplement.
2. **Define scope**: Enter a Campaign ID, entity filter, or date range to
   narrow the report's focus. Leave blank for a platform-wide summary.
3. **Set TLP**: Each template has a default Traffic Light Protocol (TLP) label.
   You can override it if your role permits.
4. **Generate**: Click "Generate Report". The report is queued for background
   processing and appears in the Report Library once complete.

### Templates

| Template             | TLP Default | Use case                            |
| -------------------- | ----------- | ----------------------------------- |
| Executive Summary    | TLP:AMBER   | Periodic briefing for leadership    |
| LEA Evidence Dossier | TLP:RED     | Law enforcement referral package    |
| Campaign Bulletin    | TLP:AMBER   | Campaign-specific threat brief      |
| SAR Supplement       | TLP:AMBER   | Supporting evidence for SAR filings |

## Report Library

Navigate to **Reports → Library** to browse previously generated reports. The
table shows template type, scope summary, TLP label, status, creation date,
and a download link (for completed reports).

## Downloading reports

Click the **Download** link in the Library table or navigate to
`/reports/{report_id}/download`. The report is returned as a file attachment
in the format determined by the template (typically PDF or Markdown).

## TLP guidance

Reports carry a TLP classification that controls distribution:

| TLP       | Audience                            |
| --------- | ----------------------------------- |
| TLP:WHITE | Public / unrestricted               |
| TLP:GREEN | Community / organizational sharing  |
| TLP:AMBER | Internal / limited external sharing |
| TLP:RED   | Named recipients only (e.g., LEA)   |
