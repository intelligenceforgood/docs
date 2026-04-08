# Working in an Engagement

This page is for analysts and students who participate in engagements. It
covers how to select your engagement, understand your scoped view, review
cases, and check your performance.

## Selecting Your Engagement

When you sign in, the platform determines which engagement to show you:

1. **One active engagement** — you are automatically scoped to it.
2. **Multiple active engagements** — the engagement selector appears and
   you choose which one to work in.
3. **No active engagements** — you see a prompt: _"No active engagements.
   Contact your manager to get assigned to an engagement."_

The **Engagement Selector** is the dropdown at the top of the navigation bar.
It displays your current engagement name and status badge.

```
┌──────────────────────────────────────────────────────────────┐
│  I4G Console    [ Spring 2026 — UAB ▼]          🔔  👤 Jane  │
├──────────────────────────────────────────────────────────────┤
│  Dashboard  │  Cases  │  Intelligence  │  Impact  │ Reports  │
└──────────────────────────────────────────────────────────────┘
```

### Switching Engagements

Click the engagement selector to open the dropdown. You see:

- **Active engagements** — engagements currently in progress.
- **Past engagements** — completed engagements shown in a separate
  "Past" section with a read-only indicator.

Select an engagement to switch. The dashboard, case queue, search results,
and all analytics immediately refresh to show only data from the selected
engagement.

> **Note:** Analysts and students must always have an engagement selected.
> The "All Engagements" option is available only to managers and admins.

### What Happens When You Switch

- The dashboard refreshes to show the new engagement's metrics.
- The case queue filters to only cases assigned to the selected engagement.
- Search results are scoped to the engagement's cases.
- If you have unsaved work in a form, you see a "Discard changes?" prompt
  before the switch takes effect.

## Your Scoped View

Once an engagement is selected, every page in the console is scoped to that
engagement's cases:

| Page             | What You See                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| **Dashboard**    | Engagement summary card with case count, reviewed count, completion %, and days remaining.     |
| **Cases**        | Only cases assigned to your engagement.                                                        |
| **Search**       | Search results filtered to your engagement's cases. Facet counts reflect the engagement scope. |
| **Intelligence** | Entity and indicator statistics for your engagement's cases.                                   |
| **Impact**       | KPIs computed for your engagement's case set.                                                  |

### Deep Links

URLs include the engagement context as a query parameter:

```
https://app.intelligenceforgood.org/cases/abc123?engagement=spring-2026-uab
```

You can share these links with teammates. When they open the link, they see
the same engagement-scoped view.

If a deep link points to a case in a different engagement, you see the case
with an info badge: _"This case belongs to [Other Engagement]."_

## Reviewing Cases

Your daily workflow within an engagement:

1. Open the console. Your engagement is auto-selected or you pick it from the
   selector.
2. Check the **Dashboard** for your engagement summary card — it shows total
   cases, reviewed, remaining, and days left.
3. Navigate to **Cases** to see the queue of cases assigned to your engagement.
4. Open a case, review the narrative, timeline, and artifacts following the
   standard analyst workflow (see the [Analyst Guide](../analyst/index.md)).
5. Submit your review. Your activity is tracked for the engagement's analytics.

### Completed Engagements

When an engagement transitions to `completed`:

- A yellow banner appears at the top: **"This engagement has ended. Data is
  read-only. Review submissions are disabled."**
- You can still view cases, search, and browse analytics, but you cannot
  submit new reviews or modify case data.
- The engagement appears in the "Past" section of the selector dropdown.

## Checking Your Performance

### Engagement Summary Card

The dashboard displays a summary card for your active engagement:

- **Total Cases** — number of cases in the engagement.
- **Reviewed** — how many have been reviewed.
- **Completion %** — progress toward full coverage.
- **Days Remaining** — countdown to the engagement end date (if set).

### Leaderboard

If your manager has the leaderboard enabled, you can see your ranking among
peers. Navigate to your engagement's leaderboard from the management page
or via a link shared by your manager.

As an analyst, you see:

- **Your rank** — your position in the leaderboard (e.g., "#3 of 12").
- **Your metrics** — cases reviewed, accuracy, actions logged, and composite
  score.

> **Privacy:** Managers see the full leaderboard with all analyst names.
> Analysts see their own detailed metrics; other analysts' names are visible
> to all participants in the leaderboard view.

### What the Metrics Mean

| Metric                      | Description                                                                  |
| --------------------------- | ---------------------------------------------------------------------------- |
| **Cases Reviewed**          | Total cases you have reviewed in this engagement.                            |
| **Classification Accuracy** | How closely your classifications match the consensus or ground truth.        |
| **Risk Score MAE**          | Mean absolute error of your risk scores vs. the consensus. Lower is better.  |
| **Actions Logged**          | Total actions (close case, share, escalate) you performed.                   |
| **Composite Score**         | Weighted combination of accuracy, throughput, and quality. Used for ranking. |

## Frequently Asked Questions

**Can I participate in multiple engagements at the same time?**
Yes. Use the engagement selector to switch between them. Each engagement
tracks your activity independently.

**What if I can't find a case I was told to review?**
Make sure you have the correct engagement selected. Cases are scoped — you
only see cases assigned to your current engagement. If the case is not in
your engagement, ask your manager to assign it.

**Will my work carry over if a case is moved to another engagement?**
A case belongs to at most one engagement. If a manager reassigns a case,
your prior reviews on that case are preserved but the case will no longer
appear in your original engagement's queue.

**Can I see cases from other engagements?**
Analysts and students are always scoped to their selected engagement. You
cannot access the "All Engagements" view. This keeps your focus on the
cases relevant to your current work period.
