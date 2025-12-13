# Architecture Guide

Welcome to the Intelligence for Good (i4g) architecture documentation. This guide provides a "map of the world" for the system, allowing you to zoom in from a high-level overview down to specific subsystems.

## Overview

The i4g platform is built on a modular, cloud-native stack that balances rapid iteration with strict data protections.

*   **[System Topology](system-topology.md)**: The "Metro Map" showing high-level components and boundaries.
*   **[Data Pipeline](data-pipeline.md)**: The journey of evidence from ingestion to search.
*   **[Security Model](security-model.md)**: Authentication, authorization, and PII protection.
*   **[Infrastructure](infra.md)**: Terraform modules and cloud resources.

## Code Map

Where does the code live?

| Component | Repo | Path |
| :--- | :--- | :--- |
| **Core API** | `core` | `src/i4g/api/` |
| **Worker** | `core` | `src/i4g/worker/` |
| **UI Console** | `ui` | `apps/web/` |
| **Infrastructure** | `infra` | `modules/` & `environments/` |
| **Diagrams** | `arch-viz` | `src/views/` |
