# Sample Workflows

The following examples illustrate how trusted clients interact with the FastAPI gateway at
`https://api.intelligenceforgood.org`.

## Submit Evidence (User)

```http
POST https://api.intelligenceforgood.org/intakes
Authorization: Bearer <id_token>
Content-Type: application/json

{
  "channel": "web-intake",
  "description": "I was contacted by someone claiming to be a crypto advisor...",
  "attachments": [
    {
      "type": "image",
      "uri": "gs://i4g-evidence-dev/uploads/case_1234/chat1.png"
    }
  ]
}
```

### Response (Submit Evidence)

```json
{
  "case_id": "case_1234",
  "status": "queued",
  "next_steps": "An analyst will review your case within 72 hours."
}
```

## Analyst Decision

```http
POST https://api.intelligenceforgood.org/reviews/case_1234/decision
Authorization: Bearer <analyst_token>
Content-Type: application/json

{
  "scam_type": "romance",
  "confidence": 0.92,
  "resolution": "approved",
  "notes": "Matches pattern seen in Case 1187 (shared wallet)."
}
```

## Report Download (Law Enforcement)

```http
GET https://api.intelligenceforgood.org/reports/case_1234
Authorization: Bearer <leo_token>
Accept: application/pdf
```

### Response (Report Download)

- `200 OK` with PDF payload.
- Headers include `X-I4G-Report-Hash` for signature verification.

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
