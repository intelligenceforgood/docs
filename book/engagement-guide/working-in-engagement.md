# Working in an Engagement

This guide is for analysts and students who participate in engagements —
competitions, semester exercises, or operational rounds. You'll learn how to
pick your engagement, understand what changes in your console, review cases,
and track your progress against your peers.

## Selecting Your Engagement

When you sign in, the platform figures out which engagement to show you:

| Situation                       | What happens                                                           |
| ------------------------------- | ---------------------------------------------------------------------- |
| **One active engagement**       | You're automatically scoped to it — no action needed.                  |
| **Multiple active engagements** | The **Engagement Selector** appears; pick the one you want to work in. |
| **No active engagements**       | You see a prompt asking you to contact your manager to get assigned.   |

### Where is the Engagement Selector?

Look for the dropdown in the **top-right corner** of the main content area. It
shows your current engagement name and a colored status badge (e.g.
_Spring 2026 — UAB_ with a green "active" badge).

### Switching engagements

Click the selector to open it. You'll see two groups:

- **Active** — engagements currently in progress.
- **Past** — completed engagements, shown with a read-only indicator.

Pick an engagement and the entire console refreshes instantly — dashboard,
cases, search results, intelligence, and impact pages all scope to the
selected engagement.

> **Note:** The **All Engagements** option is reserved for managers and admins.
> As an analyst, you always work within a specific engagement.

### What happens when you switch

- Dashboard metrics refresh to show the new engagement.
- The case queue filters to only cases assigned to that engagement.
- Search results are scoped to the engagement's cases.
- If you have unsaved work, you'll see a "Discard changes?" prompt first.

## Your Scoped View

Once an engagement is selected, every page in the console focuses on that
engagement's data:

| Page             | What you see                                                                            |
| ---------------- | --------------------------------------------------------------------------------------- |
| **Dashboard**    | Summary card with case count, reviewed count, completion %, and days remaining.         |
| **Cases**        | Only cases assigned to your engagement — nothing else.                                  |
| **Search**       | Results filtered to your engagement's cases. Facet counts reflect the engagement scope. |
| **Intelligence** | Entity and indicator statistics computed from your engagement's cases.                  |
| **Impact**       | KPI metrics for your engagement's case set.                                             |

### Deep links

URLs carry engagement context as a query parameter:

```text
https://app.intelligenceforgood.org/cases/abc123?engagement=spring-2026-uab
```

Share these with teammates — they'll land right in the same engagement-scoped
view. If a link points to a case in a _different_ engagement, you'll see the
case with an info badge explaining where it belongs.

## Your Daily Workflow

Here's a typical session inside an engagement:

1. **Sign in.** Your engagement is auto-selected (or pick one from the
   selector).
2. **Check the dashboard.** The summary card shows total cases, reviewed,
   remaining, and days left — a quick pulse on where things stand.
3. **Open Cases.** Browse the queue of cases assigned to your engagement.
4. **Review a case.** Read the narrative, explore the timeline and artifacts,
   then submit your classification and risk score following the standard
   [analyst workflow](../analyst-guide/README.md).
5. **Repeat.** Every review you submit feeds into the engagement's analytics
   and leaderboard.

### When an engagement ends

If your manager marks the engagement as `completed`:

- A yellow banner appears: **"This engagement has ended. Data is read-only.
  Review submissions are disabled."**
- You can still browse cases, search, and view analytics — you just can't
  submit new reviews.
- The engagement moves to the "Past" section of the selector.

## Tracking Your Performance

### Summary card

The dashboard displays a summary card for your active engagement showing:

| Metric             | What it means                                  |
| ------------------ | ---------------------------------------------- |
| **Total Cases**    | Number of cases in the engagement.             |
| **Reviewed**       | How many have received at least one review.    |
| **Completion %**   | Progress toward full coverage.                 |
| **Days Remaining** | Countdown to the engagement end date (if set). |

### Leaderboard

If your manager has the leaderboard enabled, you can see how you stack up
against your peers. Your manager will share a link, or you can find it on
the engagement detail page.

On the leaderboard, you'll see:

- **Your rank** among all participants (e.g. "#3 of 12").
- **Your metrics** — cases reviewed, classification accuracy, risk score
  consistency, actions logged, and your composite score.

> **Privacy note:** All participants can see each other's names and metrics
> on the leaderboard. Your manager sees the same view plus export options.

### What the metrics mean

| Metric                      | Description                                                                |
| --------------------------- | -------------------------------------------------------------------------- |
| **Cases Reviewed**          | Total cases you've reviewed in this engagement.                            |
| **Classification Accuracy** | How closely your classifications match the consensus or ground truth.      |
| **Risk Score MAE**          | Mean absolute error of your risk scores vs. consensus. Lower is better.    |
| **Actions Logged**          | Total actions (close case, share, escalate) you performed.                 |
| **Composite Score**         | Weighted combination of accuracy, throughput, and quality — your rank key. |

See [Leaderboard & Analytics](leaderboard.md) for the full scoring formula.

## Frequently Asked Questions

**Can I participate in multiple engagements at the same time?**
Yes! Use the selector to switch between them. Each engagement tracks your
activity independently.

**I can't find a case I was told to review.**
Make sure you have the correct engagement selected — cases are scoped. If the
case isn't in your engagement, ask your manager to assign it.

**Will my work carry over if a case is moved to another engagement?**
Your reviews stay attached to the case no matter where it goes. If a manager
moves the case, it leaves your engagement's queue but your prior reviews are
preserved.

**Can I see cases from other engagements?**
No — analysts are always scoped to their selected engagement. This keeps your
focus on the cases that matter for your current work period.
