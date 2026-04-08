# Engagement Lifecycle

Every engagement moves through four stages. This page explains each stage,
what changes for analysts and managers, and how transitions work.

## The Four Stages

```
draft  →  active  →  completed  →  archived
```

### Draft

The engagement exists but is not visible to analysts.

| Aspect                  | Behavior                                                                       |
| ----------------------- | ------------------------------------------------------------------------------ |
| **Visible in selector** | No — only managers see it on the management page.                              |
| **Case assignment**     | Yes — managers can assign and remove cases.                                    |
| **Analyst activity**    | No — analysts cannot see or work on draft engagement cases.                    |
| **Analytics**           | Not accumulating — no activity to measure.                                     |
| **Use case**            | Setup phase: name the engagement, assign cases, configure dates before launch. |

### Active

The engagement is live. Analysts can see and work on its cases.

| Aspect                  | Behavior                                                                       |
| ----------------------- | ------------------------------------------------------------------------------ |
| **Visible in selector** | Yes — appears in the "Active" section of the dropdown.                         |
| **Case assignment**     | Yes — managers can still add or remove cases during the engagement.            |
| **Analyst activity**    | Yes — review submissions, case actions, and all interactions are tracked.      |
| **Analytics**           | Accumulating — leaderboard, summary metrics, and KPIs update as analysts work. |
| **Use case**            | The competition or exercise is running.                                        |

### Completed

The engagement has ended. Data is preserved in read-only mode.

| Aspect                  | Behavior                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| **Visible in selector** | Yes — appears in the "Past" section with a read-only badge.                                           |
| **Case assignment**     | No — case assignment is locked.                                                                       |
| **Analyst activity**    | No — review submissions are disabled. A banner reads: "This engagement has ended. Data is read-only." |
| **Analytics**           | Frozen — leaderboard and metrics reflect the final state.                                             |
| **Use case**            | Post-competition: review results, export data, present awards.                                        |

### Archived

The engagement is hidden from non-admin views. Data is retained.

| Aspect                  | Behavior                                                          |
| ----------------------- | ----------------------------------------------------------------- |
| **Visible in selector** | No — hidden from all non-admin users.                             |
| **Case assignment**     | No.                                                               |
| **Analyst activity**    | No.                                                               |
| **Analytics**           | Retained — admins can still query historical data.                |
| **Use case**            | Long-term storage after results have been exported and presented. |

## Transitions

| From        | To          | Who Can Do It | How                                                               |
| ----------- | ----------- | ------------- | ----------------------------------------------------------------- |
| `draft`     | `active`    | Manager       | Click **Activate** (play icon) on the management page.            |
| `active`    | `completed` | Manager       | Click **Complete** (checkmark icon) on the management page.       |
| `completed` | `archived`  | Admin         | Click **Archive** (archive icon) — admin-only action.             |
| Any state   | `draft`     | Admin         | Admin override for corrections — reverts to draft for re-editing. |

### Key Rules

- **No auto-completion.** The system does not automatically transition
  `active → completed` when the `ends_at` date passes. This is deliberate:
  competitions sometimes run over schedule, and automatic cutoff would
  disrupt active work. Managers must manually complete engagements.

- **Archival is admin-only.** Archived engagements disappear from non-admin
  views. This is a deliberate safeguard — managers can complete engagements,
  but only admins can hide them from the platform.

- **Revert to draft.** If a transition was premature (e.g., accidentally
  completed), an admin can revert the engagement to `draft`. This re-enables
  all features.

## What Changes at Each Transition

### Draft → Active

- Engagement appears in the selector for all platform users with the
  `analyst` role or higher.
- If it is the user's only active engagement, it is auto-selected.
- Dashboard summary card begins displaying for the engagement.
- Leaderboard starts tracking analyst activity.

### Active → Completed

- Analysts see the read-only banner on all pages when this engagement is
  selected.
- Review submission buttons are disabled.
- The engagement moves to the "Past" section in the selector dropdown.
- Leaderboard and analytics data are frozen at their final values.
- Export buttons on the leaderboard page remain active for managers.

### Completed → Archived

- Engagement is removed from the selector dropdown for non-admin users.
- Engagement is removed from the management table for non-admin users.
- Data remains in the database and is accessible to admins and via
  BigQuery exports.

### Any → Draft (Admin Revert)

- Engagement returns to the setup state.
- Analysts can no longer see it until it is re-activated.
- Useful for correcting mistakes (e.g., wrong case set, premature
  completion).
