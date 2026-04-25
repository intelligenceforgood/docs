# Discoveries

The **Discoveries** page shows domains flagged by I4G's live monitoring pipeline as potential
phishing or scam infrastructure. I4G continuously watches certificate-transparency logs for new
domain registrations that match your brand watchlist. When a match is found, the domain appears
here so you can investigate or dismiss it.

## What You See on the Page

| Column | What it tells you |
|---|---|
| **Domain** | The newly registered domain name. |
| **Seen at** | When the domain appeared in the certificate-transparency stream. |
| **Source** | Which monitoring pipeline detected it (currently `merklemap.tail`). |
| **Filter reason** | The brand-keyword pattern that matched, e.g. `trust.?wallet`. |
| **Status** | One of: *Pending*, *Enqueued* (investigation started), or *Dismissed*. |

The list is paginated (50 per page by default) and sorted newest-first. Use the **Since** filter
to narrow to domains discovered in a specific time window.

## Actions

### Enqueue

Clicking **Enqueue** on a pending discovery starts a passive investigation of the domain:

1. I4G creates an SSI scan record and submits the domain to the SSI investigation service.
2. The domain's **Status** changes to *Enqueued* and the scan ID appears in the row.
3. You can follow the investigation on the [Site Investigation](site-investigation.md) page.

A discovery can only be enqueued once. If the scan has already started, the button is disabled.
You cannot enqueue a dismissed discovery.

### Dismiss

Clicking **Dismiss** marks the domain as a false positive and removes it from the active list:

1. Enter an optional reason (up to 500 characters) in the confirmation dialog.
2. Confirm. The domain moves out of the list immediately.
3. Dismissed discoveries are retained for audit purposes but do not count in totals.

A dismissed discovery cannot be un-dismissed from the UI. Contact your administrator if you
need to reverse a dismissal.

## Typical Workflow

1. Open **Discoveries** and filter by the last 24 hours.
2. Review each pending domain. Check whether the name is a credible impersonation.
3. For likely phishing domains: click **Enqueue** to start a passive scan.
4. For obvious false positives (e.g. a legitimate renewal of your own domain): click **Dismiss**.
5. After enqueueing, monitor the investigation on the [Site Investigation](site-investigation.md)
   page or check [Live Monitoring](live-monitoring.md) for real-time activity.

## Related Pages

- [Live Monitoring](live-monitoring.md) — real-time stream of incoming domain events.
- [Watchlist & Alerts](watchlist-and-alerts.md) — manage the brand keywords that drive the
  filter shown in the **Filter reason** column.
- [Site Investigation](site-investigation.md) — view and manage investigations started from
  the **Enqueue** action.
