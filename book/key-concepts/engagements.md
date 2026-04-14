# Engagements

An **engagement** is a structured program — typically a university capstone
project or training exercise — where students and volunteers review fraud
cases under supervision. Engagements are how I4G scales its analyst
workforce while providing real-world cybersecurity experience.

## Why engagements exist

The platform receives more fraud reports than any single team can review.
Engagements solve this by bringing in university students as trained
analysts who review cases as part of their coursework. Students get
hands-on intelligence analysis experience; the platform gets scalable
analytical capacity.

## How engagements work

Each engagement is a scoped environment:

- **Case set** — a defined set of cases assigned to the engagement
- **Time window** — start and end dates for the program
- **Participants** — students or analysts assigned to the engagement
- **Leaderboard** — performance tracking with scoring metrics

When you're in an engagement, the entire Console scopes to that
engagement's cases. Your dashboard, search results, intelligence views,
and impact metrics all reflect only the cases in your engagement.

## Engagement lifecycle

![Engagement lifecycle](../assets/diagrams/engagement-lifecycle.svg)

<!--
State diagram: Draft → Active → Completed → Archived
-->

| Stage         | What happens                                           |
| ------------- | ------------------------------------------------------ |
| **Draft**     | Manager sets up the engagement — invisible to analysts |
| **Active**    | Live — analysts can see cases and submit reviews       |
| **Completed** | Ended — everything is read-only, results are final     |
| **Archived**  | Hidden from non-admin views, data retained long-term   |

Managers control transitions. The platform never auto-completes an
engagement when the end date passes — the manager decides when it's done.

## Scoring and leaderboards

When the leaderboard is enabled, participants are ranked by a composite
score that combines:

| Metric                      | What it measures                                  |
| --------------------------- | ------------------------------------------------- |
| **Cases Reviewed**          | Total reviews submitted                           |
| **Classification Accuracy** | How closely your classifications match consensus  |
| **Risk Score MAE**          | Mean absolute error vs. consensus risk scores     |
| **Actions Logged**          | Close, share, escalate — meaningful case actions  |
| **Composite Score**         | Weighted combination — your rank is based on this |

The leaderboard is transparent — all participants can see each other's
names and metrics.

## What you'll see in the Console

- **Engagement selector** — dropdown in the top-right to pick your
  engagement (auto-selected if you have only one)
- **Scoped dashboard** — summary card with case count, completion
  percentage, and days remaining
- **Scoped queue** — only your engagement's cases appear
- **Leaderboard** — your rank and metrics vs. peers

## Who is involved

| Role        | What they do                                          |
| ----------- | ----------------------------------------------------- |
| **Manager** | Creates engagements, assigns cases, monitors progress |
| **Analyst** | Reviews cases within the engagement scope             |
| **Admin**   | Archives engagements, manages access                  |

## Learn more

- [Working in an Engagement](../engagement-guide/working-in-engagement.md)
  — the analyst/student experience
- [Managing Engagements](../engagement-guide/managing-engagements.md) —
  the manager perspective
- [Engagement Lifecycle](../engagement-guide/lifecycle.md) — detailed
  stage transitions
