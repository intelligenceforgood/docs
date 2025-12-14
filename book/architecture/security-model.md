# Security Model

How we keep victims’ data safe while delivering evidence law enforcement can trust. (Replace the placeholder with the updated security diagram.)

<img src="../assets/architecture/security_model.svg" alt="Security model" title="Security model" />

## Core safeguards

- **Immediate masking:** PII is tokenized on upload; analysts and most systems see tokens, not raw identifiers.
- **Separated stores:** Canonical PII lives in the vault; case data, vectors, and reports live in separate stores with scoped access.
- **Approvals for reveal:** Detokenization requires explicit approvals (or subpoena) and is fully audited.
- **Encryption everywhere:** In transit (TLS) and at rest (KMS-wrapped keys); signed dossiers include hashes for verification.
- **Least privilege:** Roles limit who can view, edit, or export; volunteers cannot see raw PII.
- **Proactive monitoring:** Alerts on unusual access to the vault, failed auth, and signature mismatches.

## Why it matters

- Victims stay protected while their cases move forward.
- Partners and donors see a compliant, auditable path from intake to court-ready evidence.
- The architecture scales without relaxing privacy guarantees.
