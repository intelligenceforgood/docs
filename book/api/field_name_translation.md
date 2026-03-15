# Field Name Translation Reference

The backend (Python / FastAPI) uses **snake_case** for all field names internally.
API response models inherit from `CamelModel` (`i4g.api.camel`), which uses
Pydantic's `alias_generator = to_camel` to serialise JSON keys as **camelCase**
automatically. No manual translation is needed for response models.

The frontend SDK and UI components use **camelCase** natively.

## Current State

### Automatic Translation (via CamelModel)

All Pydantic response models in `response_models.py` and `cases.py` inherit
from `CamelModel`. Python code uses `snake_case` field names; JSON output is
`camelCase`. No manual mapping required.

**SDK cleanup (D79):** The `normalizeVerificationArtifact` and
`normalizeDossierVerification` functions have been removed — the backend now
returns camelCase for verification endpoints directly.

### Remaining Manual Translation Points

These sites still perform explicit mapping because the data flows through raw
dicts (`Dict[str, Any]`) rather than typed CamelModel instances:

| #   | File                                                    | Function(s)                                                         | Reason                              |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------- |
| 1   | `ui/apps/web/src/lib/platform-client.ts`                | `fetchCoreSearch` (request body)                                    | Client→server query params          |
| 2   | `ui/packages/sdk/src/index.ts`                          | `normalizeDossierRecord`, `normalizeDownloads`                      | Dossier list returns raw dicts      |
| 3   | `ui/apps/web/src/lib/server/reviews-service.helpers.ts` | `mapHistoryEvent`, `mapSavedSearch`, `mapHybridSearchSchemaPayload` | Events/searches are raw store dicts |
| 4   | `ui/apps/web/src/lib/search-links.ts`                   | `buildSearchHref`                                                   | URL param building (dual-tolerance) |

### Eliminated Translation Points

The following were removed by D79:

- `normalizeVerificationArtifact` — backend `VerifyArtifact` now serialises as camelCase
- `normalizeDossierVerification` — backend `DossierVerifyResponse` now serialises as camelCase
- `detokenizeResponseSchema` snake_case keys — schema updated to camelCase
- `caseDetailSchema` `graph_nodes`/`graph_links` — updated to `graphNodes`/`graphLinks`

## Guidelines for New Endpoints

1. **Response models:** Inherit from `CamelModel` — camelCase is automatic.
2. **Raw dict responses** (e.g., `List[Dict[str, Any]]`): Keys pass through
   unchanged. If the frontend needs camelCase, add a normalize function.
3. **Request bodies:** Currently snake_case. Frontend sends snake_case; Pydantic
   accepts both casings when `populate_by_name=True`.
4. **Query parameters:** Defined as function parameters — always snake_case in
   the URL. Frontend maps camelCase values to snake_case params explicitly.

## Intelligence & Export Models (Sprint 2)

The intelligence and export endpoints follow the same `CamelModel` convention.
Key field mappings:

| Python Field (snake_case) | JSON / SDK Field (camelCase) | Model              |
| ------------------------- | ---------------------------- | ------------------ |
| `entity_type`             | `entityType`                 | Entity list/detail |
| `canonical_value`         | `canonicalValue`             | Entity list/detail |
| `case_count`              | `caseCount`                  | Entity stats       |
| `loss_sum`                | `lossSum`                    | Entity stats       |
| `first_seen`              | `firstSeen`                  | Entity / Indicator |
| `last_seen`               | `lastSeen`                   | Entity / Indicator |
| `indicator_value`         | `indicatorValue`             | Indicator          |
| `confidence_score`        | `confidenceScore`            | Indicator          |
| `campaign_name`           | `campaignName`               | Campaign stats     |
| `risk_score`              | `riskScore`                  | Campaign stats     |
| `total_entities`          | `totalEntities`              | Platform KPIs      |
| `total_indicators`        | `totalIndicators`            | Platform KPIs      |
| `active_campaigns`        | `activeCampaigns`            | Platform KPIs      |

No manual translation is needed — all models inherit from `CamelModel`.
