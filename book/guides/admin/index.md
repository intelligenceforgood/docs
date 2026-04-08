# Admin Guide

This section covers platform administration tasks: CLI management, scheduled reports, partner feed configuration, auto-investigation setup, and engagement administration.

## Topics

- [CLI Guide](cli.md) — Command-line tools for managing the platform
- [Scheduled Reports](scheduled_reports.md) — Configure automated report generation
- [Partner Feed](partner_feed.md) — Set up and manage partner indicator feeds

## Engagement Administration

Managers handle day-to-day engagement operations (create, activate, complete).
Admins have two additional capabilities:

### Archiving Engagements

Only admins can archive a completed engagement. Archiving hides it from all
non-admin views (selector dropdown, management page). Data is retained in the
database and BigQuery exports.

To archive: go to **Admin → Engagement Management**, find the completed
engagement, and click the **Archive** action.

### Reverting Lifecycle State

If an engagement was transitioned prematurely (e.g., accidentally completed
while analysts were still working), an admin can revert it to `draft` status.
This re-enables submissions and removes the read-only banner.

Use the `PATCH /engagements/{id}` API endpoint with `{"status": "draft"}`,
or contact the engineering team to make the change via the admin console.

### Cross-Engagement Visibility

Admins always default to "All Engagements" mode and can see every engagement
regardless of status. This includes draft engagements being prepared by
managers and archived engagements hidden from other users.

For the full engagements guide, see
[Engagements](../engagements/index.md).
