# Working with Reports

This page explains how to read, verify, and act on intelligence products
from I4G. Every report follows a standardized structure designed for law
enforcement intake.

## Report Structure

Each I4G dossier contains these sections:

1. **Cover Sheet** — Case ID, generating analyst, timestamp, and digital
   signature hash.
2. **Executive Summary** — One-page narrative of the scam, financial impact,
   and recommended next steps.
3. **Timeline** — Chronological sequence of critical messages, transactions,
   and interventions.
4. **Entity Overview** — Table of extracted
   [threat entities](../key-concepts/entities.md) (wallets, emails, phone
   numbers, domains) with confidence scores.
5. **Evidence Manifest** — Links to redacted artifacts with per-file
   integrity hashes.
6. **Appendices** — Risk flags, related cases, and references to applicable
   criminal statutes.

## Verifying Authenticity

Every report includes tamper-evident integrity mechanisms so you can confirm
the document hasn't been altered since generation.

### Per-artifact hashes

Each evidence file (screenshot, document, log) carries its own SHA-256 hash,
computed at ingestion and embedded in the evidence manifest.

### Aggregate hash

A top-level SHA-256 is computed over the sorted set of all per-artifact
hashes. If any single artifact is modified, the aggregate hash changes.

### How to verify

1. Locate the aggregate hash in the dossier footer.
2. Collect all per-artifact hashes listed in the evidence manifest.
3. Sort them lexicographically, concatenate, and compute SHA-256.
4. Compare your result to the aggregate hash in the footer — they must
   match.

The `.signatures.json` file bundled with the dossier contains the same
hashes in machine-readable format.

## Blockchain Enrichment

When a case involves cryptocurrency wallet entities, the dossier includes
enrichment data from blockchain analytics:

| Field                    | What it tells you                                         |
| ------------------------ | --------------------------------------------------------- |
| **Vendor Risk Label**    | Risk classification from the configured analytics vendor. |
| **Transaction Volume**   | Total transaction value associated with the wallet.       |
| **Exchange Attribution** | Known exchange or service linked to the wallet.           |
| **Cluster Edges**        | Related wallets identified through on-chain clustering.   |

This enrichment helps connect wallet addresses to broader fraud
infrastructure and known exchanges.

## LEA Referral Tracking

Analysts can log law enforcement referrals directly on case records,
creating a structured audit trail from investigation to agency intake:

- **Case detail** — shows the referral agency, date, and status.
- **Campaign detail** — aggregates referral status across member cases,
  showing which cases have been referred and to which agencies.

If you have a referral or external case number to share back, provide it
to your liaison for logging against the I4G case.

## Requesting Additional Evidence

If a report doesn't contain everything you need:

1. Email `leo@intelligenceforgood.org` from an official domain with
   subject: `Case <ID> — Additional Evidence Request`.
2. Specify the exact materials needed (e.g. original chat logs, encrypted
   contact field decryption, crypto transaction traces).
3. Attach a signed request form or subpoena when applicable.
4. Expect a response within 2 business days. Use the secure hotline for
   urgent cases.

> Access to raw PII or unredacted media requires a subpoena or mutual aid
> agreement.

## Providing Feedback

Your feedback improves the platform:

- Report sections that need more detail or different formatting.
- Additional entities or metrics that would support your investigations.
- **Outcomes** (arrests, funds recovered) tied to I4G reporting — these
  help demonstrate impact and secure continued funding.

## Learn more

- [Dossiers & Reports](../key-concepts/dossiers-and-reports.md) — report
  types and chain of custody
- [Entities](../key-concepts/entities.md) — what threat entities are and
  why they matter
- [Threat Indicators](../key-concepts/indicators.md) — vetted indicators
  shared via STIX and partner feeds
