# Managing Engagements

This page is for engagement managers — professors, program coordinators, and
I4G staff who create, configure, and run engagements. It covers the full
lifecycle from planning a competition to archiving results.

## Before You Start

You need the **manager** role (or higher) to create and manage engagements.
If you do not have this role, contact your platform administrator.

## Accessing Engagement Management

Navigate to **Admin → Engagement Management** (or go directly to
`/admin/engagements`). This page shows:

- A count of total engagements, active engagements, and past engagements.
- A **New Engagement** button to create one.
- A **Compare Engagements** link (when past engagements exist).
- A table listing all engagements with status, dates, and action buttons.

## Creating an Engagement

1. Click **New Engagement** on the management page.
2. Fill in the form:

| Field           | Required | Description                                                              |
| --------------- | -------- | ------------------------------------------------------------------------ |
| **Name**        | Yes      | A descriptive name, e.g., "Spring 2026 — UAB" or "Q2 2026 LEA Exercise". |
| **Description** | No       | Additional context: course number, partner organization, objectives.     |
| **Starts At**   | No       | Scheduled start date. Informational — does not auto-activate.            |
| **Ends At**     | No       | Scheduled end date. Displayed in the countdown on dashboard cards.       |

3. Click **Create**. The engagement starts in `draft` status.

> **Naming convention:** Use a pattern like "[Season Year — Institution]" for
> easy identification in dropdowns and comparison views.

## Assigning Cases to the Engagement

Cases can be assigned in two ways:

### Bulk Assignment (Post-Hoc)

1. On the engagement management page, click the **Assign Cases** action for
   your engagement.
2. Enter case IDs — paste a comma-separated or newline-separated list.
3. Click **Assign**. You see a confirmation: _"Assigned N case(s)."_

This is the most common method for competition setup: curate a set of cases
from the existing corpus and assign them to the engagement.

### During Ingestion

When running an ingestion job, set the `INGEST__ENGAGEMENT_ID` environment
variable to the engagement's UUID. All cases created during that ingestion
run are automatically tagged with the engagement.

This is useful when a batch of new cases arrives specifically for a
competition round.

### Removing Case Assignments

To remove cases from an engagement:

1. Use the **Remove Cases** action on the management page.
2. Enter the case IDs to remove.
3. Confirm. The cases' `engagement_id` is cleared (set to null). They remain
   in the system but are no longer scoped to the engagement.

> **Important:** A case can belong to at most one engagement. Assigning a case
> to a new engagement removes it from its previous one.

## Activating the Engagement

When your case set is ready and participants are onboarded:

1. Click the **Activate** button (play icon) next to the engagement.
2. The status changes from `draft` to `active`.
3. The engagement now appears in the engagement selector for all participants.

### What Happens on Activation

- Analysts assigned to the platform see the engagement in their selector
  dropdown.
- If it is their only active engagement, it is auto-selected.
- The dashboard begins showing real-time progress metrics.
- The leaderboard begins accumulating analyst performance data.

## Monitoring Progress

### Engagement Summary Card

When you select an active engagement, the dashboard shows a summary card with:

- **Total Cases** — number of cases assigned.
- **Reviewed** — how many have been reviewed.
- **Remaining** — how many are unreviewed.
- **Completion %** — progress bar.
- **Days Remaining** — countdown to `ends_at` (if set).
- **Analyst Count** — number of active analysts.

### Real-Time Dashboard

All dashboard KPIs (total cases, loss amounts, detection velocity, etc.) are
automatically scoped to the selected engagement. You see the engagement's
metrics, not global platform metrics.

### Leaderboard

Navigate to the engagement's leaderboard page to see ranked analyst
performance:

- View from the management table: click the **Leaderboard** (trophy icon)
  next to any engagement.
- The leaderboard shows each analyst's rank, cases reviewed, accuracy,
  risk score MAE, actions logged, and composite score.

### "All Engagements" Mode

As a manager, you can select **All Engagements** from the engagement selector
(globe icon). This removes the engagement filter and shows platform-wide data.
Use this to monitor overall platform health or work with cases that are not
assigned to any engagement.

## Completing the Engagement

When the competition or exercise ends:

1. Click the **Complete** button (checkmark icon) on the management page.
2. The status changes from `active` to `completed`.
3. Analysts see a read-only banner: _"This engagement has ended. Data is
   read-only."_
4. Review submissions are disabled for the engagement's cases.
5. Analytics and leaderboard data are frozen.

> **Note:** Lifecycle transitions are manual. The system does not automatically
> complete an engagement when `ends_at` passes. This prevents interrupting a
> competition that runs over schedule.

### Reverting a Completion

If an engagement was completed prematurely, an admin can revert it to `draft`
status. This re-enables submissions and removes the read-only banner.

## Exporting Results

From the leaderboard page, export the engagement's analytics and leaderboard:

- **Export CSV** — downloads a CSV file with columns: Rank, Analyst, Cases
  Reviewed, Avg Review Time, Classification Accuracy, Risk Score MAE,
  Actions Logged, Composite Score.
- **Export JSON** — downloads a JSON file with the engagement summary
  (case count, completion %, classification distribution) and full
  leaderboard entries.

Use these exports for:

- Awards ceremonies and certificates.
- Grant reporting and institutional metrics.
- Post-engagement debriefs and improvement analysis.
- Archival records.

## Archiving

After results have been exported and presented:

1. An admin can archive the engagement (only admins can archive).
2. Archived engagements are hidden from all non-admin views.
3. Data is retained for historical queries and future reference.

Archived engagements do not appear in the selector dropdown or the management
table for non-admin users.

## Managing Multiple Engagements

### Multi-University Deployment

For concurrent engagements across institutions:

1. Create a separate engagement for each university/program (e.g.,
   "Spring 2026 — UAB", "Spring 2026 — GWU", "Spring 2026 — CMU").
2. Assign the appropriate case sets to each.
3. Activate all engagements.
4. Use the [comparison view](comparison.md) to monitor all engagements
   side-by-side.

### Engagement Selector Behavior for Managers

- You can switch between all engagements via the selector.
- Select "All Engagements" to see the full platform view.
- The management page always shows all engagements regardless of your
  current selector state.

## Tips for a Successful Engagement

1. **Prepare cases before activating.** Create the engagement in `draft`
   status, assign all cases, then activate. This prevents analysts from
   seeing a half-populated case set.

2. **Set clear dates.** Even though dates are informational, they appear in
   the dashboard countdown and help analysts plan their work.

3. **Use descriptive names.** Include the semester, year, and institution.
   Future comparison views will surface these names.

4. **Monitor weekly.** Check the completion percentage and leaderboard
   mid-engagement. If progress is slow, you can adjust deadlines or
   redistribute workload.

5. **Export before archiving.** Once archived, the engagement data is
   still queryable but the export UI is not accessible to non-admin users.

6. **Communicate transitions.** Let participants know when you activate or
   complete an engagement. The system shows banners, but a direct
   communication reinforces expectations.

## Frequently Asked Questions

**Can I reassign a case from one engagement to another?**
Yes. Remove the case from the original engagement, then assign it to the new
one. The case's review history is preserved.

**What happens to reviews if I remove a case from an engagement?**
Reviews are attached to cases, not engagements. Removing a case from an
engagement does not delete its reviews. The case simply becomes unscoped.

**Can I create an engagement without dates?**
Yes. Start and end dates are optional. The engagement is still fully
functional — you just won't see countdown metrics on the dashboard.

**Can I edit an active engagement?**
Yes. You can change the name, description, and dates of an active engagement.
You can also assign or remove cases while the engagement is active.

**How many engagements can I create?**
There is no hard limit. The selector shows active engagements first and groups
past engagements in a separate section to keep the dropdown manageable.
Completed engagements are auto-grouped; very old ones can be archived by an
admin.

**Is engagement scoping a security boundary?**
No. Engagement scoping is a convenience filter that reduces noise. It is not
an access control mechanism. Your role-based permissions determine what data
you can access. An analyst scoped to one engagement cannot see other
engagements' cases, but this is a filter — not a security wall.
