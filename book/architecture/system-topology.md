# System Topology

This diagram shows the high-level components and how they interact. It is the best starting point for understanding the system boundaries.

![System Topology](../assets/architecture/system_topology.svg)

## Key Pillars

*   **Ingress & Auth:** All external traffic enters via a Global Load Balancer and is authenticated via Identity Platform (Firebase Auth).
*   **Compute:** We use **Cloud Run** for stateless containers.
    *   `Core API`: FastAPI backend serving the frontend and external partners.
    *   `Worker`: Background job processor for OCR, ingestion, and reporting.
    *   `UI Console`: Next.js frontend for analysts.
*   **Data:**
    *   `Firestore`: Primary NoSQL database for structured case data.
    *   `PII Vault`: A separate, encrypted Firestore instance for sensitive personal data.
    *   `GCS`: Object storage for raw evidence files and generated PDF reports.
*   **AI:** We leverage **Document AI** for OCR and **Vertex AI** for vector search.
