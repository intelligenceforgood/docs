# Auto-Investigation

Auto-investigation automates the process of triggering SSI scans for URLs found in ingested fraud cases. When a case is imported through batch ingestion and contains suspicious URLs, the platform can automatically investigate those URLs without manual intervention.

## How It Works

1. **URL extraction** — The `linkage_extract` job (with `--mode=cases`) scans case narratives and creates URL indicators in the `indicators` table.
2. **Auto-investigate job** — The `auto_investigate` worker job queries URL indicators that have no linked investigation, deduplicates them by normalized URL, filters through the domain blocklist, and triggers SSI investigations for qualifying URLs.
3. **Linking** — Results are linked back to all originating cases via the `case_investigations` table with `trigger_type='auto'`.

## Enabling Auto-Investigation

Auto-investigation is disabled by default. Enable it with:

```bash
export I4G_AUTO_INVESTIGATE__ENABLED=true
```

Or in `config/settings.local.toml`:

```toml
[auto_investigate]
enabled = true
staleness_days = 30
max_concurrent = 3
domain_blocklist = []
```

## Configuration

| Setting            | Env Var                                  | Default | Description                                          |
| :----------------- | :--------------------------------------- | :------ | :--------------------------------------------------- |
| `enabled`          | `I4G_AUTO_INVESTIGATE__ENABLED`          | `false` | Master toggle for auto-investigation                 |
| `staleness_days`   | `I4G_AUTO_INVESTIGATE__STALENESS_DAYS`   | `30`    | Scans older than this are eligible for re-scan       |
| `max_concurrent`   | `I4G_AUTO_INVESTIGATE__MAX_CONCURRENT`   | `3`     | Maximum investigations triggered per job run         |
| `domain_blocklist` | `I4G_AUTO_INVESTIGATE__DOMAIN_BLOCKLIST` | `[]`    | Domains to skip (e.g., `google.com`, `facebook.com`) |

The domain blocklist merges with a built-in default list of common legitimate domains (Google, Facebook, Twitter, YouTube, etc.). You only need to add domain-specific entries.

## URL Deduplication

Before triggering an investigation, the system checks whether the URL (in normalized form) has been recently investigated:

- **Fresh scan exists** (within `staleness_days`) — The existing scan is linked to the case instead of triggering a new one.
- **Scan in progress** — The URL is skipped; the running investigation will be linked once it completes.
- **Stale scan** — A new investigation is triggered.
- **No prior scan** — A new investigation is triggered.

URL normalization strips tracking parameters (`utm_*`, `fbclid`, etc.), removes fragments, sorts query parameters, and lowercases the scheme and hostname so that visually different URLs pointing to the same page are deduplicated.

## Viewing Investigation Status on a Case

Open the case detail page to see:

- **Activity bar** — Horizontal bar at the top showing running and completed background tasks (classification, linkage extraction, SSI investigation) as pill badges.
- **Investigation status panel** — Lists all URLs found in the case with their investigation status (investigated, in progress, not yet investigated, failed).
- **Investigate / Re-investigate buttons** — Trigger manual investigations for specific URLs. If the URL was recently investigated, a dedup warning modal offers to view the existing result or force a re-investigation.
- **Investigation history** — Timeline view of all investigations for the same normalized URL across the platform.

## Re-Investigation

You can force a re-investigation even when a recent scan exists:

1. Click **Re-investigate** on the URL in the investigation status panel.
2. The dedup warning modal shows the existing result summary (risk score, date).
3. Click **Re-investigate Anyway** to trigger a new scan with `force=true`.

The new investigation is linked to the case alongside the existing one, preserving historical context.

## Running Manually

```bash
# Dry run — see what would be triggered
conda run -n i4g I4G_PROJECT_ROOT=$PWD I4G_AUTO_INVESTIGATE__ENABLED=true \
    i4g jobs auto-investigate --dry-run --limit 10

# Live run
conda run -n i4g I4G_PROJECT_ROOT=$PWD I4G_AUTO_INVESTIGATE__ENABLED=true \
    i4g jobs auto-investigate --limit 10
```

## Domain Blocklist

Override the blocklist per environment:

```bash
export I4G_AUTO_INVESTIGATE__DOMAIN_BLOCKLIST='["mycompany.com","partner-site.org"]'
```

Subdomain matching is automatic — blocking `google.com` also blocks `mail.google.com` and `docs.google.com`, but does **not** block `notgoogle.com`.

To investigate a URL on a blocked domain for a specific case, use the manual **Investigate** button on the case detail page — the domain blocklist only applies to the auto-investigation job.
