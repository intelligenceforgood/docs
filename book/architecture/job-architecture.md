# Job Architecture

Cloud Run Jobs handle batch processing, analytics computation, and data lifecycle management. This page is the authoritative reference for all background jobs deployed on the platform.

## Overview

The platform runs **14 background jobs** across **5 Docker images**. Most analytics and maintenance jobs share the `ingest-job` image for cost efficiency; four core jobs have dedicated images (ingestion, intake, report, dossier), and the SSI eCrimeX poller runs on the `ssi-svc` image.

![Job Architecture](../assets/architecture/job_architecture.svg)

<details>
<summary>Mermaid source (click to expand)</summary>

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'14px', 'fontFamily':'system-ui, sans-serif'}, 'flowchart': {'curve':'basis', 'padding':16}}}%%
flowchart LR
    classDef img       fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef job       fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#bf360c
    classDef sched     fill:#efebe9,stroke:#5d4037,stroke-width:2px,color:#3e2723
    classDef data      fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#004d40
    classDef ai        fill:#fce4ec,stroke:#ad1457,stroke-width:2px,color:#880e4f

    subgraph IngestImg["🐳 ingest-job image"]
        direction TB
        Ingest["ingest<br/>OCR · normalize · embed"]:::job
        Sweeper["classification-sweeper<br/>re-tag cases · 5 min"]:::job
        Retry["ingest-retry<br/>failed batch retry"]:::job
        Purge["retention-purge<br/>soft-delete · hard-purge"]:::job
        Analytics["analytics-aggregation<br/>stats · KPIs · risk"]:::job
        Linkage["linkage-extract<br/>LLM indicator matching"]:::job
        Watchlist["watchlist-check<br/>entity monitoring"]:::job
        Clustering["infrastructure-clustering<br/>shared hosting edges"]:::job
        Takedown["takedown-check<br/>URL reachability"]:::job
        SchedReports["scheduled-reports<br/>recurring generation"]:::job
    end

    subgraph IntakeImg["🐳 intake-job image"]
        Intake["process-intakes<br/>form → entity extraction"]:::job
    end

    subgraph ReportImg["🐳 report-job image"]
        Report["generate-reports<br/>PDF · hash · sign"]:::job
    end

    subgraph DossierImg["🐳 dossier-job image"]
        Dossier["dossier-queue<br/>aggregate evidence"]:::job
    end

    subgraph Triggers["🕐 Cloud Scheduler"]
        S1>"*/5 · sweeper"]:::sched
        S2>"daily 03:00 · purge"]:::sched
        S3>"4 h · analytics"]:::sched
        S4>"6 h · clustering"]:::sched
        S5>"12 h · takedown"]:::sched
        S6>"30 min · watchlist"]:::sched
    end

    subgraph Stores["💾 Data Stores"]
        DB[("Cloud SQL PG 15")]:::data
        GCS[("GCS Buckets")]:::data
        Vertex["Vertex AI Search"]:::ai
        Gemini["Gemini 2.0"]:::ai
    end

    S1 -. trigger .-> Sweeper
    S2 -. trigger .-> Purge
    S3 -. trigger .-> Analytics
    S4 -. trigger .-> Clustering
    S5 -. trigger .-> Takedown
    S6 -. trigger .-> Watchlist

    Ingest --> DB & GCS & Vertex & Gemini
    Intake --> DB
    Report --> DB & GCS
    Dossier --> DB & GCS
    Analytics --> DB
    Linkage --> DB & Gemini
    Purge --> DB & GCS
    Sweeper --> DB & Gemini
    Watchlist --> DB
    Clustering --> DB
    Takedown --> DB
```

</details>

## Job Inventory

| Job                           | CLI Command                          | Docker Image  | Trigger        | Purpose                                               |
| :---------------------------- | :----------------------------------- | :------------ | :------------- | :---------------------------------------------------- |
| **Ingestion Worker**          | `i4g jobs ingest`                    | `ingest-job`  | On-demand / CI | Batch JSONL processing: OCR, normalize, embed         |
| **Intake Worker**             | `i4g jobs intake`                    | `intake-job`  | On-demand      | Process user submissions, validate, extract entities  |
| **Report Generator**          | `i4g jobs report`                    | `report-job`  | On-demand      | Render Jinja2 → Markdown → PDF, hash, sign            |
| **Dossier Processor**         | `i4g jobs dossier`                   | `dossier-job` | Queue-driven   | Aggregate evidence, build relationship graphs         |
| **Classification Sweeper**    | `i4g jobs classify`                  | `ingest-job`  | `*/5 * * * *`  | Re-classify pending cases via taxonomy + LLM          |
| **Retention Purge**           | `i4g jobs retention-purge`           | `ingest-job`  | `0 3 * * *`    | Soft-delete → hard-purge resolved cases (90 + 30 day) |
| **Analytics Aggregation**     | `i4g jobs analytics`                 | `ingest-job`  | Every 4 hours  | Compute entity/indicator/campaign stats, KPIs         |
| **Linkage Extraction**        | `i4g jobs linkage-extract`           | `ingest-job`  | Post-intake    | LLM-driven financial indicator matching               |
| **Watchlist Check**           | `i4g jobs watchlist-check`           | `ingest-job`  | Every 30 min   | Monitor pinned entities for new activity              |
| **Infrastructure Clustering** | `i4g jobs infrastructure-clustering` | `ingest-job`  | Every 6 hours  | Discover shared-hosting entity relationships          |
| **Takedown Check**            | `i4g jobs takedown-check`            | `ingest-job`  | Every 12 hours | Verify URL reachability, detect site takedowns        |
| **Scheduled Reports**         | `i4g jobs scheduled-reports`         | `ingest-job`  | Cadence-based  | Trigger recurring report generation                   |
| **Ingest Retry**              | `i4g jobs ingest-retry`              | `ingest-job`  | On-demand      | Retry failed ingestion batches                        |
| **SSI eCrimeX Poller**        | `ssi ecx poll`                       | `ssi-svc`     | `*/15 * * * *` | Poll eCrimeX for new scam intelligence and sync to DB |

## Docker Image Mapping

Five distinct images are built via `scripts/build_image.sh`:

| Image         | Dockerfile                      | Jobs Included                                                                                                   |
| :------------ | :------------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| `ingest-job`  | `docker/ingest-job.Dockerfile`  | Ingest, Sweeper, Retry, Retention Purge, Analytics, Linkage, Watchlist, Clustering, Takedown, Scheduled Reports |
| `intake-job`  | `docker/intake-job.Dockerfile`  | Intake Worker                                                                                                   |
| `report-job`  | `docker/report-job.Dockerfile`  | Report Generator                                                                                                |
| `dossier-job` | `docker/dossier-job.Dockerfile` | Dossier Processor                                                                                               |
| `ssi-svc`     | `docker/ssi-svc.Dockerfile`     | SSI eCrimeX Poller (includes Playwright + Chromium)                                                             |

> The `ingest-job` image includes `tesseract-ocr` and is the largest; all TIFAP analytics jobs reuse it to avoid duplicating dependencies.

## Scheduling

Jobs are triggered by Cloud Scheduler or on-demand via the CLI. The scheduler creates triggers in **PAUSED** state by default; operators enable them per environment.

| Schedule         | Job                       | Notes                                                                      |
| :--------------- | :------------------------ | :------------------------------------------------------------------------- |
| `*/15 * * * *`   | SSI eCrimeX Poller        | Every 15 minutes                                                           |
| `*/5 * * * *`    | Classification Sweeper    | Every 5 minutes                                                            |
| `0 3 * * * UTC`  | Retention Purge           | Daily at 03:00 UTC                                                         |
| Every 4 hours    | Analytics Aggregation     | Configurable via `I4G_ANALYTICS__REFRESH_INTERVAL_MINUTES`                 |
| Every 6 hours    | Infrastructure Clustering | Configurable via `I4G_ANALYTICS__INFRASTRUCTURE_CLUSTERING_INTERVAL_HOURS` |
| Every 12 hours   | Takedown Check            | Configurable via `I4G_ENRICHMENT__TAKEDOWN_CHECK_INTERVAL_HOURS`           |
| Every 30 minutes | Watchlist Check           | Configurable via `I4G_ANALYTICS__WATCHLIST_CHECK_INTERVAL_MINUTES`         |

For the full engineering reference including key logic and env vars, see `core/docs/design/jobs.md`.
