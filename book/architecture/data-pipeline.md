# Data Pipeline

The journey of a case file from upload to search index.

![Data Pipeline](../assets/architecture/data_pipeline.svg)

## Stages

*   **Ingestion:** Files are uploaded via the API and queued in Pub/Sub.
*   **Processing:** The Worker service pulls jobs, extracts text via OCR, and redacts PII.
*   **Storage:** Raw files go to a locked bucket; redacted files go to a clean bucket. PII tokens are stored in the Vault.
*   **Indexing:** Clean text is embedded and synced to Vertex AI Vector Search.
