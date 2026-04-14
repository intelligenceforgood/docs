# Sample Workflows

These examples show common integration patterns using the I4G API. Each
includes the request format and what to expect in the response. For
authentication setup, see [Authentication](authentication.md).

{% hint style="info" %}
Replace `<BASE_URL>` with the API URL provided by your I4G liaison, and
`<API_KEY>` with your integration key.
{% endhint %}

## Submit a fraud report

Send evidence to I4G programmatically. The platform ingests the report,
extracts [entities](../key-concepts/entities.md), and queues it for
analyst review.

```bash
curl -X POST <BASE_URL>/intakes \
  -H "X-API-KEY: <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Victim received WhatsApp messages requesting crypto payment",
    "lossAmount": 5000,
    "lossCurrency": "USD",
    "evidence": [
      { "type": "chat_log", "content": "..." }
    ]
  }'
```

The response includes a `caseId` you can use to check status later.

## Check case status

Poll a submitted case to see its review status:

```bash
curl <BASE_URL>/reviews/<CASE_ID> \
  -H "X-API-KEY: <API_KEY>"
```

## Search cases

Query cases by date range, taxonomy, or text:

```bash
curl "<BASE_URL>/reviews/search?q=crypto&dateFrom=2026-01-01&limit=20" \
  -H "X-API-KEY: <API_KEY>"
```

Results include case summaries with matched entities highlighted.

## Download a dossier

Retrieve a signed PDF dossier for a case:

```bash
curl <BASE_URL>/reports/dossiers/<CASE_ID>/pdf \
  -H "X-API-KEY: <API_KEY>" \
  -o dossier.pdf
```

## Query indicators

Fetch threat indicators for external analysis or integration with your
own systems:

```bash
curl "<BASE_URL>/intelligence/indicators?category=crypto_wallet&limit=50" \
  -H "X-API-KEY: <API_KEY>"
```

Export as CSV or XLSX by appending `.csv` or `.xlsx` to the path.

## Export STIX bundle

Download a STIX 2.1 bundle for sharing with threat intelligence
partners:

```bash
curl <BASE_URL>/intelligence/indicators/stix \
  -H "X-API-KEY: <API_KEY>" \
  -o indicators.json
```

## Error handling

All error responses follow a consistent format:

```json
{
  "detail": "Human-readable error message",
  "status": 400
}
```

Include the `X-Request-ID` response header when reporting issues to your
liaison — it helps trace the request through the system.

## References

1. [Interactive API Docs](authentication.md) — use Swagger UI at `/docs`
   for the complete endpoint catalog with schemas.
