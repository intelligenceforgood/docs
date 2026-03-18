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

## Intelligence Endpoints

### Search Entities

```bash
curl -H "X-API-KEY: dev-analyst-token" \
  "http://localhost:8000/intelligence/entities?entity_type=crypto_wallet&limit=10&order_by=loss_sum&descending=true"
```

### Entity Detail

```bash
curl -H "X-API-KEY: dev-analyst-token" \
  "http://localhost:8000/intelligence/entities/crypto_wallet/0xABCDEF1234567890"
```

### Entity Sparkline

```bash
curl -H "X-API-KEY: dev-analyst-token" \
  "http://localhost:8000/intelligence/entities/crypto_wallet/0xABCDEF1234567890/activity"
```

### List Indicators (with Category Filter)

```bash
curl -H "X-API-KEY: dev-analyst-token" \
  "http://localhost:8000/intelligence/indicators?category=bank&limit=20"
```

### Dashboard Widgets

```bash
curl -H "X-API-KEY: dev-analyst-token" \
  "http://localhost:8000/intelligence/dashboard"
```

### Export Indicators as STIX 2.1

```bash
curl -H "X-API-KEY: dev-analyst-token" \
  "http://localhost:8000/exports/indicators?fmt=stix" -o indicators_stix.json
```

---

## Error Handling

Errors conform to the following envelope:

```json
{
  "error": {
    "code": "contact_access_denied",
    "message": "Victim contact decryption requires analyst role",
    "correlation_id": "7f5f8b0c-4af9-4d0a-9aef-52cefc3dfa1f"
  }
}
```

Include the correlation ID when escalating issues to the engineering team.

---

## Impact Dashboard Endpoints

### Fetch KPI cards

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/impact/dashboard?period=30d"
```

The response includes KPI cards with trend direction and change text:

```json
{
  "kpis": [
    {
      "label": "Total Cases",
      "value": "142",
      "trend": "up",
      "change": "+18 (+14.5%)"
    },
    {
      "label": "Total Loss",
      "value": "$1,250,000",
      "trend": "up",
      "change": "+$200,000 (+19.0%)"
    }
  ],
  "periodLabel": "30d"
}
```

### Loss by taxonomy

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/impact/loss-by-taxonomy"
```

### Pipeline funnel

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/impact/pipeline-funnel"
```

---

## Campaign Intelligence Endpoints

### List threat campaigns

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/intelligence/campaigns?limit=10&offset=0"
```

### Campaign detail

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/intelligence/campaigns/camp-001"
```

### Manage a campaign (rename)

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action": "rename", "params": {"name": "Updated Campaign Name"}}' \
  "https://core.example.com/intelligence/campaigns/camp-001/manage"
```

### LEA referral suggestions

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/intelligence/lea-suggestions?limit=5"
```

---

## Report Generation Endpoints

### Generate a report

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"template": "executive_summary", "scope": {"date_range": "2025-05-01/2025-06-01"}, "options": {"tlp": "TLP:AMBER"}}' \
  "https://core.example.com/reports/generate"
```

Response:

```json
{ "reportId": "a1b2c3d4-...", "status": "queued", "tlp": "TLP:AMBER" }
```

### List generated reports

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/reports/library?limit=20"
```

### Download a report

```bash
curl -H "Authorization: Bearer $TOKEN" -O \
  "https://core.example.com/reports/a1b2c3d4-.../download"
```

---

## Graph Endpoints (Sprint 4)

### Get entity graph

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/intelligence/graph?seed=wallet:0xABC&hops=2"
```

### Export graph as PNG

```bash
curl -H "Authorization: Bearer $TOKEN" -o graph.png \
  "https://core.example.com/intelligence/graph/export?seed=wallet:0xABC&hops=2&format=png"
```

---

## Taxonomy Endpoints (Sprint 4)

### Sankey flow data

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/impact/taxonomy/sankey?period=90d"
```

### Heatmap grid

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/impact/taxonomy/heatmap?period=90d&granularity=week"
```

### Trend time-series

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/impact/taxonomy/trend?period=year&category=Crypto%20Fraud"
```

---

## Geography Endpoints (Sprint 4)

### Country summary

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/impact/geography?period=90d"
```

### Country detail

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/impact/geography/US?period=90d&limit=50"
```

---

## Timeline Endpoint (Sprint 4)

### Activity timeline

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://core.example.com/intelligence/timeline?period=90d&granularity=week"
```
