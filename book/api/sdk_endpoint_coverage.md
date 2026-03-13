# SDK Endpoint Coverage

This page maps the endpoints available in the `@i4g/sdk` TypeScript client to the backend Core API routes. Use this reference to determine which client method to call and where manual integration may be needed.

## Client Variants

| Client              | Factory                  | Use When                                                             |
| ------------------- | ------------------------ | -------------------------------------------------------------------- |
| **Default SDK**     | `createClient()`         | Connecting to an external API that matches the SDK's expected schema |
| **Platform Client** | `createPlatformClient()` | Connecting to the `core` API backend (`I4G_API_KIND=core`)           |

The platform client wraps the default SDK and overrides methods where the core backend has a different contract (e.g., search). Resolution happens in `ui/apps/web/src/lib/i4g-client.ts`.

## Coverage Matrix

### Covered by SDK (`createClient` / `createPlatformClient`)

| SDK Method                    | HTTP Route                                | Notes                                                                                                     |
| ----------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `getDashboardOverview()`      | `GET /dashboard/overview`                 | Direct pass-through                                                                                       |
| `searchIntelligence(payload)` | `POST /reviews/search/query`              | **Platform client only** — default SDK throws; platform client translates camelCase payload to snake_case |
| `listCases(params)`           | `GET /cases`                              | Direct pass-through                                                                                       |
| `getCase(id)`                 | `GET /cases/{case_id}`                    | Direct pass-through                                                                                       |
| `getTaxonomy()`               | `GET /taxonomy`                           | Direct pass-through                                                                                       |
| `getAnalyticsOverview()`      | `GET /analytics/overview`                 | Direct pass-through                                                                                       |
| `listDossiers(params)`        | `GET /reports/dossiers`                   | Direct pass-through                                                                                       |
| `verifyDossier(planId)`       | `POST /reports/dossiers/{plan_id}/verify` | Direct pass-through                                                                                       |
| `detokenize(token)`           | `POST /tokenization/detokenize`           | Direct pass-through                                                                                       |

**Total: 9 methods**

### Intelligence & Export Methods (Sprint 2)

| SDK Method                                | HTTP Route                                            | Notes                                                     |
| ----------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| `getEntities(params)`                     | `GET /intelligence/entities`                          | Filters: `entity_type`, `min_loss`, `order_by`, `limit`   |
| `getEntity(type, value)`                  | `GET /intelligence/entities/{type}/{value}`           | 403 for `researcher` role                                 |
| `getEntityActivity(type, value)`          | `GET /intelligence/entities/{type}/{value}/activity`  | Returns sparkline buckets                                 |
| `getEntityNeighbors(type, value, params)` | `GET /intelligence/entities/{type}/{value}/neighbors` | 1-hop co-occurrence graph                                 |
| `getIndicators(params)`                   | `GET /intelligence/indicators`                        | Filters: `category`, `min_confidence`, `limit`            |
| `getIndicator(id)`                        | `GET /intelligence/indicators/{id}`                   | 403 for `researcher` role                                 |
| `getDashboardWidgets()`                   | `GET /intelligence/dashboard`                         | Aggregated entity, indicator, campaign, and platform KPIs |
| `exportEntities(params)`                  | `GET /exports/entities`                               | `fmt=csv\|xlsx`, bank masking for non-analyst roles       |
| `exportIndicators(params)`                | `GET /exports/indicators`                             | `fmt=csv\|xlsx\|stix`, STIX 2.1 bundle support            |

**Total: 9 methods (18 cumulative)**

### Not Covered by SDK (require direct `fetch` or server actions)

| Category           | Endpoint                                         | Status                                          |
| ------------------ | ------------------------------------------------ | ----------------------------------------------- |
| **Search**         | `GET /reviews/search`                            | Legacy search; use `searchIntelligence` instead |
| **Search**         | `GET /reviews/search/history`                    | History via server action or direct fetch       |
| **Search**         | `GET /reviews/search/schema`                     | Schema via server action                        |
| **Saved Searches** | `POST /reviews/search/saved`                     | Server action in `reviews-service.ts`           |
| **Saved Searches** | `GET /reviews/search/saved`                      | Server action                                   |
| **Saved Searches** | `DELETE /reviews/search/saved/{id}`              | Server action                                   |
| **Saved Searches** | `PATCH /reviews/search/saved/{id}`               | Server action                                   |
| **Saved Searches** | `POST /reviews/search/saved/{id}/share`          | Server action                                   |
| **Saved Searches** | `GET /reviews/search/saved/{id}/export`          | Server action                                   |
| **Saved Searches** | `POST /reviews/search/saved/import`              | Server action                                   |
| **Saved Searches** | `POST /reviews/search/saved/bulk-tags`           | Server action                                   |
| **Saved Searches** | `GET /reviews/search/tag-presets`                | Server action                                   |
| **Review Queue**   | `POST /reviews/`                                 | Enqueue case                                    |
| **Review Queue**   | `GET /reviews/queue`                             | List queued cases                               |
| **Review Queue**   | `POST /reviews/{id}/claim`                       | Claim review                                    |
| **Review Queue**   | `POST /reviews/{id}/annotate`                    | Annotate review                                 |
| **Review Queue**   | `POST /reviews/{id}/feedback`                    | Submit feedback                                 |
| **Review Queue**   | `POST /reviews/{id}/decision`                    | Record decision                                 |
| **Review Detail**  | `GET /reviews/{id}`                              | Get single review                               |
| **Review Detail**  | `GET /reviews/case/{case_id}`                    | Reviews by case                                 |
| **Review Detail**  | `GET /reviews/{id}/actions`                      | Action history                                  |
| **Intake**         | `POST /intakes/`                                 | Submit intake                                   |
| **Intake**         | `GET /intakes/`                                  | List intakes                                    |
| **Intake**         | `GET /intakes/{id}`                              | Get intake                                      |
| **Intake**         | `GET /intakes/jobs/{id}`                         | Get job status                                  |
| **Intake**         | `POST /intakes/jobs/{id}`                        | Update job                                      |
| **Intake**         | `POST /intakes/{id}/status`                      | Update status                                   |
| **Intake**         | `POST /intakes/{id}/case`                        | Attach case                                     |
| **Reports**        | `GET /reports/dossiers/{id}/drive_acl`           | Drive ACL                                       |
| **Reports**        | `GET /reports/dossiers/{id}/signature_manifest`  | Signature manifest                              |
| **Reports**        | `GET /reports/dossiers/{id}/download/{artifact}` | Download artifact                               |
| **Reports**        | `POST /reports/generate`                         | Trigger report                                  |
| **Tokenization**   | `POST /tokenization/tokenize`                    | Tokenize PII                                    |
| **Tokenization**   | `GET /tokenization/health`                       | Health check                                    |
| **Tasks**          | `GET /tasks/{id}`                                | Poll task status                                |
| **Tasks**          | `POST /tasks/{id}/update`                        | Update task status                              |
| **Campaigns**      | `GET /campaigns`                                 | List campaigns                                  |
| **Campaigns**      | `POST /campaigns`                                | Create campaign                                 |
| **Campaigns**      | `PATCH /campaigns/{id}`                          | Update campaign                                 |
| **Account List**   | `POST /account-list/extract`                     | Extract accounts                                |
| **Account List**   | `GET /account-list/artifacts/{file}`             | Download artifact                               |
| **Account List**   | `GET /account-list/runs`                         | List runs                                       |
| **Discovery**      | `GET /discovery/search`                          | Discovery search                                |

**Total: ~40+ endpoints not in SDK**

## Extending Coverage

When adding new SDK methods, follow the existing pattern in `ui/packages/sdk/src/index.ts`:

```typescript
async methodName(params: Params): Promise<ResponseType> {
  return request("/endpoint", responseSchema, { method: "POST", body: params });
}
```

For endpoints where the core backend uses snake_case but the SDK expects camelCase, add the translation in `ui/apps/web/src/lib/platform-client.ts` and override the method there.
