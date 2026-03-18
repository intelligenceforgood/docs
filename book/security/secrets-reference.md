# Secrets & Credentials Reference

> **Last updated:** 2026-02-09
> **Maintainer:** Keep this page current when adding, removing, or renaming
> secrets. Check `infra/environments/app/*/terraform.tfvars` and
> `core/src/i4g/settings/config.py` as the primary sources of truth.

This page documents every secret, API key, encryption key, and credential used
by the i4g platform across all environments.

---

## Quick Reference

| Secret                                              | Type               | Where Stored                      | Environments | Services                         |
| --------------------------------------------------- | ------------------ | --------------------------------- | ------------ | -------------------------------- |
| [crypto-pii-key](#crypto-pii-key)                   | Fernet key         | Secret Manager (App)              | dev, prod    | Core API, ingest job, intake job |
| [api-key](#api-key)                                 | API key            | Secret Manager (App)              | dev, prod    | Console, intake job              |
| [IAP OAuth clients](#iap-oauth-clients)             | OAuth credential   | Terraform tfvars / Secret Manager | dev, prod    | Load balancer backends           |
| [Dev API tokens](#dev-api-tokens)                   | Hardcoded tokens   | Source code                       | local, dev   | Core API auth                    |
| [Azure migration secrets](#azure-migration-secrets) | Connection strings | Secret Manager (App)              | dev only     | Migration scripts                |

---

## Active Secrets

### crypto-pii-key

|                         |                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**             | Fernet symmetric key for encrypting victim contact fields (reporter name, email, phone, handle) in intake records.              |
| **Type**                | Fernet key (URL-safe base64-encoded 32-byte key)                                                                                |
| **Secret Manager path** | `projects/i4g-dev/secrets/crypto-pii-key` (dev)                                                                                 |
|                         | `projects/i4g-prod/secrets/crypto-pii-key` (prod)                                                                               |
| **Env var name**        | `I4G_CRYPTO__PII_KEY`                                                                                                           |
| **Settings field**      | `CryptoSettings.pii_key` in `core/src/i4g/settings/config.py`                                                                   |
| **Injected into**       | Core API service (core-svc), ingest job, intake job                                                                             |
| **Rotation**            | Generate a new Fernet key, re-encrypt existing contact fields, then swap the secret version. Old ciphertexts become unreadable. |
| **Local dev**           | Not required — intake encryption uses a hardcoded fallback when `I4G_ENV=local`.                                                |

### api-key

|                         |                                                                                                                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**             | API authentication token for service-to-service calls. The console (Next.js) and intake worker use this token to authenticate against the Core API backend via the `X-API-KEY` header. |
| **Type**                | API key (plain string matching one of the tokens in `auth.py`)                                                                                                                         |
| **Secret Manager path** | `projects/i4g-dev/secrets/api-key` (dev)                                                                                                                                               |
|                         | `projects/i4g-prod/secrets/api-key` (prod)                                                                                                                                             |
| **Terraform resource**  | **None** — this secret is not Terraform-managed. Create it manually (see [Provisioning](#provisioning-a-new-api-key) below).                                                           |
| **Env var name**        | `I4G_API_KEY` (console), `I4G_API__KEY` (intake job)                                                                                                                                   |
| **Settings field**      | `APISettings.key` in `core/src/i4g/settings/config.py`                                                                                                                                 |
| **Injected into**       | Console service (via `console_secret_env_vars`), intake job (via `secret_env_vars`)                                                                                                    |
| **Value constraint**    | Must match one of the tokens defined in `_API_TOKENS` in `core/src/i4g/api/auth.py`. Currently: `dev-analyst-token` or `dev-admin-token`.                                              |
| **Local dev**           | Set in `ui/apps/web/.env.local` as `I4G_API_KEY=dev-analyst-token`. Also defaulted in `core/config/settings.local.toml`.                                                               |

#### Provisioning a new api-key

```bash
# Dev environment
echo -n "dev-analyst-token" | gcloud secrets create api-key \
  --project=i4g-dev --replication-policy=automatic --data-file=-

# Prod environment
echo -n "<choose-a-strong-token>" | gcloud secrets create api-key \
  --project=i4g-prod --replication-policy=automatic --data-file=-

# Verify
gcloud secrets versions access latest --secret=api-key --project=i4g-dev
```

> **Important:** If you choose a custom token value for prod, you must also
> update `_API_TOKENS` in `core/src/i4g/api/auth.py` to include that token,
> then rebuild and redeploy the core-svc image.

### IAP OAuth Clients

|                     |                                                                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**         | Google Cloud IAP uses OAuth 2.0 clients to authenticate users hitting the HTTPS load balancer. Each backend service (console, API) has its own OAuth client.                  |
| **Type**            | OAuth 2.0 client ID + client secret pair                                                                                                                                      |
| **Where stored**    | `infra/environments/app/dev/local-overrides.tfvars` (dev — **committed to repo**)                                                                                             |
|                     | Prod: manually configured, not committed                                                                                                                                      |
| **Terraform usage** | Passed to `module "global_lb"` as `iap_clients` variable (map with `client_id` + `client_secret` per service)                                                                 |
| **Console env var** | `I4G_IAP_CLIENT_ID` — the API's OAuth client_id, set on the console service so it can mint IAP identity tokens for server-to-server calls                                     |
| **How to create**   | Run `infra/bootstrap/create_iap_oauth.sh` or create manually in the [Google Cloud Console > APIs & Services > Credentials](https://console.cloud.google.com/apis/credentials) |
| **Security note**   | Dev client secrets are currently committed in plaintext. This is tracked as a known issue. Rotate if the repo is made public.                                                 |

---

## Development-Only Secrets

### Dev API Tokens

Two static tokens are hardcoded in `core/src/i4g/api/auth.py` for local
development and testing:

| Token               | Username    | Role      | Used By                                                 |
| ------------------- | ----------- | --------- | ------------------------------------------------------- |
| `dev-analyst-token` | `analyst_1` | `analyst` | UI `.env.local`, unit tests, smoke tests, CLI bootstrap |
| `dev-admin-token`   | `admin`     | `admin`   | Admin-level test scenarios                              |

These tokens are the **only** authentication mechanism in non-IAP environments.
In cloud deployments, IAP provides the outer authentication layer, and these
tokens provide inner service-to-service authorization.

> **Do not use these tokens in production with external access.** They are
> suitable for dev/staging behind IAP, but a proper token management system
> (e.g., Firestore-backed token registry or OAuth2 client credentials) should
> replace them before any public-facing deployment.

---

## Azure Migration Secrets (Legacy)

These secrets exist in Secret Manager for the one-time data migration from the
legacy Azure infrastructure. They are not injected into any Cloud Run service
or job.

| Secret                            | SM Path                                                      | Terraform            | Purpose                                              | Status                     |
| --------------------------------- | ------------------------------------------------------------ | -------------------- | ---------------------------------------------------- | -------------------------- |
| `azure-sql-connection-string`     | `projects/i4g-dev/secrets/azure-sql-connection-string`       | Dev `main.tf` only   | Legacy Azure SQL database connection for data export | Stale — migration complete |
| `azure-storage-connection-string` | `projects/i4g-{env}/secrets/azure-storage-connection-string` | Dev & prod `main.tf` | Azure Blob Storage for document migration            | Stale — migration complete |
| `azure-search-admin-key`          | `projects/i4g-{env}/secrets/azure-search-admin-key`          | Dev & prod `main.tf` | Azure Cognitive Search admin key for index export    | Stale — migration complete |

> **Cleanup:** These are tracked as D62 in the debt remediation plan (WS-8).
> Confirm the `dtp/` Azure Functions are fully decommissioned before deleting
> the Terraform resources and Secret Manager entries.

---

## Phantom Secrets (Safe to Delete)

The following secrets exist in GCP Secret Manager but have **zero references**
in any Terraform file, application code, or documentation:

| Secret                      | Created    | Assessment                                                       |
| --------------------------- | ---------- | ---------------------------------------------------------------- |
| `app-db-admin-password`     | 2025-12-30 | Database uses IAM auth; no password needed                       |
| `iap-client-secret-api`     | 2025-12-08 | Superseded by `iap_clients` variable in `local-overrides.tfvars` |
| `iap-client-secret-console` | 2025-12-08 | Same as above                                                    |
| `ingest-db-password`        | 2025-12-22 | Ingest job uses `ENABLE_IAM_AUTH=true`; no password needed       |

```bash
# Delete phantom secrets (safe — no code references them)
gcloud secrets delete app-db-admin-password --project=i4g-dev --quiet
gcloud secrets delete iap-client-secret-api --project=i4g-dev --quiet
gcloud secrets delete iap-client-secret-console --project=i4g-dev --quiet
gcloud secrets delete ingest-db-password --project=i4g-dev --quiet
```

---

## Database Authentication

All Cloud SQL databases use **IAM authentication** — no passwords are stored
or rotated.

| Database      | Cloud SQL Instance                 | Project    | DB Name  | Auth                                                  |
| ------------- | ---------------------------------- | ---------- | -------- | ----------------------------------------------------- |
| App DB (dev)  | `i4g-dev:us-central1:i4g-dev-db`   | `i4g-dev`  | `i4g_db` | IAM (`sa-app`, `sa-ingest`, `sa-intake`, `sa-report`) |
| App DB (prod) | `i4g-prod:us-central1:i4g-prod-db` | `i4g-prod` | `i4g_db` | IAM (`sa-app`)                                        |

> `StorageSettings.cloudsql_password` fields exist in the Settings model
> but default to `None` and are unused. They are legacy placeholders from
> before IAM auth was enabled.

---

## Secret Injection by Service

This matrix shows which env vars are injected into each Cloud Run service or
job, and where they come from.

### Dev Environment

| Service/Job         | `I4G_PII__PEPPER` | `I4G_CRYPTO__PII_KEY` | `I4G_API_KEY` | `I4G_API__KEY` |
| ------------------- | :---------------: | :-------------------: | :-----------: | :------------: |
| Core API (core-svc) |        SM         |          SM           |       —       |       —        |
| Console service     |         —         |           —           |      SM       |       —        |
| Ingest job          |        SM         |          SM           |       —       |       —        |
| Intake job          |         —         |           —           |       —       |       SM       |
| Report job          |        SM         |          SM           |       —       |       —        |
| Vault service       |        SM         |          SM           |       —       |       —        |

### Prod Environment

| Service/Job         | `I4G_PII__PEPPER` | `I4G_CRYPTO__PII_KEY` | `I4G_API_KEY` | `I4G_API__KEY` |
| ------------------- | :---------------: | :-------------------: | :-----------: | :------------: |
| Core API (core-svc) |        SM         |          SM           |       —       |       —        |
| Console service     |         —         |           —           |      SM       |       —        |
| Ingest job          |        SM         |          SM           |       —       |       —        |
| Report job          |        SM         |          SM           |       —       |       —        |

**Legend:** SM = Secret Manager reference, — = not injected

---

## Local Development Setup

For local development (`I4G_ENV=local`), no cloud secrets are needed:

1. **API auth is disabled** — `settings.identity.disable_auth` is forced `True`,
   so all API calls succeed without a token.
2. **PII encryption uses fallbacks** — local mode uses a hardcoded Fernet key
   for intake contact field encryption.
3. **UI uses `.env.local`** — copy `ui/apps/web/.env.example` to `.env.local`
   and set `I4G_API_KEY=dev-analyst-token`.

If you need to test Secret Manager integration locally:

```bash
# Authenticate with GCP
gcloud auth application-default login

# Set the project for SM lookups
export I4G_SECRETS__PROJECT=i4g-dev
export I4G_SECRETS__USE_SECRET_MANAGER=true
```

---

## Adding a New Secret

1. **Create the secret in Secret Manager:**

   ```bash
   echo -n "value" | gcloud secrets create SECRET_NAME \
     --project=PROJECT_ID --replication-policy=automatic --data-file=-
   ```

2. **Grant access to the service account** that needs it:

   ```bash
   gcloud secrets add-iam-policy-binding SECRET_NAME \
     --project=PROJECT_ID \
     --member="serviceAccount:SA@PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/secretmanager.secretAccessor"
   ```

3. **Add the `secret_env_vars` entry** in the appropriate `terraform.tfvars`:

   ```hcl
   # For Cloud Run services (v1 API):
   core_svc_secret_env_vars = {
     ENV_VAR_NAME = {
       secret  = "projects/PROJECT_ID/secrets/SECRET_NAME"
       version = "latest"
     }
   }
   ```

4. **Add the Settings field** in `core/src/i4g/settings/config.py` if the
   Python backend needs it.

5. **Update this document** with the new secret's purpose, consumers, and
   rotation policy.

6. **Run `terraform plan`** to verify the change before applying.
