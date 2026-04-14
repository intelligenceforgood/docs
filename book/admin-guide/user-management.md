# User Management

The user management page lets admins view all accounts, assign roles, and
activate or deactivate users.

## Opening User Management

Click **Users** in the admin section of the left sidebar (or navigate to
`/admin/users`). The page shows:

- A summary bar with total accounts, active count, and inactive count.
- A searchable table of all user accounts.

## Understanding the Accounts Table

Each row in the table displays:

| Column           | What it shows                                           |
| ---------------- | ------------------------------------------------------- |
| **Email**        | The user's Google account email.                        |
| **Display Name** | Name shown in the Console and on leaderboards.          |
| **Role**         | Current role: `user`, `analyst`, `manager`, or `admin`. |
| **Status**       | Active (green) or Inactive (gray).                      |

## Changing a User's Role

1. Find the user in the table (use the search bar for large user lists).
2. Click the **Role** dropdown on their row.
3. Select the new role.
4. Confirm the change.

The role takes effect immediately — the user's Console access updates on
their next page load.

### Role descriptions

| Role        | Access level                                                    |
| ----------- | --------------------------------------------------------------- |
| **user**    | Submit reports, view own submissions. No Console access.        |
| **analyst** | Full Console access — review cases, search, intelligence tools. |
| **manager** | Analyst access + create and manage engagements.                 |
| **admin**   | Full access — user management, archival, all settings.          |

> **LEO role:** Law enforcement partners are assigned the `leo` role,
> which grants access to report delivery features. This role is typically
> assigned by the platform team, not through the Console.

## Deactivating a User

To disable a user's access without deleting their account:

1. Find the user in the table.
2. Toggle their **Status** to inactive.
3. The user can no longer sign in. Their past reviews and actions are
   preserved in the audit trail.

To reactivate, toggle the status back to active.

## When to assign each role

| Scenario                            | Recommended role |
| ----------------------------------- | ---------------- |
| Victim or reporter submitting cases | `user`           |
| University student in an engagement | `analyst`        |
| Professor running an engagement     | `manager`        |
| Platform administrator              | `admin`          |
| External law enforcement partner    | `leo`            |

## Learn more

- [Access & Roles](../security/access-and-roles.md) — detailed permission
  model
