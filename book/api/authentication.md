# Authentication

API access is tightly controlled because the platform processes highly sensitive PII. **The canonical IAM plan lives in `core/docs/design/iam.md`;** this page captures API-specific notes and examples.

## Two-Layer Authentication Model

The platform uses a dual authentication model:

### Layer 1: Infrastructure (IAP)

Cloud Run services are protected by Google Identity-Aware Proxy (IAP). Users authenticate via Google Sign-In and must be on the domain allowlist. IAP validates the Google identity before traffic reaches the application.

### Layer 2: Application (API Keys)

Within the FastAPI application, routers that require auth use `X-API-KEY` header validation. The current prototype uses development tokens configured in `config/settings.local.toml`:

```python
from i4g.api.auth import require_token, require_role

# Token validation reads the X-API-KEY header
@router.get("/protected", dependencies=[Depends(require_token)])
def protected_endpoint():
    ...

# Role-based access restricts to specific user roles
@router.get("/admin-only", dependencies=[Depends(require_role("admin"))])
def admin_endpoint():
    ...
```

### Auth Coverage

Not all routers currently enforce authentication. The following routers require `X-API-KEY`:

| Router | Auth Required |
| --- | --- |
| `/reviews/*` | Yes (`require_token`) |
| `/intakes/*` | Yes (`require_token`) |
| `/tokenization/*` | Yes (`require_token`) |
| `/accounts/*` | Yes (custom `require_account_list_key`) |
| Others (cases, reports, analytics, etc.) | No (planned) |

> **Note:** Expanding auth coverage to all routers is a tracked debt item. In production, IAP provides the outer security layer for all endpoints.

## Roles

| Role | Permissions |
| --- | --- |
| `analyst` | Search, review cases, create annotations, generate reports |
| `admin` | All analyst permissions plus PII detokenization, user management |

Additional roles (`user`, `leo`) are defined in the IAM design but not yet enforced in the application layer.

## API Keys & Service Accounts

- Development tokens are configured via `I4G_API__KEY` and `I4G_ACCOUNT_LIST__API_KEY` environment variables.
- Background Cloud Run jobs use Workload Identity Federation service accounts with least-privilege IAM roles.
- The Account List router has a separate API key mechanism (`X-ACCOUNTLIST-KEY` header) configured independently.

## Planned Enhancements

- **JWT-based auth:** Replace hardcoded API keys with signed JWTs from Google Identity Platform.
- **Nonprofit IAM improvements:** Evaluate passwordless options (e.g., Passkeys, Auth0 for Nonprofits) to lower the barrier for users without Google accounts.
- **Hardware key support:** For administrators handling PII rehydration or law enforcement liaison duties.
- **Full router coverage:** Extend `require_token` to all API routers.

Keep authentication details in sync with the Terraform IAM bindings under `infra/modules/iam`.
