# Dossiers Guide (Analysts)

Use the Reports → Dossiers tab to validate bundles before sharing with partners.

![Analyst dossiers – list and filters](../../assets/screenshots/analyst-dossiers.png)

## Before you begin

- Sign into `https://app.intelligenceforgood.org/reports/dossiers` (IAP-protected).
- Ensure at least one dossier plan exists; if empty, ping ops to enqueue plans.

## Review and filter

1. Set **Status** and **Rows to load**, then refresh.
2. Each card shows jurisdiction, loss totals, cases, warning counts, and chips for manifest/signature paths.
3. Expand the payload accordion only if you need raw JSON (larger responses).

![Analyst dossiers – verification panel](../../assets/screenshots/analyst-dossiers-verify.png)

## Verify signatures

1. Click **Verify signatures** on a card.
2. Review missing/mismatch counts plus artifact hash rows to decide if the bundle is safe to distribute.
3. If failures repeat, alert ops to regenerate.

## Share with partners

- Copy manifest and signature paths into your case notes or handoff.
- Remind partners to download the `.signatures.json` alongside the PDF for independent verification.
- Capture the verification result (timestamp + hash snippets) in tickets for audit trails.
