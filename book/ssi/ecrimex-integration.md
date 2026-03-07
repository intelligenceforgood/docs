# eCrimeX Integration

SSI integrates with the [APWG eCrimeX](https://ecrimex.net) (eCX) data clearinghouse to enrich investigations with community intelligence and contribute findings back to the anti-fraud community.

The integration operates in three phases:

1. **Consume** — Enrich every investigation with eCX community intelligence during passive recon.
2. **Contribute** — Submit scam URLs, wallet addresses, and malicious domains/IPs back to eCX with governance controls.
3. **Orchestrate** — Poll eCX for new records that trigger SSI investigations automatically, with campaign correlation linking related threats.

## Enrichment (Phase 1)

When `SSI_ECX__ENABLED=true` and a valid API key is set, SSI queries four eCX modules during passive recon:

- **Phish** — Known phishing URLs and their confidence scores, brands, and infrastructure.
- **Malicious Domain** — Domains classified as phishing, fraud, or malware.
- **Malicious IP** — IP addresses associated with malicious activity.
- **Cryptocurrency Addresses** — Wallet addresses linked to fraud, with crime category and currency.

Results appear in the "Community Intelligence (eCrimeX)" section of investigation reports and as `external_references` in STIX 2.1 bundles. Enrichment results are cached for `SSI_ECX__CACHE_TTL_HOURS` (default 24h) to reduce API calls.

## Submission (Phase 2)

SSI can submit investigation findings back to eCX. Two safety gates prevent accidental submissions:

1. `SSI_ECX__SUBMISSION_ENABLED=true`
2. `SSI_ECX__SUBMISSION_AGREEMENT_SIGNED=true` (requires an executed APWG data sharing agreement)

### Governance model

| Risk Score | Action                   | Analyst Required?    |
| ---------- | ------------------------ | -------------------- |
| >= 80      | Auto-submit to eCX       | No                   |
| 50–79      | Queue for analyst review | Yes (approve/reject) |
| < 50       | Skip submission          | N/A                  |

Thresholds are configurable via `SSI_ECX__AUTO_SUBMIT_THRESHOLD` and `SSI_ECX__QUEUE_THRESHOLD`.

### Submission management

Analysts manage the submission queue via the Console (`/ssi/submissions`) or CLI:

```bash
ssi ecx submissions                    # List queue
ssi ecx submit <investigation-id>      # Manual submission
ssi ecx status <investigation-id>      # Check status
ssi ecx retract <submission-id>        # Retract a submission
```

See [ssi/docs/submission_governance.md](https://github.com/intelligenceforgood/ssi/blob/main/docs/submission_governance.md) for the full governance guide.

## Polling (Phase 3)

When `SSI_ECX__POLLING_ENABLED=true`, SSI polls eCX for new records using cursor-based delta polling (only fetches records newer than the last poll). This runs as a Cloud Run Job on a Cloud Scheduler cadence or ad-hoc via CLI:

```bash
ssi ecx poll                      # Full cycle (all configured modules)
ssi ecx poll --module phish       # Poll a single module
```

### Filtering pipeline

Polled records pass through three filters before triggering investigations:

1. **Confidence threshold** — Only records with `confidence >= SSI_ECX__POLLING_CONFIDENCE_THRESHOLD` pass.
2. **Brand allowlist** — If `SSI_ECX__POLLING_BRANDS` is set, only matching brands pass.
3. **TLD allowlist** — If `SSI_ECX__POLLING_TLDS` is set, only matching TLDs pass.

Records are then deduplicated against existing SSI investigations. When `SSI_ECX__POLLING_AUTO_INVESTIGATE=true`, qualifying phish URLs trigger SSI investigations automatically.

### Campaign correlation

SSI links related investigations into campaigns using three strategies:

- **Wallet-based** — Investigations sharing the same cryptocurrency wallet address.
- **IP/ASN-based** — Investigations hosted on shared infrastructure.
- **Brand pattern** — Coordinated phishing waves impersonating the same brand within a time window.

Campaign records appear in the Console's campaign view with timeline visualizations.

## Configuration reference

All settings use the `SSI_ECX__` prefix. See [Configuration](configuration.md) for the full environment variable table, or the machine-readable manifest at `docs/config/ssi_ecx_settings_manifest.yaml`.

## Ad-hoc queries

Search eCX directly without running an investigation:

```bash
ssi ecx search phish <url>
ssi ecx search domain <domain>
ssi ecx search ip <ip>
ssi ecx search crypto <address>
```
