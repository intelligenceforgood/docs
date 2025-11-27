# Authentication

API access is tightly controlled because the platform processes highly sensitive PII. **The canonical IAM plan now lives in `proto/docs/iam.md`;** this page only captures API-specific notes and examples.

## Current State

- **Provider:** Google Identity Platform (OAuth 2.0) with email-domain allowlists.
- **Flow:** Clients obtain an ID/access token via Google Sign-In or the temporary Quick Auth Portal (see `docs/iam.md`) and attach it as `Authorization: Bearer <token>` when calling Cloud Run.
- **Roles:** `user`, `analyst`, `admin`, `leo`. Role claims are included in JWTs and enforced by FastAPI dependency guards.
- **Session Lifetime:** 1 hour access token, with refresh token rotation handled by the gateway.

Example FastAPI dependency:

```python
from fastapi import Depends, HTTPException
from i4g.security import verify_jwt

def require_role(*allowed_roles):
    def _role_guard(claims = Depends(verify_jwt)):
        if claims["role"] not in allowed_roles:
            raise HTTPException(status_code=403, detail="Forbidden")
        return claims
    return _role_guard
```

## Planned Enhancements

- **Nonprofit IAM Improvements:** Evaluate passwordless options (e.g., Passkeys, Auth0 for Nonprofits) to lower the barrier for users without Google accounts.
- **Hardware Key Support:** For administrators handling PII rehydration or law enforcement liaison duties.
- **Audit Trails:** Expanded JWT claims to capture device fingerprints and geo metadata for anomalous detection.
- **Service-to-Service Auth:** Workload Identity Federation service accounts replacing static credentials for background jobs.

## API Keys & Service Accounts

- No static API keys are issued to external consumers at this time.
- Background Cloud Run jobs impersonate service accounts with least-privilege IAM roles.
- Any future third-party integrations will use signed URLs or one-time tokens per request.

Keep authentication details in sync with the Terraform IAM bindings under `infra/modules/iam` and the product roadmap in `planning/migration_runbook.md`.
