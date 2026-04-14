# Managing Engagements

This guide walks you through every step of running an engagement — from
creating a draft to archiving the results. You need the **manager** role
or higher.

## Opening the Management Page

Click **Engagements** in the left sidebar (or navigate to
`/admin/engagements`). The management page shows:

- A summary bar with counts of total, active, and past engagements.
- A **New Engagement** button in the top-right corner.
- A **Compare Engagements** link (appears once you have past engagements).
- A table of all engagements with status badges, dates, and quick-action
  buttons.

## Creating an Engagement

1. Click **New Engagement**.
2. Fill in the details:

| Field           | Required | What to enter                                                           |
| --------------- | -------- | ----------------------------------------------------------------------- |
| **Name**        | Yes      | A descriptive name, e.g. "Spring 2026 — UAB" or "Q2 2026 LEA Exercise". |
| **Description** | No       | Course number, partner organization, objectives — anything helpful.     |
| **Starts At**   | No       | Scheduled start date. Informational — it won't auto-activate.           |
| **Ends At**     | No       | Scheduled end date. Powers the countdown timer on the dashboard.        |

1. Click **Create**. The engagement starts in **draft** status — invisible
   to analysts until you activate it.

> **Tip — naming convention:** Use a pattern like
> _"Season Year — Institution"_ so engagements sort neatly in dropdowns
> and comparison views.

## Assigning Cases

Every engagement needs a case set. You have two options:

### Bulk assignment (most common)

1. Find your engagement in the table and click **Assign Cases**.
2. Paste case IDs (comma-separated or one per line).
3. Click **Assign**. A confirmation banner shows how many cases were added.

### Removing cases

Click **Remove Cases** on the management page, enter the case IDs, and
confirm. Removed cases stay in the system — they lose their engagement
tag and become visible only in the "All Engagements" view.

> A case belongs to at most one engagement. If you assign a case that's
> already in another engagement, it moves to the new one.

## Activating the Engagement

Once your case set is ready and participants are onboarded:

1. Click the **Activate** button (▶ play icon) next to the engagement.
2. Status flips from `draft` → `active`.
3. The engagement immediately appears in analysts'
   [Engagement Selector](working-in-engagement.md#where-is-the-engagement-selector).

Behind the scenes:

- If an analyst has only one active engagement, it's auto-selected.
- The dashboard starts showing real-time progress metrics.
- The [leaderboard](leaderboard.md) begins tracking analyst performance.

## Monitoring Progress

### Summary card

The dashboard displays a summary card for the active engagement:

| Metric             | What it tells you                            |
| ------------------ | -------------------------------------------- |
| **Total Cases**    | How many cases are in the engagement.        |
| **Reviewed**       | Cases that have been reviewed at least once. |
| **Remaining**      | Cases still awaiting review.                 |
| **Completion %**   | Visual progress bar toward full coverage.    |
| **Days Remaining** | Countdown to your end date (if one is set).  |
| **Analyst Count**  | Number of analysts actively participating.   |

### Scoped dashboard

All dashboard KPIs — total cases, loss amounts, detection velocity,
indicator counts — are automatically scoped to the selected engagement.
You see _your_ competition's numbers, not the whole platform.

### Leaderboard

Click the **Leaderboard** icon (🏆 trophy) on any engagement row to see
ranked analyst performance. See
[Leaderboard & Performance](leaderboard.md) for the full scoring
methodology.

### "All Engagements" mode

As a manager, you have one extra option in the engagement selector:
**All Engagements** (🌏 globe icon). This removes the engagement filter
and shows platform-wide data — useful for monitoring overall health or
working with unassigned cases.

## Completing the Engagement

When the competition or exercise wraps up:

1. Click **Complete** (✓ checkmark icon) on the management page.
2. Status changes to `completed`.
3. Analysts see a yellow banner: _"This engagement has ended. Data is
   read-only."_
4. Review submissions are disabled; analytics and leaderboard are frozen.

> **No surprise cutoffs:** The platform never auto-completes an engagement
> when the end date passes. You decide when it's done.

### Completed too early?

An admin can revert the engagement to `draft` status. This re-enables
submissions and removes the read-only banner.

## Exporting Results

From the [leaderboard](leaderboard.md) page, two export options are
available:

- **Export CSV** — a spreadsheet with columns: Rank, Analyst, Cases
  Reviewed, Avg Review Time, Classification Accuracy, Risk Score MAE,
  Actions Logged, Composite Score. Great for award ceremonies and
  grant reporting.
- **Export JSON** — a structured file with the engagement summary _and_
  the full leaderboard. Ideal for programmatic processing or archival.

## Comparing Engagements

Once you have past engagements, click **Compare Engagements** on the
management page. The comparison view:

- Shows up to 10 most recent active or completed engagements side by side.
- Displays analytics grids for comparing case volume, completion rates,
  average review times, and classification distributions.
- Helps identify which engagement designs produce the best outcomes.

## Archiving

After results are exported and presented:

1. An **admin** clicks **Archive** (📦 archive icon) — only admins can
   archive.
2. The engagement disappears from non-admin views.
3. All data is retained in the database for historical queries.

## Running Multiple Engagements

Running competitions at several institutions simultaneously? Create a
separate engagement for each — e.g. "Spring 2026 — UAB",
"Spring 2026 — GWU", "Spring 2026 — CMU" — assign the appropriate case
sets, activate them all, and use the comparison view to monitor everything
side by side.

## Tips for a Successful Engagement

1. **Prepare before you activate.** Build the engagement in `draft`, assign
   all cases, then flip to `active`. Analysts won't see a half-populated
   case queue.
2. **Set clear dates.** Even though dates are informational, they power the
   dashboard countdown and help analysts pace their work.
3. **Use descriptive names.** Include semester, year, and institution.
4. **Check in weekly.** Monitor completion % and the leaderboard
   mid-engagement. If progress stalls, redistribute workload or extend
   the deadline.
5. **Export before archiving.** Once archived, the export UI is only
   accessible to admins.

## Learn more

- [Engagements](../key-concepts/engagements.md) — foundational concepts
- [Engagement Lifecycle](lifecycle.md) — stage transitions in detail
- [Working in an Engagement](working-in-engagement.md) — the analyst
  perspective
