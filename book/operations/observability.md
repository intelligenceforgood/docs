# Monitoring & Logging

Observability ensures we can detect failures quickly, understand user impact, and satisfy audit requirements.

## Logging Standards

- All application logs emit structured JSON with fields: `timestamp`, `severity`, `correlation_id`, `user_role`, `case_id`, and event-specific metadata.
- Streamlit and FastAPI services share a logging middleware that propagates correlation IDs.
- Logs are exported to BigQuery (planned) for longer retention and advanced analysis.

### Sample Log Entry

```json
{
  "timestamp": "2025-11-16T18:22:04Z",
  "severity": "INFO",
  "correlation_id": "7f5f8b0c-4af9-4d0a-9aef-52cefc3dfa1f",
  "service": "fastapi-gateway",
  "user_role": "analyst",
  "action": "case_approved",
  "case_id": "case_1234",
  "metadata": {
    "scam_type": "romance",
    "confidence": 0.92
  }
}
```

## Metrics & Dashboards

- **Latency:** p50/p95 per endpoint with alerts when p95 > 2s for 5 minutes.
- **Error Rate:** Alert when 5xx responses exceed 5% of traffic for 5 minutes.
- **Ingestion Health:** Number of cases ingested, OCR failures, Azure job success/failure.
- **Security Events:** Access to the PII vault, failed logins, unusual OAuth flows.

Dashboards live in Cloud Monitoring (shareable across dev and prod). Export snapshots to the planning repo for change control when making major updates.

## Alerting

- PagerDuty or email notifications route to on-call volunteers (rotating schedule documented in `planning/migration_runbook.md`).
- Critical alerts (PII vault access anomalies, repeated failed logins) trigger manual review by administrators within 1 hour.

## Incident Response

1. Acknowledge the alert and note it in the incident channel.
2. Triage using `gcloud logging read` and service metrics.
3. If PII exposure is suspected, escalate immediately to program leadership and suspend relevant services.
4. Document root cause, remediation steps, and follow-up actions in the planning change log.

## Tooling Roadmap

- Integrate OpenTelemetry exporters for richer traces once workloads stabilize.
- Add synthetic monitoring to test the user intake flow and analyst dashboard availability.
- Automate weekly ops review using summarized log metrics delivered to administrators.
