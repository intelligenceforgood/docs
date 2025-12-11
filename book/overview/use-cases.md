# Core Use Cases

The platform orchestrates several workflows end-to-end. Each use case maps to infrastructure components and operational playbooks described throughout the documentation.

## User Verification & Assistance

1. User engages with the public chatbot or guided intake form.
2. Evidence (text, screenshots, receipts) is uploaded and scanned for safety issues.
3. PII is tokenized immediately; structured entities and semantic embeddings are generated.
4. The system issues a case ID and provides next steps or educational resources.

## Analyst Review

1. Cases exceeding risk thresholds or marked “uncertain” enter the analyst queue.
2. Analysts view masked evidence, add annotations, and assign scam categories.
3. Decisions feed back into the knowledge base to improve future classification.
4. Key metrics (time to resolution, false positives) are tracked in the dashboard.

## Knowledge Base Growth

- Accepted cases enrich Firestore collections and Vertex AI Search indexes.
- Structured entity graphs reveal recurring wallets, accounts, and scripts.
- Reports feed training datasets for future LLM classifiers and response models.

## Law Enforcement Escalation

1. When case clusters meet severity thresholds, automated RAG pipelines assemble reports.
2. Reports include standardized narratives, timelines, evidence manifests, and contact info.
3. Secure sharing channels are used to transmit reports and supporting artifacts.
4. Feedback from agencies informs future report templates and evidentiary requirements.

## Operational Cadence

- Weekly Cloud Run task pulls Azure SQL/Search exports into Firestore and Vertex AI Search (see [Weekly Azure Refresh](../operations/weekly-refresh.md)).
- Monitoring and alerting ensure ingestion, review, and reporting SLAs remain healthy.

For deeper implementation details, cross-reference the infrastructure modules in [`infra/environments`](../../infra/environments) and the migration scripts in [`core/scripts/migration`](../../core/scripts/migration).
