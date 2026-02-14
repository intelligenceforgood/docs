# Access Control

This page explains how access to the i4g platform is managed — who can get in, what they can do, and how to request changes.

## Signing in

The platform uses **Google Identity-Aware Proxy (IAP)** for authentication. When you visit [app.intelligenceforgood.org](https://app.intelligenceforgood.org), you are redirected to Google Sign-In. Only users who belong to an authorized Google Group can sign in.

- **Analyst access:** You must be a member of `gcp-i4g-analyst@intelligenceforgood.org`.
- **Admin access:** You must be a member of `gcp-i4g-admin@intelligenceforgood.org`.

If you see a "You don't have access" error after signing in, ask an admin to add you to the appropriate group.

## Roles

Every user is assigned one of four application roles. Your role determines which features you can use.

| Role                              | What you can do                                                                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| **User**                          | View public case summaries. This is the default role assigned on your first sign-in.            |
| **Analyst**                       | Search, review, and annotate cases. Generate dossiers and reports. Access the Discovery module. |
| **LEO** (Law Enforcement Officer) | Everything an analyst can do, plus LEO-specific report formats and workflows.                   |
| **Admin**                         | Everything above, plus user management, campaigns, and bulk operations.                         |

Roles follow a hierarchy: `user → analyst → leo → admin`. Higher roles inherit all capabilities of lower roles.

## Requesting a role change

1. Sign in at least once so your account appears in the system.
2. Ask a platform admin to promote your role from the **User Management** page in the console (`/admin/users`).
3. Admins can change roles, deactivate accounts, and reactivate previously deactivated accounts.

All role changes are audited with the admin's identity and a timestamp.

## What admins see

Admins have access to the **User Management** page, which lists all platform accounts. From this page, admins can:

- View each user's email, role, status, and last-updated timestamp.
- Promote or demote a user's role (admins cannot demote themselves).
- Deactivate a user's account to revoke access (admins cannot deactivate themselves).
- Reactivate a previously deactivated account.

## Service accounts

Background jobs (ingestion, report generation, account syncing) run under dedicated Google Cloud service accounts with least-privilege permissions. These service accounts are managed by Terraform and do not appear in the user management interface.

When the analyst console makes server-side API calls on your behalf, the API correctly resolves your identity — you always appear as yourself, not as the console's service account.

## Further reading

- [Authentication](../api/authentication.md) — technical details on how API authentication works.
- [Secrets & Credentials Reference](secrets-reference.md) — how secrets are stored and rotated.
- The full IAM design document lives in `core/docs/design/iam.md`.
