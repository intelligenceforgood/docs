# Architecture Guide

This book shows how the platform works—what happens to evidence, how AI and humans combine, and how privacy is enforced. It is written for donors, partners, and end users who want confidence without deep technical detail. Engineering specifics live in the core repository.

- **[System Topology](system-topology.md)**: The major building blocks (user/analyst app, API, encrypted PII fields, evidence stores) and how they connect.
- **[Data Pipelines](data-pipeline.md)**: The journey from upload → encryption → hybrid search → signed dossier.
- **[Security Model](security-model.md)**: The safeguards (masking, encryption, access approvals, auditing) that keep users safe.
- **[Threat Intelligence](threat-intelligence.md)**: The TIFAP analytics pipeline — entity stats, campaign intelligence, graph service, and external enrichments.
- **[Job Architecture](job-architecture.md)**: The 14 Cloud Run background jobs — inventory, Docker image mapping, scheduling, and data dependencies.
- **[SSI Architecture](ssi-architecture.md)**: The Scam Site Investigator — browser automation, OSINT, wallet extraction, and Core integration.

> Diagrams are rendered as SVG images for full-width display on GitBook. The Mermaid source is preserved in a collapsible block on each page for editing. To regenerate SVGs, run `npx @mermaid-js/mermaid-cli -i source.mmd -o output.svg -w 2400`.
> Scope: No deployment minutiae here—just how the platform delivers trustworthy reports while protecting identities.
