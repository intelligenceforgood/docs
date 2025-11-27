# Infrastructure & Deployment

Infrastructure is managed through the [`infra`](../../infra) repository using Terraform. The setup balances serverless simplicity with strict network egress controls to satisfy security requirements for handling sensitive evidence.

## Cloud Run Services

| Service | Purpose | Repository Source | Service Account |
| --- | --- | --- | --- |
| `fastapi-gateway` | API surface for ingestion, report generation, and admin tooling | `proto/src/i4g/api` | `sa-app` |
| `streamlit-analyst-ui` | Analyst review dashboard with masked PII | `proto/src/i4g/streamlit_app` | `sa-app` |
| `weekly-azure-refresh` | Imports Azure SQL/Search snapshots into Firestore & Vertex AI Search | `proto/scripts/migration/run_weekly_refresh.py` | `sa-ingest` |
| `generate-reports` | Batch report export (planned for production) | `proto/scripts/reports` | `sa-report` |

Each service references container images stored in Artifact Registry (`us-central1-docker.pkg.dev/i4g-dev/applications/*`).

## Networking

- Serverless resources egress through a dedicated VPC connector (`serverless-egress`) and Cloud NAT (`serverless-egress-nat`).
- Static external IP `136.119.111.184` is allocated for predictable firewall configuration with Azure SQL. (_Action item:_ confirm whether any VM workloads still require NAT access before finalizing `ENDPOINT_TYPE_SERVERLESS` in production.)
- Secrets are retrieved via Secret Manager, and traffic stays within private ranges wherever possible.

## Terraform Structure

- `environments/dev` and `environments/prod` define project-level resources, enabling services, and IAM bindings.
- Reusable modules under `modules/` encapsulate service accounts, Cloud Run jobs, schedulers, and storage configuration.
- Outputs surface critical data points such as static egress IPs and service URLs for documentation updates.

## Deployment Workflow

1. Update Terraform manifests in a feature branch.
2. Run `terraform fmt`, `terraform plan`, and capture outputs.
3. Seek review and merge into `main`.
4. Apply changes using Workload Identity Federation from GitHub Actions or a trusted workstation (`terraform apply`).
5. Trigger GitBook sync to document any new resources or operational changes.

## Pending Production Tasks

- Apply the dev VPC connector/NAT changes to production after validating analytics impact.
- Wire the `roles/discoveryengine.editor` binding for the ingestion service account in production (Terraform resource created, apply pending).
- Register nonprofit-friendly domains (e.g., `intelligenceforgood.app`, `i4g.app`) and configure Cloud Run custom domains with HTTPS.

For the authoritative source, explore `infra/environments/dev/main.tf` and `infra/modules/run/*`.
