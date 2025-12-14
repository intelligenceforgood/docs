# Security & Compliance

We protect user data with masking, strict access, and short retention. This page summarizes what matters to users and partners; deeper technical details live in the engineering docs.

## How we protect your data

- **Tokenization and masking:** Personal details are converted to tokens on upload; analysts see masked text. Decryption requires approvals and is audited.
- **Encryption:** Data is encrypted in transit and at rest; sensitive secrets live in a protected vault.
- **Least privilege:** Access is limited to the minimum needed roles; volunteer analysts cannot view raw PII.
- **Signed reports:** Dossiers include hashes and signatures so recipients can verify authenticity.

## Data retention (at a glance)

- **Active cases:** Kept while being worked, then ~30 days after resolution.
- **Resolved cases:** Removed ~90 days after resolution unless law requires longer.
- **Audit logs:** Kept for security investigations (about a year).
- **Legal holds:** If a subpoena or investigation requires it, we keep only the necessary records until cleared.

## Compliance posture

- Supports user rights to access, export, and delete their data (where applicable by law).
- Follows a documented incident response plan with rapid notification timelines.
- Aligns volunteer training with partner requirements (e.g., university or agency policies).

## Need to verify a report?

- Use the signature hash on the cover sheet plus the `.signatures.json` provided by the analyst. See the [Law Enforcement Guide](../guides/law-enforcement.md) for steps.

> Want more detail? The engineering TDD and compliance playbooks are available on request for partner reviews.
