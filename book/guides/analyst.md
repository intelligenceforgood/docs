# Analyst Guide

Volunteer analysts operate the heart of i4g. This guide covers how to access the dashboard, triage cases, and maintain audit-ready notes.

![Analyst dashboard placeholder](../assets/screenshots/analyst-dashboard.png)

## Access Requirements

- Provisioned Google account (university, nonprofit, or personal) added to the `analyst` IAM group.
- Google Identity Platform is the current authentication provider. We may adopt hardware keys or organization-managed SSO in future phases for greater convenience.
- Optional: enroll in the volunteer Slack/Discord channel for real-time coordination.

## Daily Workflow

1. Navigate to the Analyst Dashboard at <https://streamlit-analyst-ui-y5jge5w2cq-uc.a.run.app/>.
2. Sign in with your authorized Google account.
3. Review the **Queue Summary** panel to see:
   - Open cases assigned to you.
   - SLA breaches (e.g., cases waiting >72 hours).
   - Alerts for mass campaign spikes (batched ingestion from Azure exports).
4. Open the top-priority case and review the auto-generated synopsis (scam type, risk score, key entities).
5. Inspect evidence. PII will appear as masked tokens (`███████`). If the context is unclear, request rehydration from an administrator via secure channel.
6. Add structured annotations:
   - Scam classification (romance, crypto investment, phishing, other).
   - Confidence rating.
   - Free-form notes (Markdown supported).
7. Take a final action:
   - **Approve** (true positive) → qualifies for reporting.
   - **Reject** (false positive) → archive with rationale.
   - **Needs more info** → loops back to user liaison.

## Best Practices

- Keep notes factual and concise. Avoid personally identifying language in free-form text.
- Use the predefined tags (e.g., `#wallet`, `#social-media`, `#payment-processor`) to support analytics queries.
- If a case appears to be part of a larger campaign, tag it with the campaign ID or create a new one via the “Link Cases” dialog.
- Coordinate handoffs in the volunteer chat, especially if you cannot finish a review in one session.

## Metrics & Impact Tracking

- The dashboard displays individual and team metrics (cases closed, time to resolution, dollars recovered estimates).
- Download CSV reports from the **Analytics** tab to include in academic or grant reporting.
- When in doubt about classification, err on the side of escalation—administrators can always downgrade later.

## Escalation Paths

- **Urgent safety issues** (self-harm threats, stalking): notify the program administrator immediately.
- **Potential law enforcement action**: flag with `@leo-liaison` in the secure channel; provide context and recommended next steps.
- **Tooling issues** (timeouts, UI bugs): open a ticket in the GitHub `proto` repo with reproduction steps and screenshots.

Thank you for volunteering—your work directly strengthens our ability to protect vulnerable communities.
