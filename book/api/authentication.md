# Authentication

API access is tightly controlled because the platform processes highly sensitive PII. **The canonical IAM design lives in `core/docs/design/iam.md`;** this page covers API-specific auth concepts. For role definitions and requesting access, see [Access Control](../security/access-control.md).

## Three-Layer Authentication

### Layer 1: Infrastructure (IAP)

Cloud Run services sit behind a Global External Application Load Balancer with Google Identity-Aware Proxy (IAP) enabled. Users authenticate via Google Sign-In; IAP validates Google identity before traffic reaches Cloud Run. Only members of authorized Google Groups can pass through.

### Layer 2: Application (JWT + API key)

The FastAPI `require_token()` dependency validates credentials in priority order:

| Method       | Header                          | When used                                          |
| ------------ | ------------------------------- | -------------------------------------------------- |
| IAP JWT      | `X-Goog-IAP-JWT-Assertion`      | Browser → LB → API (direct hit through IAP)        |
| Bearer token | `Authorization: Bearer <token>` | Service-to-service calls (e.g., console SSR → API) |
| API key      | `X-API-KEY`                     | Local development, CI, and background jobs         |

The authenticated email is resolved to an application role via the `accounts` table. Unknown users are auto-provisioned with the `user` role on first request.

### Layer 3: Forwarded user identity

When the Next.js console makes server-side API calls, it authenticates as a service account. To preserve the real user's identity, the console extracts the user's email from the IAP assertion and forwards it via `X-I4G-Forwarded-User`. The API trusts this header only when the caller is a service account.

```python
# Route protection examples (see src/i4g/api/auth.py)
@router.get("/protected", dependencies=[Depends(require_token)])
def protected_endpoint():
    ...

@router.get("/admin-only", dependencies=[Depends(require_role("admin"))])
def admin_endpoint():
    ...
```

### Auth Coverage

| Route group                    | Auth requirement        |
| ------------------------------ | ----------------------- |
| `/accounts/me`                 | `require_token`         |
| `/accounts/*` (CRUD)           | `require_role("admin")` |
| `/campaigns/*` (create/update) | `require_role("admin")` |
| `/tasks/*` (update)            | `require_role("admin")` |
| `/reviews/*`, `/intakes/*`     | `require_token`         |
| Other read endpoints           | `require_token`         |

## Roles

| Role      | Capabilities                                               |
| --------- | ---------------------------------------------------------- |
| `user`    | Read-only access to public case summaries (default)        |
| `analyst` | Full case review, annotation, search, report generation    |
| `leo`     | All analyst capabilities plus LEO-specific reports         |
| `admin`   | All capabilities plus user management, campaigns, bulk ops |

Roles follow a hierarchy (`user < analyst < leo ≤ admin`). A `require_role("analyst")` check passes for analysts, LEOs, and admins.

## Local Development

Set `I4G_ENV=local` or `settings.identity.disable_auth=true` to bypass authentication entirely. The API returns a mock admin user (`local-dev`). The UI skips IAP token generation for localhost targets.

## Service Accounts & Background Jobs

- Background Cloud Run jobs (ingestion, report generation, account sync) run under dedicated service accounts with least-privilege IAM roles managed by Terraform.
- The API key (`I4G_API__KEY`) is used for local development and CI environments.

## Future Enhancements

- **Non-Google identity options:** Evaluate passkeys or external IdPs for users without Google accounts.
- **Hardware key support:** For administrators handling PII rehydration or law enforcement liaison duties.
- **Device posture checks:** Pair IAP with BeyondCorp Enterprise for sensitive operations.
