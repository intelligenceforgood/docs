# Engagement Lifecycle

Every engagement moves through four stages — from initial setup to long-term
archival. This page explains what happens at each stage, who can trigger
transitions, and what changes for analysts and managers.

## The Four Stages

```text
draft  ──▶  active  ──▶  completed  ──▶  archived
```

### Draft — Setting the stage

The engagement exists but isn't visible to analysts yet. This is your setup
window.

| Aspect                  | Behavior                                                          |
| ----------------------- | ----------------------------------------------------------------- |
| **Visible in selector** | No — only managers see it on the management page.                 |
| **Case assignment**     | Yes — add and remove cases freely.                                |
| **Analyst activity**    | No — analysts can't see or work on draft engagement cases.        |
| **Analytics**           | Not accumulating — nothing to measure yet.                        |
| **Use case**            | Name the engagement, assign cases, configure dates before launch. |

### Active — Game on

The engagement is live. Analysts can see and work on its cases.

| Aspect                  | Behavior                                                                   |
| ----------------------- | -------------------------------------------------------------------------- |
| **Visible in selector** | Yes — appears in the "Active" section of the dropdown.                     |
| **Case assignment**     | Yes — you can still add or remove cases while it's running.                |
| **Analyst activity**    | Yes — reviews, case actions, and all interactions are tracked.             |
| **Analytics**           | Accumulating — leaderboard, summary metrics, and KPIs update in real time. |
| **Use case**            | The competition or exercise is in progress.                                |

### Completed — Results are in

The engagement has ended. Everything is preserved in read-only mode.

| Aspect                  | Behavior                                                                   |
| ----------------------- | -------------------------------------------------------------------------- |
| **Visible in selector** | Yes — appears in the "Past" section with a read-only badge.                |
| **Case assignment**     | Locked — no changes to the case set.                                       |
| **Analyst activity**    | Disabled — a banner reads: "This engagement has ended. Data is read-only." |
| **Analytics**           | Frozen — leaderboard and metrics reflect the final state.                  |
| **Use case**            | Review results, export data, present awards, run post-engagement debriefs. |

### Archived — Into the vault

The engagement is hidden from non-admin views. Data is retained for the long
term.

| Aspect                  | Behavior                                                    |
| ----------------------- | ----------------------------------------------------------- |
| **Visible in selector** | No — hidden from all non-admin users.                       |
| **Case assignment**     | No.                                                         |
| **Analyst activity**    | No.                                                         |
| **Analytics**           | Retained — admins can still query historical data.          |
| **Use case**            | Long-term storage after results are exported and presented. |

## How Transitions Work

| From        | To          | Who        | How                                                      |
| ----------- | ----------- | ---------- | -------------------------------------------------------- |
| `draft`     | `active`    | Manager    | Click **Activate** (▶ play icon) on the management page. |
| `active`    | `completed` | Manager    | Click **Complete** (✓ checkmark icon).                   |
| `completed` | `archived`  | Admin only | Click **Archive** (📦 archive icon).                     |
| Any state   | `draft`     | Admin only | Admin override for corrections — reverts to draft.       |

### Three important rules

1. **No auto-completion.** The platform never automatically ends an engagement
   when the `ends_at` date passes. Competitions sometimes run late, and a
   surprise cutoff would disrupt active work. You decide when it's done.

2. **Archival is admin-only.** Since archived engagements disappear from
   non-admin views, this is a deliberate safeguard — managers can complete
   engagements, but only admins can hide them.

3. **Revert to draft.** If a transition was premature (e.g. accidentally
   completed), an admin can revert the engagement to `draft`. This re-enables
   everything.

## What Changes at Each Transition

### Draft → Active

- The engagement appears in the selector for all users with the `analyst`
  role or higher.
- If it's a user's only active engagement, it's auto-selected.
- The dashboard summary card starts displaying.
- The leaderboard begins tracking analyst activity.

### Active → Completed

- Analysts see the read-only banner on all pages for this engagement.
- Review submission buttons are disabled.
- The engagement moves to the "Past" section in the selector.
- Leaderboard and analytics are frozen at their final values.
- Export buttons on the leaderboard page remain active for managers.

### Completed → Archived

- The engagement disappears from the selector for non-admin users.
- It's also removed from the management table for non-admin users.
- Data survives in the database and flows to BigQuery for archival queries.

### Any → Draft (admin revert)

- The engagement returns to setup mode.
- Analysts can no longer see it until it's re-activated.
- Useful for fixing mistakes — wrong case set, premature completion, etc.
