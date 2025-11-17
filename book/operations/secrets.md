# Secrets & Credentials

Safeguarding credentials is critical for a platform that handles sensitive user data. i4g relies on Google Secret Manager and Workload Identity Federation to minimize manual secret handling.

## Secret Manager Inventory

| Secret | Environment | Notes |
| --- | --- | --- |
| `azure-sql-connection-string` | dev/prod | SQL authentication string for legacy exports. Rotate quarterly or when credentials change upstream. |
| `azure-storage-connection-string` | dev/prod | Grants access to Azure Blob exports until migration completes. |
| `azure-search-admin-key` | dev/prod | Required to enumerate and download search documents. |
| `vertex-search-admin` (planned) | prod | Future key for custom Vertex AI Search operations, pending need assessment. |

## Rotation Workflow

1. Retrieve fresh credentials from Azure administrators.
2. Run `python proto/scripts/infra/add_azure_secrets.py --project <project_id>` to populate Secret Manager.
3. Confirm Cloud Run revision picks up new secret versions (Cloud Run caches values until next execution or deploy).
4. Document the rotation in `planning/change_log.md` with date, operator, and reason.

## Access Control

- Service accounts have the minimal `roles/secretmanager.secretAccessor` permissions they need.
- Human operators use Google Cloud IAM with Workload Identity Federation, eliminating long-lived JSON keys.
- Production secrets are scoped to the prod project once activation occurs; avoid cross-project access where possible.

## Future Improvements

- Evaluate Secrets Manager notifications for upcoming rotations.
- Integrate secret rotation checks into CI (e.g., warn when age > 90 days).
- Consider HashiCorp Vault or Cloud KMS envelopes if multi-cloud requirements emerge.
