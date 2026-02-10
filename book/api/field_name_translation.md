# Field Name Translation Reference

The backend (Python / FastAPI) uses **snake_case** for all field names. The frontend SDK and UI components use **camelCase**. Translation is performed manually at specific integration points -- there is no generic `toSnakeCase` / `toCamelCase` utility.

This document catalogs every known translation site so developers can keep them in sync when adding or renaming fields.

## Translation Points Overview

| #   | File                                                    | Function(s)                                                                                                     | Direction             |
| --- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------- |
| 1   | `ui/apps/web/src/lib/platform-client.ts`                | `fetchCoreSearch`, `mapCoreSearchResult`                                                                        | Both                  |
| 2   | `ui/packages/sdk/src/index.ts`                          | `normalizeDossierRecord`, `normalizeDownloads`, `normalizeVerificationArtifact`, `normalizeDossierVerification` | server → client       |
| 3   | `ui/packages/sdk/src/index.ts`                          | `listDossiers`, `detokenize`                                                                                    | client → server       |
| 4   | `ui/apps/web/src/lib/server/reviews-service.helpers.ts` | `mapHistoryEvent`, `extractSavedSearchDescriptor`, `mapSavedSearch`, `mapHybridSearchSchemaPayload`             | server → client       |
| 5   | `ui/apps/web/src/lib/server/account-list-service.ts`    | `buildRunPayload`                                                                                               | client → server       |
| 6   | `ui/apps/web/src/lib/search-links.ts`                   | `buildSearchHref`                                                                                               | Dual-casing tolerance |

## Detailed Mappings

### 1. Search Request (`fetchCoreSearch` — client → server)

| camelCase (TypeScript) | snake_case (Python)  |
| ---------------------- | -------------------- |
| `lossBuckets`          | `loss_buckets`       |
| `timeRange`            | `time_range`         |
| `savedSearchId`        | `saved_search_id`    |
| `savedSearchName`      | `saved_search_name`  |
| `savedSearchOwner`     | `saved_search_owner` |
| `savedSearchTags`      | `saved_search_tags`  |
| `entity.matchMode`     | `match_mode`         |
| _(computed)_           | `vector_limit`       |
| _(computed)_           | `structured_limit`   |

### 2. Search Response (`mapCoreSearchResult` — server → client)

| snake_case (Python)          | camelCase (TypeScript) |
| ---------------------------- | ---------------------- |
| `case_id`                    | `id`                   |
| `created_at`                 | `occurredAt`           |
| `elapsed_ms` / `duration_ms` | `stats.took`           |

### 3. Dossier Records (`normalizeDossierRecord` — server → client)

| snake_case                | camelCase               |
| ------------------------- | ----------------------- |
| `plan_id`                 | `planId`                |
| `queued_at`               | `queuedAt`              |
| `updated_at`              | `updatedAt`             |
| `manifest_path`           | `manifestPath`          |
| `signature_manifest_path` | `signatureManifestPath` |
| `signature_manifest`      | `signatureManifest`     |
| `artifact_warnings`       | `artifactWarnings`      |

### 4. Dossier Downloads (`normalizeDownloads` — server → client)

| snake_case                 | camelCase           |
| -------------------------- | ------------------- |
| `local.signature_manifest` | `signatureManifest` |
| `remote[].remote_ref`      | `remoteRef`         |
| `remote[].size_bytes`      | `sizeBytes`         |

### 5. Verification Artifacts (`normalizeVerificationArtifact` — server → client)

| snake_case      | camelCase      |
| --------------- | -------------- |
| `expected_hash` | `expectedHash` |
| `actual_hash`   | `actualHash`   |
| `size_bytes`    | `sizeBytes`    |

### 6. Verification Summary (`normalizeDossierVerification` — server → client)

| snake_case       | camelCase       |
| ---------------- | --------------- |
| `plan_id`        | `planId`        |
| `missing_count`  | `missingCount`  |
| `mismatch_count` | `mismatchCount` |
| `all_verified`   | `allVerified`   |

### 7. Search History (`mapHistoryEvent` — server → client)

| snake_case      | camelCase     |
| --------------- | ------------- |
| `created_at`    | `createdAt`   |
| `action_id`     | `id`          |
| `case_id`       | `caseId`      |
| `results_count` | `resultCount` |

### 8. Saved Search Descriptor (`extractSavedSearchDescriptor` — dual tolerance)

Accepts both casings on input and normalizes to camelCase output:

| Accepted input                                    | Output  |
| ------------------------------------------------- | ------- |
| `saved_search_id` / `savedSearchId` / `search_id` | `id`    |
| `saved_search_name` / `savedSearchName`           | `name`  |
| `saved_search_owner` / `savedSearchOwner`         | `owner` |
| `saved_search_tags` / `savedSearchTags`           | `tags`  |

### 9. Saved Search Record (`mapSavedSearch` — server → client)

| snake_case   | camelCase   |
| ------------ | ----------- |
| `search_id`  | `id`        |
| `created_at` | `createdAt` |

### 10. Search Schema (`mapHybridSearchSchemaPayload` — dual tolerance)

| snake_case / camelCase accepted      | Output (camelCase) |
| ------------------------------------ | ------------------ |
| `indicator_types` / `indicatorTypes` | `indicatorTypes`   |
| `loss_buckets` / `lossBuckets`       | `lossBuckets`      |
| `time_presets` / `timePresets`       | `timePresets`      |
| `entity_examples` / `entityExamples` | `entityExamples`   |

### 11. Account List (`buildRunPayload` — client → server)

| camelCase        | snake_case        |
| ---------------- | ----------------- |
| `startTime`      | `start_time`      |
| `endTime`        | `end_time`        |
| `topK`           | `top_k`           |
| `includeSources` | `include_sources` |
| `outputFormats`  | `output_formats`  |

### 12. SDK Direct Methods

**`listDossiers()`** — query param: `includeManifest` → `include_manifest`

**`detokenize()`** — body field: `caseId` → `case_id`

## Guidelines for New Translations

1. **Always map in an explicit function** — do not rely on generic converters.
2. **Accept both casings on read** where feasible (see `extractSavedSearchDescriptor` as a pattern).
3. **Test the round-trip** — if the backend returns a field that the SDK translates, verify the client receives the expected shape.
4. **Update this document** when adding new translated fields.
