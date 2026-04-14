# Access & Roles

This page explains who can access I4G, what each role allows, and how
to request changes. For background on the data these roles protect, see
[Cases & Evidence](../key-concepts/cases-and-evidence.md).

## Signing in

When you visit the I4G Console, you sign in with your organization's
Google account. Only users who belong to an authorized group can access
the platform. If you see a "You don't have access" error, ask a platform
admin to add your account.

## Roles

Every user is assigned a role that determines which features are
available. Roles follow a hierarchy — higher roles inherit all
capabilities of lower roles.

| Role           | What you can do                                        |
| -------------- | ------------------------------------------------------ |
| **Researcher** | View aggregate dashboards and anonymized exports only. |
| **User**       | View public case summaries (default on first sign-in). |
| **Analyst**    | Search, review, and annotate cases. Generate dossiers  |
|                | and reports. Access intelligence tools.                |
| **LEO**        | Everything an Analyst can do, plus law-enforcement     |
|                | report formats and referral workflows.                 |
| **Admin**      | Everything above, plus user management, campaign       |
|                | administration, and bulk operations.                   |

{% hint style="info" %}
Researcher-role users see aggregate statistics only — they cannot access
individual case, entity, or indicator details.
{% endhint %}

## Requesting a role change

1. **Sign in at least once** so your account appears in the system.
2. **Ask a platform admin** to update your role from the
   **User Management** page in the Console.
3. All role changes are audited with the admin's identity and a
   timestamp.

## What admins can manage

From the **User Management** page (`Admin → Users`), admins can:

- View each user's email, role, status, and last-updated timestamp.
- Promote or demote a user's role.
- Deactivate a user's account to revoke access.
- Reactivate a previously deactivated account.

Admins cannot demote or deactivate their own account — a second admin
must make the change.

## Data visibility by role

| Data                    | Researcher      | User | Analyst | LEO | Admin |
| ----------------------- | --------------- | ---- | ------- | --- | ----- |
| Aggregate dashboards    | ✅              | ✅   | ✅      | ✅  | ✅    |
| Case summaries          | Redacted export | ✅   | ✅      | ✅  | ✅    |
| Case detail & evidence  | ❌              | ❌   | ✅      | ✅  | ✅    |
| Entity & indicator data | ❌              | ❌   | ✅      | ✅  | ✅    |
| LEO report formats      | ❌              | ❌   | ❌      | ✅  | ✅    |
| User management         | ❌              | ❌   | ❌      | ❌  | ✅    |

## References

1. [Access Control — Technical Design](https://github.com/intelligenceforgood/core/blob/main/docs/design/iam.md)
   — full IAM architecture and service account details.
