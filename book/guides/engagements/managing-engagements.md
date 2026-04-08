# Managing Engagements

Welcome, engagement manager! Whether you're a professor setting up a semester
competition, a program coordinator running a multi-university exercise, or an
I4G staff member organizing a law-enforcement operation — this guide walks you
through every step from creating your first engagement to archiving the
results.

## Before You Start

You need the **manager** role (or higher). If you don't see the
**Engagements** link in the sidebar, ask your platform administrator for a
role upgrade.

## Opening the Management Page

Click **Engagements** in the left sidebar (or navigate directly to
`/admin/engagements`). You'll land on the management page, which shows:

- A summary bar with counts of total, active, and past engagements.
- A **New Engagement** button in the top-right corner.
- A **Compare Engagements** link (appears once you have past engagements).
- A table of all engagements with status badges, dates, and quick-action
  buttons.

## Creating an Engagement

1. Click **New Engagement**.
1. Fill in the details:

| Field           | Required | What to enter                                                           |
| --------------- | -------- | ----------------------------------------------------------------------- |
| **Name**        | Yes      | A descriptive name, e.g. "Spring 2026 — UAB" or "Q2 2026 LEA Exercise". |
| **Description** | No       | Course number, partner organization, objectives — anything helpful.     |
| **Starts At**   | No       | Scheduled start date. Informational only — it won't auto-activate.      |
| **Ends At**     | No       | Scheduled end date. Powers the countdown timer on the dashboard.        |

1. Click **Create**. Your engagement starts in **draft** status — invisible
   to analysts until you activate it.

> **Tip — naming convention:** Stick to a pattern like
> _"Season Year — Institution"_ so engagements sort neatly in dropdowns
> and comparison views.

## Assigning Cases

A competition is only as good as its case set. You have two ways to populate
an engagement:

### Option A: Bulk assignment (most common)

1. Find your engagement in the table and click **Assign Cases**.
2. Paste case IDs (comma-separated or one per line).
3. Click **Assign**. A confirmation banner shows how many cases were added.

This is the go-to method: curate a case set from the existing corpus, then
assign it in one shot.

### Option B: Tag cases during ingestion

Set the `INGEST__ENGAGEMENT_ID` environment variable to the engagement UUID
before running an ingestion job. Every case created during that run is
automatically tagged.

Handy when a fresh batch of cases arrives specifically for a competition
round.

### Removing cases

Click **Remove Cases** on the management page, enter the case IDs, and
confirm. Removed cases stay in the system — they simply lose their engagement
tag and become visible only in the "All Engagements" view.

> **Good to know:** A case belongs to at most one engagement. If you assign a
> case that's already in another engagement, it moves to the new one.

## Activating the Engagement

Once your case set is ready and participants are onboarded:

1. Click the **Activate** button (▶ play icon) next to the engagement.
2. Status flips from `draft` → `active`.
3. The engagement immediately appears in analysts' **Engagement Selector**
   (the dropdown in the top-right corner of the console).

**What happens behind the scenes:**

- If an analyst has only one active engagement, it's auto-selected for them.
- The dashboard starts showing real-time progress metrics.
- The leaderboard begins tracking analyst performance.

## Monitoring Progress

### Summary card

Select an active engagement and the dashboard presents a summary card at a
glance:

| Metric             | What it tells you                            |
| ------------------ | -------------------------------------------- |
| **Total Cases**    | How many cases are in the engagement.        |
| **Reviewed**       | Cases that have been reviewed at least once. |
| **Remaining**      | Cases still awaiting review.                 |
| **Completion %**   | Visual progress bar toward full coverage.    |
| **Days Remaining** | Countdown to your end date (if one is set).  |
| **Analyst Count**  | Number of analysts actively participating.   |

### Scoped dashboard

All dashboard KPIs — total cases, loss amounts, detection velocity, indicator
counts — are **automatically scoped** to the selected engagement. You're
looking at _your_ competition's numbers, not the whole platform.

### Leaderboard

Click the **Leaderboard** icon (🏆 trophy) on any engagement row to see
ranked analyst performance. The leaderboard shows each analyst's rank, cases
reviewed, accuracy, risk score MAE, actions logged, and composite score.
See [Leaderboard & Analytics](leaderboard.md) for the full scoring
methodology.

### "All Engagements" mode

As a manager, you have one extra option in the engagement selector:
**All Engagements** (🌏 globe icon). This removes the engagement filter and
shows platform-wide data — useful for monitoring overall health or working
with unassigned cases.

## Completing the Engagement

When the competition or exercise wraps up:

1. Click **Complete** (✓ checkmark icon) on the management page.
2. Status changes to `completed`.
3. Analysts see a yellow banner: _"This engagement has ended. Data is
   read-only."_
4. Review submissions are disabled; analytics and leaderboard data are frozen.

> **No surprise cutoffs:** The platform never auto-completes an engagement
> when the end date passes. Competitions sometimes run long, and an automatic
> cutoff would disrupt active work. You decide when it's done.

### Oops — completed too early?

An admin can revert the engagement to `draft` status. This re-enables
submissions and removes the read-only banner.

## Exporting Results

From the leaderboard page, two export options are available:

- **Export CSV** — a spreadsheet-ready file with columns: Rank, Analyst,
  Cases Reviewed, Avg Review Time, Classification Accuracy, Risk Score MAE,
  Actions Logged, Composite Score.
- **Export JSON** — a structured file with the engagement summary _and_ the
  full leaderboard. Great for programmatic processing or archival.

**Perfect for:**
awards ceremonies, grant reporting, post-engagement debriefs, and
institutional records.

## Archiving

After results are exported and presented:

1. An **admin** clicks **Archive** (only admins can archive).
2. The engagement disappears from non-admin views.
3. All data is retained in the database for historical queries and BigQuery
   exports.

## Running Multiple Engagements

### Multi-university deployment

Running competitions at several institutions simultaneously? Create a
separate engagement for each — e.g. "Spring 2026 — UAB",
"Spring 2026 — GWU", "Spring 2026 — CMU" — assign the appropriate case sets,
activate them all, and use the [comparison view](comparison.md) to monitor
everything side by side.

### Engagement selector behavior

- You can switch freely between engagements using the selector.
- The management page always shows _all_ engagements regardless of your
  current selection.

## Tips for a Successful Engagement

1. **Prepare before you activate.** Build the engagement in `draft`, assign
   all cases, then flip to `active`. Analysts won't see a half-populated
   case queue.
2. **Set clear dates.** Even though dates are informational, they power the
   dashboard countdown and help analysts pace their work.
3. **Use descriptive names.** Include semester, year, and institution.
   These show up everywhere — dropdowns, comparison views, exports.
4. **Check in weekly.** Monitor completion % and the leaderboard
   mid-engagement. If progress stalls, redistribute workload or extend the
   deadline.
5. **Export before archiving.** The data survives archival, but the export
   UI isn't accessible to non-admin users.
6. **Communicate transitions.** Let participants know when you activate or
   complete. The system shows banners, but a direct message reinforces
   expectations.

## Frequently Asked Questions

**Can I reassign a case from one engagement to another?**
Yes — remove it from the original, then assign it to the new one. Review
history is preserved.

**What happens to reviews if I remove a case?**
Reviews belong to the case, not the engagement. The case simply becomes
unscoped; its reviews remain intact.

**Can I create an engagement without dates?**
Absolutely. Dates are optional. You just won't see the countdown timer on
the dashboard.

**Can I edit an active engagement?**
Yes. You can update the name, description, and dates at any time. You can
also add or remove cases while the engagement is live.

**How many engagements can I create?**
No hard limit. The selector groups active engagements first and tucks past
ones into a separate section to keep things tidy. Admins can archive old
engagements that are no longer needed in the UI.

**Is engagement scoping a security boundary?**
No — it's a convenience filter that keeps analysts focused. Your role-based
permissions still control what data you can access. Think of it as a lens,
not a wall.
