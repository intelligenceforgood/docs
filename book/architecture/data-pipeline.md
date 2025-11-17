# Data Pipelines

This page traces how data flows through i4g from ingestion to law enforcement reporting.

## 1. Intake & Upload

- Users interact with a guided form or conversational assistant.
- Evidence files are scanned for malware and converted into normalized formats.
- Metadata (submission channel, timestamps, user locale) is added before processing.

## 2. OCR & Text Normalization

- Screenshots pass through Tesseract OCR with language detection heuristics.
- Extracted text is cleaned, deduplicated, and segmented into meaningful chunks.
- Non-text attachments (PDFs, receipts) remain linked as binary artifacts in Cloud Storage.

## 3. Entity Extraction & Classification

- LangChain orchestrates Vertex AI Gemini to identify key entities (wallet addresses, contact info, payment methods) and emotional tone.
- Rule-based classifiers and LLM signals produce a scam likelihood score.
- Outputs feed both structured storage and semantic embeddings for later retrieval.

## 4. PII Tokenization & Vault Storage

- Detected PII is immediately tokenized (e.g., `<PII:SSN:7a8f2e>`).
- Tokens store encrypted references in a dedicated Firestore collection with Cloud KMS.
- Case documents only retain the tokens, ensuring analysts never see raw PII.

## 5. Knowledge Base Updates

- Firestore collections capture case summaries, annotations, and workflow state.
- Vertex AI Search indexes sanitized content for semantic lookups.
- Embeddings may also be replicated to Chroma or AlloyDB (future evaluation) for specialized searches.

## 6. Human Review Loop

- Analysts receive triaged cases based on risk and campaign clustering.
- Their decisions update the structured records, providing ground truth for future models.

## 7. Reporting & Export

- Approved cases trigger the report generator to assemble PDFs with structured narratives.
- Reports include digital signatures, evidence manifests, and optional appendices for cryptocurrency traces.
- Distribution occurs via secure channels (email with expiring links, partner portal, or direct liaison).

## 8. Historical Backfills

- Until upstream systems migrate fully, a **weekly Cloud Run job** imports Azure SQL/Search exports.
- Ingestion scripts under `proto/scripts/migration` manage schema alignment and ensure idempotent loads.

Refer to [`proto/scripts/migration/azure_sql_to_firestore.py`](../../proto/scripts/migration/azure_sql_to_firestore.py) and [`infra/environments/dev/main.tf`](../../infra/environments/dev/main.tf) for the authoritative implementations of these flows.
