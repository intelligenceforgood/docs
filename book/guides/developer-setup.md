# Unified Developer Setup Guide

This guide provides a step-by-step path to setting up the full Intelligence for Good (i4g) stack: Backend (Core), Frontend (UI), and Infrastructure.

## Prerequisites

*   **Git**
*   **Python 3.11+** (Conda recommended)
*   **Node.js 20+** & **PNPM 9**
*   **Docker** (Optional, for containerized runs)
*   **Google Cloud SDK** (Optional, for infra deployment)

## 1. Repository Setup

The project is organized as a multi-root workspace. We recommend cloning all repositories into a single parent directory (e.g., `~/work/i4g/`).

```bash
mkdir i4g && cd i4g
git clone https://github.com/intelligenceforgood/core.git
git clone https://github.com/intelligenceforgood/ui.git
git clone https://github.com/intelligenceforgood/infra.git
git clone https://github.com/intelligenceforgood/docs.git
git clone https://github.com/intelligenceforgood/planning.git
```

## 2. Backend Setup (Core)

The `core` repository contains the FastAPI backend and worker jobs.

1.  **Navigate to Core:** `cd core`
2.  **Create Environment:**
    ```bash
    conda create -n i4g python=3.11
    conda activate i4g
    ```
3.  **Install Dependencies:**
    ```bash
    pip install -e .
    ```
4.  **Seed Local Data:**
    ```bash
    i4g bootstrap local reset --report-dir data/reports/bootstrap_local
    ```
5.  **Run the API:**
    ```bash
    uvicorn i4g.api.app:app --reload
    ```
    *   API will be available at `http://127.0.0.1:8000`.
    *   Docs at `http://127.0.0.1:8000/docs`.

*See [core/README.md](../../../core/README.md) for detailed instructions.*

## 3. Frontend Setup (UI)

The `ui` repository contains the Next.js analyst console.

1.  **Navigate to UI:** `cd ../ui`
2.  **Install Dependencies:**
    ```bash
    pnpm install
    ```
3.  **Configure Environment:**
    ```bash
    cd apps/web
    cp .env.example .env.local
    # Edit .env.local if needed (defaults usually work with local Core)
    ```
4.  **Run Development Server:**
    ```bash
    # From ui/ root
    pnpm dev
    ```
    *   UI will be available at `http://localhost:3000`.

*See [ui/README.md](../../../ui/README.md) for detailed instructions.*

## 4. Infrastructure (Optional)

If you need to deploy to Google Cloud or manage cloud resources:

1.  **Navigate to Infra:** `cd ../infra`
2.  **Authenticate:**
    ```bash
    gcloud auth application-default login
    ```
3.  **Initialize Terraform:**
    ```bash
    cd environments/app/dev
    terraform init
    ```

*See [infra/README.md](../../../infra/README.md) for detailed instructions.*

## Troubleshooting

*   **CORS Errors:** Ensure `API_URL` in `ui/apps/web/.env.local` matches the running Core API URL.
*   **Missing Data:** Rerun the `i4g bootstrap local reset` command in `core`.
