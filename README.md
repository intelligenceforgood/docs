# Intelligence for Good Documentation

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docs Site](https://img.shields.io/badge/GitBook-Live-blueviolet.svg)](https://app.gitbook.com/o/Hg1e7Xd0z04S7CXWL3N0/s/wiZ96sabsxLxLwhsQmRz)

This repository backs the public documentation site for **Intelligence for Good (i4g)**. Content is authored in Markdown and published to GitBook via Git Sync.

## Repository Layout

- `.gitbook.yaml` – configures GitBook to read from the `book/` directory.
- `book/` – Markdown sources, images, and navigation files.
- `book/SUMMARY.md` – defines the left-hand navigation tree in GitBook.
- `package.json` – local tooling (Markdown linting).

## Prerequisites

- Node.js ≥ 20.x (use `nvm` or Homebrew to install/update).
- `npm` (bundled with Node.js).

## Local Authoring Workflow

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Edit Markdown files inside `book/`. GitBook renders Mermaid diagrams, hint blocks, and other extensions natively — no local build step is required.
3. Run the quality check before raising a PR:
   ```bash
   npm run lint
   ```
   To auto-fix fixable issues:
   ```bash
   npm run lint:fix
   ```

## GitBook Git Sync

The GitBook space is connected to this repository. After merging changes into `main`, GitBook automatically picks up the updates via Git Sync. If auto-sync is not enabled:

1. Open the GitBook project → **Git Sync** sidebar.
2. Click **Pull latest** to import Markdown updates from GitHub.
3. Review the draft build inside GitBook; adjust page order if needed.
4. Publish the space to make the changes live.

## Contribution Checklist

- Branch from `main` and keep PRs focused (one topic per PR when possible).
- Include screenshot placeholders or actual captures when documenting UI updates.
- Reference source material from `core`, `infra`, and `planning` as needed; cite file paths so future contributors can trace the origin.
- Ensure sensitive data (PII, secrets) never appears in docs or screenshots.
- Images: prefer inline SVG/PNG without separate "Open full size" links (GitBook lightbox handles zoom). Use high-res PNGs; add width hints (e.g., `![caption](path.png =1600x)`) only if a page needs a wider render.

## Testing & Deployment

- `npm run lint` – Markdown lint rules (fails on stylistic or structural issues).

Once the PR is merged, GitBook Git Sync deploys the updated content automatically.

## Related Repositories

- [`intelligenceforgood/core`](../core) – primary source for product and technical documentation during MVP.
- [`intelligenceforgood/infra`](../infra) – Terraform and Cloud Run configuration details referenced throughout the docs.
- [`intelligenceforgood/planning`](../planning) – Change logs, migration runbooks, and roadmap inputs.
