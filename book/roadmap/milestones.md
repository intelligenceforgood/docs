# Milestones

Milestone tracking ensures the volunteer team and partners share the same expectations. The table below summarizes the current plan (see [`proto/docs/prd_production.md`](../../proto/docs/prd_production.md) for full detail).

| Phase | Goal | Target Window | Status | Key Deliverables |
| --- | --- | --- | --- | --- |
| M1 – Secure MVP | Harden ingestion, deploy FastAPI & Streamlit to Cloud Run, enforce OAuth, implement PII vault | Weeks 1–4 | In progress | OAuth, tokenization, automated tests, structured logging |
| M2 – Beta Launch | Onboard 3 volunteer analysts processing real cases | Weeks 5–8 | Planned | Analyst training materials, queue management metrics, volunteer onboarding docs |
| M3 – Partnership Readiness | Prepare for university/AARP collaborations | Months 3–6 | Planned | Signed reports, volunteer impact dashboard, partnership playbook |
| M4 – Historical Migration | Complete Azure backfills and retire legacy workflows | Parallel | Active | Weekly refresh job, firewall coordination, Terraform outputs published |
| M5 – Compliance & Audit | Formalize incident response, FERPA/GDPR processes | Parallel | Pending | Data retention SOP, incident runbooks, audit logging improvements |

## Recent Highlights (Nov 2025)

- Provisioned static egress for Cloud Run jobs; awaiting Azure firewall finalization.
- Added Discovery Engine editor role to ingestion job (Terraform apply pending in production).
- Drafted comprehensive user guides and operational runbooks for the documentation site.

## Upcoming

1. Apply Terraform networking changes in production once NAT dependencies are confirmed.
2. Register nonprofit DNS (`intelligenceforgood.app`, `i4g.app`) and map Cloud Run custom domains.
3. Finalize volunteer onboarding course materials and align with analyst documentation.
