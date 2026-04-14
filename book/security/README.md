# Security & Trust

I4G handles sensitive fraud evidence and personal information. This
section explains how the platform protects your data, controls access,
and lets you verify the integrity of reports.

## How we protect your data

- **Tokenization and masking.** Personal details are converted to
  tokens on upload. Analysts see masked text — decryption requires
  approvals and every access is audited.
- **Encryption.** Data is encrypted in transit (TLS) and at rest.
  Sensitive secrets live in a protected vault that only authorized
  services can access.
- **Least privilege.** Access is limited to the minimum role needed.
  Volunteer analysts cannot view raw PII. See
  [Access & Roles](access-and-roles.md) for the full role breakdown.
- **Signed reports.** Dossiers include cryptographic hashes and digital
  signatures so recipients can verify authenticity. See
  [Report Authenticity](report-authenticity.md) for verification steps.

## Data retention (at a glance)

| Data type      | Retention                                              |
| -------------- | ------------------------------------------------------ |
| Active cases   | Kept while under review, then ~30 days after closure   |
| Resolved cases | Removed ~90 days after resolution (unless law extends) |
| Audit logs     | ~1 year for security investigations                    |
| Legal holds    | Held until cleared by the requesting authority         |

## Compliance posture

- Supports user rights to access, export, and delete their data
  (where applicable by law).
- Follows a documented incident response plan with rapid notification
  timelines.
- Aligns volunteer training with partner requirements (e.g., university
  or agency policies).

## In this section

| Page                                          | What you'll learn               |
| --------------------------------------------- | ------------------------------- |
| [Access & Roles](access-and-roles.md)         | Who can do what on the platform |
| [Report Authenticity](report-authenticity.md) | How to verify a signed report   |

{% hint style="info" %}
Technical security documentation (IAM design, service accounts, secret
management) is maintained in the engineering repos and available on
request for partner reviews.
{% endhint %}
