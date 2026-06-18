# PhishDestroy Collaboration Packet

## 1. What We Built

We have successfully integrated the PhishDestroy threat intelligence feeds into the I4G platform. This read-only integration focuses on ingesting and correlating your high-signal data with our internal indicators to provide our analysts with richer context on threat actors, infrastructure, and financial damage.

Key components integrated:

- **Blocklist & Discoveries:** Live ingestion of the `destroylist` and Merklemap tail.
- **ScamIntelLogs Archive:** Comprehensive ingestion of chat sessions, financial damage claims, brand impersonations, and infrastructure profiles across 15+ teams.
- **Actor Profiles:** Hydration of ~1,500 threat actor profiles, complete with identity panels, co-membership graphs, and pivot data (from `DestroyScammers`).

## 2. Sources Consumed

- `destroylist` (domains, indicators)
- `ScamIntelLogs` (chat exports, financial claims, infra maps, brand impersonation)
- `DestroyScammers` (actor identities, leaks, shared infrastructure)
- `merklemap-cli` (live SSE feed for new domain discoveries)

## 3. Provenance Preserved

Data integrity and traceability were our highest priorities. For every record imported from PhishDestroy, we have preserved exact provenance:

- **Commit SHA Pinned:** All ingestion jobs are tied to specific commit SHAs to ensure reproducibility.
- **Idempotency:** Records are uniquely keyed by `commit_sha + team + record_id`.
- **Source Tracing:** Every ingested row in the I4G database contains a `source_provenance` JSON blob mapping back to the exact file and line in the original repository.
- **PII Gating:** Sensitive data (real names, chat transcripts) is gated behind strict RBAC controls (`senior_analyst` role) with 100% read-audit coverage.

## 4. What Could Flow Back (The Two-Way Interface Sketch)

While v1 of our integration is strictly "read-only" to respect the existing data structures, we see immense value in a future two-way synchronization.

*Note: This is a sketch for a deferred PRD and requires team review before any formal outreach.*

**Proposed Bi-Directional Flow:**

1. **Verified Discoveries:** When our internal enrichment modules (e.g., reverse WHOIS) identify new confirmed infrastructure for an actor already in PhishDestroy, we could automatically generate PRs to `DestroyScammers/data.json` or `destroylist`.
2. **Actor Merges:** If I4G analysts confirm that two separate identities belong to the same threat actor, we could push back an "Actor Merge Proposal" schema.
3. **Automated Takedowns:** Enriching PhishDestroy's dataset with our automated abuse-desk reporting status (e.g., "Takedown Requested", "Takedown Confirmed") to reduce duplicate effort.

**Schema Sketch (Hypothetical):**

```json
{
  "type": "enrichment_contribution",
  "target": "DestroyScammers",
  "actor_id": "pd_actor_123",
  "new_indicators": [
    { "type": "domain", "value": "scam-domain.com", "source": "i4g_enrichment" }
  ],
  "confidence": "high"
}
```
