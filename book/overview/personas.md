# Personas & Journeys

Personas guide how i4g prioritizes features and documentation. They originate from the PRD and ongoing user interviews.

## User (Primary End User)

- Often seniors or vulnerable users, but open to anyone needing help.
- Needs reassurance, clarity, and a safe way to submit evidence.
- Shares data voluntarily; expects PII protection and empathetic communication.

### Journey Highlights — User

1. Lands on the user intake experience via public education campaigns.
2. Uploads chat logs, screenshots, receipts, or voice notes.
3. Receives confirmation, optional chatbot guidance, and a case ID for follow-up.
4. Gets notified when an analyst has reviewed the submission and a report is ready.

## Volunteer Analyst (Secondary User)

- Graduate student, retired investigator, or trained volunteer dedicating ~10 hours/week.
- Works exclusively in the Streamlit dashboard; never sees raw PII.
- Needs structured workflows, audit trails, and recognition for service hours.

### Journey Highlights — Analyst

1. Authenticates via Google Identity Platform (future IAM improvements flagged).
2. Reviews assigned cases with masked PII and evidence summaries.
3. Annotates findings, classifies scam type, and escalates when thresholds are met.
4. Monitors queue health, SLA compliance, and personal impact metrics.

## Law Enforcement Officer (Tertiary User)

- Financial crimes investigator, often juggling heavy case loads.
- Requires standardized, admissible documentation with clear provenance.
- Engages once reports are ready or subpoenas require deeper data access.

### Journey Highlights — Law Enforcement

1. Receives a digitally signed PDF report from the user or analyst liaison.
2. Validates authenticity (hash/signature) before onboarding the case internally.
3. Requests supplementary evidence via secure channels if needed.
4. Provides feedback loop that informs future evidence templates.

## Supporting Stakeholders

- **Program Administrators:** Manage volunteer rosters, access policies, and donor reporting.
- **Product & Research Contributors:** Iterate on detection pipelines, evaluate new scams, and update documentation.
- **Partner Organizations:** Universities, nonprofits, or government agencies that participate in pilots.

> Reference: [`planning/prd_production.md#user-personas`](../../planning/prd_production.md#user-personas) for the full persona matrix and acceptance criteria.
