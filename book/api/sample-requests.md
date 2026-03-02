# Sample Workflows

The following examples illustrate how trusted clients interact with the Core API. All authenticated
endpoints require the `X-API-KEY` header (see [Authentication](authentication.md)).

## Submit Evidence (Intake)

Evidence is submitted as multipart form data with a JSON payload and optional file attachments.

```http
POST /intakes
X-API-KEY: <api_key>
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data; name="payload"
Content-Type: application/json

{
  "reporter_name": "Jane Doe",
  "summary": "Crypto investment scam via WhatsApp",
  "details": "I was contacted by someone claiming to be a crypto advisor...",
  "contact_email": "jane@example.com",
  "source": "web-intake"
}
--boundary
Content-Disposition: form-data; name="files"; filename="chat1.png"
Content-Type: image/png

<binary data>
--boundary--
```

### Response

```json
{
  "intake_id": "int_abc123",
  "job_id": "job_xyz789",
  "status": "queued",
  "attachments": ["chat1.png"]
}
```

## Search Cases (Analyst)

Hybrid search combines semantic text matching with structured filters.

```http
POST /reviews/search/query
X-API-KEY: <api_key>
Content-Type: application/json

{
  "query": "crypto romance wallet transfer",
  "sources": ["ftc_consumer_sentinel"],
  "datasets": ["synthetic_coverage"],
  "time_preset": "90d",
  "limit": 25
}
```

### Response

```json
{
  "results": [
    {
      "case_id": "case_1234",
      "score": 0.87,
      "classification": "romance",
      "summary": "Victim was contacted via Instagram..."
    }
  ],
  "total": 42
}
```

## Analyst Decision

After reviewing a case, the analyst records a decision.

```http
POST /reviews/{review_id}/decision
X-API-KEY: <api_key>
Content-Type: application/json

{
  "decision": "accepted",
  "notes": "Matches pattern seen in Case 1187 (shared wallet).",
  "auto_generate_report": true
}
```

Decision values: `accepted`, `rejected`, `needs_more_info`.

## Dossier Download (Law Enforcement)

Dossier artifacts are downloaded by plan ID and artifact name.

```http
GET /reports/dossiers/{plan_id}/download/{artifact_name}
X-API-KEY: <api_key>
Accept: application/pdf
```

### Response

- `200 OK` with the artifact payload (PDF, JSON manifest, or signatures file).

## Verify Dossier Signatures

```http
POST /reports/dossiers/{plan_id}/verify
X-API-KEY: <api_key>
```

### Response

```json
{
  "all_verified": true,
  "missing_count": 0,
  "mismatch_count": 0,
  "artifacts": [
    {
      "name": "dossier_report.pdf",
      "expected_hash": "sha256:abc123...",
      "actual_hash": "sha256:abc123...",
      "match": true
    }
  ]
}
```

## Error Handling

Errors conform to the following envelope:

```json
{
  "error": {
    "code": "pii_access_denied",
    "message": "PII rehydration requires admin approval",
    "correlation_id": "7f5f8b0c-4af9-4d0a-9aef-52cefc3dfa1f"
  }
}
```

Include the correlation ID when escalating issues to the engineering team.
