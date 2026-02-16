# Architecture Guide

This book shows how the platform works—what happens to evidence, how AI and humans combine, and how privacy is enforced. It is written for donors, partners, and end users who want confidence without deep technical detail. Engineering specifics live in the core repository.

- **[System Topology](system-topology.md)**: The major building blocks (user/analyst app, API, tokenization vault, evidence stores) and how they connect.
- **[Data Pipeline](data-pipeline.md)**: The journey from upload → tokenization → hybrid search → signed dossier.
- **[Security Model](security-model.md)**: The safeguards (masking, encryption, access approvals, auditing) that keep users safe.

> Diagrams are rendered as SVG images for full-width display on GitBook. The Mermaid source is preserved in a collapsible block on each page for editing. To regenerate SVGs, run `npx @mermaid-js/mermaid-cli -i source.mmd -o output.svg -w 2400`.
> Scope: No deployment minutiae here—just how the platform delivers trustworthy reports while protecting identities.
