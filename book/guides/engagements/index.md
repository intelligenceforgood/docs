# Engagements Guide

Engagements are bounded work periods that scope cases to a specific competition,
semester, exercise, or operational round. They answer the question: "Which cases
should this group of analysts work on, and how do we measure their performance?"

## Who This Guide Is For

- **Engagement Managers** — professors, program coordinators, and I4G staff who
  create and run engagements (competitions, semester exercises, LEA operations).
- **Analysts / Students** — participants who review cases within an engagement
  and want to understand how their work is tracked.
- **Platform Administrators** — ops team members who manage engagements across
  multiple universities and need cross-engagement visibility.

## What Engagements Provide

| Capability                      | Description                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Case scoping**                | Analysts see only the cases assigned to their engagement, not the entire case corpus.                |
| **Real-time dashboard**         | Per-engagement metrics: case count, review progress, completion percentage, days remaining.          |
| **Leaderboard**                 | Ranked analyst performance within an engagement based on accuracy, throughput, and quality.          |
| **Lifecycle management**        | Engagements move through `draft → active → completed → archived`, each with distinct behavior.       |
| **Cross-engagement comparison** | Managers compare results across semesters and universities.                                          |
| **Data export**                 | Export leaderboard and analytics as CSV or JSON for awards ceremonies, grant reporting, or archival. |

## How Engagements Relate to Other Concepts

| Concept               | Relationship                                                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Cases**             | A case belongs to at most one engagement. Cases without an engagement are visible in "All Engagements" mode.                             |
| **Threat campaigns**  | Campaigns group cases by adversary behavior _across_ engagements. A case can belong to one engagement and multiple campaigns.            |
| **Ingestion batches** | Batches track data provenance (how cases arrived). Engagements track work context (what analysts should focus on). They are independent. |
| **Roles**             | Your platform role (`analyst`, `manager`, `admin`) determines what engagement actions you can take.                                      |

## Guide Contents

- [For Analysts: Working in an Engagement](working-in-engagement.md) —
  selecting your engagement, reviewing cases, checking your progress and rank.
- [For Managers: Running an Engagement](managing-engagements.md) — creating
  engagements, assigning cases, monitoring progress, exporting results.
- [Leaderboard & Analytics](leaderboard.md) — how scoring works, what the
  metrics mean, and how to export data.
- [Engagement Lifecycle](lifecycle.md) — the four stages, how transitions work,
  and what changes at each stage.
- [Cross-Engagement Comparison](comparison.md) — comparing results across
  semesters and universities.
