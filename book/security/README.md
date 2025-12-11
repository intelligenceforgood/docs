# Security & Compliance

Protecting sensitive user information is a foundational requirement. This section summarizes the controls derived from the production PRD and ongoing compliance planning.

## PII Handling

- Immediate tokenization of detected PII with AES-256-GCM encryption and Cloud KMS key management.
- Segregation of duties: analysts view only masked data; administrators rehydrate tokens under dual control.
- Evidence stored in private Cloud Storage buckets with Object Lifecycle policies and access logging.

## Access Controls

- Principle of least privilege enforced through Terraform-managed IAM roles.
- Google Identity Platform for user authentication; Workload Identity Federation for CI/CD and automation.
- Cloud Run services deploy with minimal scopes and container options (no shell access, read-only filesystem where possible).

## Compliance Roadmap

| Requirement | Status | Notes |
| --- | --- | --- |
| FERPA considerations for university partnerships | Drafted | Align training with university policies before beta launch. |
| GDPR/Data Subject Requests | Planned | Document deletion workflow; rely on tokenized PII vault to locate records quickly. |
| Incident Response Plan | In place | Maintained in `planning/migration_runbook.md` with escalation contacts. |
| Audit Logging | Active | Structured logs with correlation IDs and retention policies. |

## Data Retention

- User submissions retained for 7 years unless removal is requested.
- Logs retained for 400 days (Cloud Logging default) with optional export to BigQuery for longer analytics retention.
- Reports shared with law enforcement are tracked to ensure follow-up and eventual expiration.

## Upcoming Work

- Evaluate hardware-backed encryption for the PII vault.
- Integrate secrets rotation alerts into operations runbooks.
- Add periodic penetration testing / vulnerability scanning (seek nonprofit grants or partnerships).

Refer to [`planning/prd_production.md`](../../planning/prd_production.md) and `planning/migration_runbook.md` for detailed security requirements and procedures.
