# Platform Overview

Intelligence for Good (i4g) combines human expertise with responsible AI to help communities identify, document, and report online fraud. The platform currently targets **crypto and romance scams** that disproportionately affect seniors and other vulnerable populations.

## Mission

- Empower users to verify suspicious conversations early and receive actionable guidance.
- Equip volunteer analysts with a secure, collaborative workspace for evidence review.
- Deliver standardized, court-ready reports that accelerate law enforcement investigations.

## Core Capabilities

| Layer | Capabilities | Primary Technologies |
| --- | --- | --- |
| Ingestion | OCR for screenshots, text normalization, language & sentiment detection | Python, Tesseract OCR |
| Extraction | Entity and relationship extraction, scam classification | LangChain, Vertex AI Gemini |
| Storage & Retrieval | Structured Firestore collections, semantic vector search, Azure export integration | Firestore, Vertex AI Search, Chroma (prototype) |
| Human Review | Streamlit Analyst Dashboard with PII masking | Streamlit on Cloud Run |
| Reporting | Automated generation of law-enforcement-ready summaries | FastAPI, templated doc generation |

## Environments

| Environment | Purpose | Cloud Project | Access |
| --- | --- | --- | --- |
| Development | Iteration, staging data syncs, volunteer onboarding | `i4g-dev` | Restricted to core contributors via Google IAM |
| Production (planned) | Live analyst operations, partnership pilots | `i4g-prod` | Provisioned but not yet active |

Both environments are provisioned via Terraform (see `infra/environments/*`). Each Cloud Run service uses dedicated service accounts, Secret Manager for credentials, and structured logging.

## Current Endpoints

| Service | URL | Notes |
| --- | --- | --- |
| Analyst Dashboard | <https://streamlit-analyst-ui-y5jge5w2cq-uc.a.run.app/> | Google Identity-aware proxy required (custom domains `intelligenceforgood.gitbook.io` and `i4g.gitbook.io` pending nonprofit approval). |
| API Gateway | <https://fastapi-gateway-y5jge5w2cq-uc.a.run.app/> | Authenticated via Google Identity Platform; future IAM enhancements TBD. |

> _Placeholder:_ When custom domains are issued, update the table with the preferred SaaS-style hostnames (e.g., `app.intelligenceforgood.org`, `api.i4g.app`).

## Program Status

- ✅ Prototype validated with end-to-end ingestion, analyst review, and report generation.
- ⚙️ MVP hardening in progress (Cloud Run deployment, OAuth, PII vault).
- 🗺️ Partnership readiness and volunteer scaling planned for the next milestone cycle.

For a detailed requirements breakdown see [`core/docs/prd_production.md`](../../core/docs/prd_production.md) in the main workspace.
