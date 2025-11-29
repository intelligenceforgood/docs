# Weekly Azure Refresh

The `weekly-azure-refresh` Cloud Run job bridges legacy Azure data sources while partners finalize their migration to GCP. It imports structured records from Azure SQL and search indexes from Azure Cognitive Search into Firestore and Vertex AI Search.

## Schedule & Trigger

- **Frequency:** Every Monday at 11:00 UTC (configured via Cloud Scheduler in `infra/environments/dev/terraform.tfvars`).
- **Location:** `us-central1` Cloud Run job running image `weekly-refresh-job:dev`.
- **Runtime Service Account:** `sa-ingest@i4g-dev.iam.gserviceaccount.com` with `roles/discoveryengine.editor` (grant pending in production apply).

## Networking

- Uses the `serverless-egress` VPC connector and `serverless-egress-nat` to reach Azure resources with static IP `136.119.111.184`.
- Azure SQL firewall must allow the static IP. See the planning change log for the latest approval status.
- NAT is currently configured with `ENDPOINT_TYPE_SERVERLESS`; verify whether VM workloads still depend on the NAT before applying to production.

## Secrets & Configuration

The job consumes three secrets from Secret Manager:

| Environment Variable | Secret Name | Purpose |
| --- | --- | --- |
| `AZURE_SQL_CONNECTION_STRING` | `azure-sql-connection-string` | SQL auth string for Azure intake database |
| `AZURE_STORAGE_CONNECTION_STRING` | `azure-storage-connection-string` | Access to blob exports |
| `AZURE_SEARCH_ADMIN_KEY` | `azure-search-admin-key` | Admin key for Cognitive Search exports |

Use `proto/scripts/infra/add_azure_secrets.py` to rotate these values.

## Execution Flow

1. Download latest exports or query Azure SQL directly.
2. Transform data to Firestore schema, ensuring idempotent writes.
3. Update Vertex AI Search documents for semantic retrieval.
4. Produce a JSON summary report (`data/weekly_refresh_<date>.json`) for auditing.

## Troubleshooting

- **Firewall Denied (`42000`):** Azure SQL hasn’t allowed the static IP yet. Request firewall rule update and retry.
- **Login Timeout (`HYT00`):** Connector configured correctly but Azure unreachable—check VPC connector health and NAT logs (`resource.type="nat_gateway"`).
- **Discovery Permission Denied:** Ensure the ingestion service account has `roles/discoveryengine.editor` in the target project.

## Run Manually

```bash
gcloud run jobs execute weekly-azure-refresh \
  --region=us-central1 \
  --project=i4g-dev
```

Review execution logs via `gcloud logging read` or Cloud Console. Capture successful runs in the planning change log to maintain operational traceability.
