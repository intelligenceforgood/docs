# User Guide

This guide is for people submitting scam reports or checking status. It focuses on the public app experience
(`https://app.intelligenceforgood.org`) and explains how your data is handled.

## Sign in

- Go to `https://app.intelligenceforgood.org`.
- Sign in with Google (IAP protected). If you cannot sign in, request access from your liaison.

## Submit a report

1. Click **Submit a report** on the home tab.
2. Fill in the summary and details; attach screenshots or PDFs if you have them.
3. Submit. You will see a confirmation with a case ID and an estimated review window.

### Tips for better triage

- Include the scammer handle, wallet address, links, or phone numbers if available.
- Redact unrelated personal info; we tokenize PII on ingest, but less noise speeds up review.

## Track status

- Open the **My reports** tab to see your submissions, statuses, and any analyst questions.
- Statuses you might see: `received`, `in review`, `needs more info`, `accepted`, `closed`.
- If we request more info, reply in the thread or attach new evidence.

## Privacy and tokens

- Sensitive fields are tokenized (converted to `AAA-XXXXXXXX`) in the analyst view.
- Detokenization is limited to admins and only done when necessary to continue the investigation.

## Getting help

- Use the in-app help link to contact support.
- For urgent safety concerns, notify your liaison immediately; do not wait for a reply in-app.

## Researcher Access

Users with the **Researcher** role can access anonymized aggregate data for
academic research and statistical analysis. PII is hashed and loss values are
rounded.

### Available Views

- **Entity Explorer** — browse entities with PII fields replaced by
  deterministic SHA-256 hash prefixes (16 characters). Entity types and
  relationships are preserved.
- **Impact Dashboard** — aggregate statistics (loss totals, victim counts,
  trend charts) are available without PII exposure.
- **Victim Analytics** — age range, country, and contact channel breakdowns
  from intake records.

### Exporting Data

Use the researcher export endpoint to download anonymized datasets:

```
GET /exports/researcher/entities?format=csv
GET /exports/researcher/entities?format=json
```

Exports include entity type, hashed canonical value, case count, and rounded
loss amounts. Raw PII values are never included.

### Limitations

- Researchers cannot view individual case details or raw intake narratives.
- Entity values are one-way hashed; the original values cannot be recovered
  from exports.
- Loss amounts are rounded to the nearest $1,000.
- Access is read-only; researchers cannot modify cases, entities, or alerts.
