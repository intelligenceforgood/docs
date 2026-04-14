# Auto-Investigation

Auto-investigation automates the process of investigating URLs found in
fraud cases. When a case is imported and contains suspicious URLs, the
platform can automatically trigger SSI scans without manual intervention.

## How It Works

1. **URL extraction** — the platform scans case narratives and evidence
   for URLs, creating URL indicators.
2. **Deduplication** — URLs are normalized (tracking parameters stripped,
   scheme lowercased) so visually different URLs pointing to the same
   page are treated as one.
3. **Filtering** — URLs on the
   [domain blocklist](site-investigation-config.md#domain-blocklist) are
   skipped.
4. **Investigation** — qualifying URLs are sent to SSI for scanning.
5. **Linking** — results are linked back to all originating cases.

## Enabling Auto-Investigation

Auto-investigation is **disabled by default**. Enable it from the SSI
settings page in the Console by toggling the **Auto-Investigate** switch.

When enabled, the platform periodically checks for un-investigated URLs
and triggers scans automatically.

## Configuration Options

| Setting              | Default  | What it controls                                                                  |
| -------------------- | -------- | --------------------------------------------------------------------------------- |
| **Enabled**          | Off      | Master toggle for auto-investigation.                                             |
| **Staleness (days)** | 30       | Scans older than this are eligible for re-scan.                                   |
| **Max Concurrent**   | 3        | Maximum investigations triggered per job run.                                     |
| **Domain Blocklist** | Built-in | Domains to skip. See [Site Investigation Settings](site-investigation-config.md). |

## URL Deduplication Logic

Before triggering a scan, the system checks whether the URL has been
recently investigated:

| Scenario              | What happens                                           |
| --------------------- | ------------------------------------------------------ |
| **Fresh scan exists** | Existing scan is linked to the case — no new scan.     |
| **Scan in progress**  | URL is skipped — the running scan will link on finish. |
| **Stale scan**        | A new investigation is triggered.                      |
| **No prior scan**     | A new investigation is triggered.                      |

## Viewing Auto-Investigation Results on a Case

Open any case detail page to see:

- **Activity bar** — horizontal bar showing running and completed background
  tasks (classification, extraction, SSI investigation) as pill badges.
- **Investigation status panel** — lists all URLs found in the case with
  their investigation status.
- **Investigation history** — timeline of all investigations for the same
  URL across the platform.

## Manual Override

Even when auto-investigation is enabled, analysts can:

- Click **Investigate** on any URL to trigger a manual scan.
- Click **Re-investigate** to force a new scan, even when a recent result
  exists. A confirmation modal shows the existing result summary before
  proceeding.

Manual investigations bypass the domain blocklist — useful for
investigating a specific URL on an otherwise-blocked domain.

## Learn more

- [Site Investigation Settings](site-investigation-config.md) — blocklist
  and concurrency configuration
- [Investigating Sites](../analyst-guide/investigating-sites.md) — the
  analyst investigation workflow
- [Site Investigations](../key-concepts/site-investigations.md) — how SSI
  works conceptually
