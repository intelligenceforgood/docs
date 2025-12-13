# Intelligence for Good Documentation

This repository backs the public documentation site for **Intelligence for Good (i4g)**. Content is authored in Markdown, rendered locally with Honkit (the open GitBook toolchain), and synchronized to the GitBook space at <https://app.gitbook.com/o/Hg1e7Xd0z04S7CXWL3N0/s/wiZ96sabsxLxLwhsQmRz> via Git Sync.

## Repository Layout

- `.gitbook.yaml` – configures GitBook to read from the `book/` directory.
- `book/` – Markdown sources, images, and navigation files used by GitBook and Honkit.
- `book/SUMMARY.md` – defines the left-hand navigation tree.
- `package.json` – local tooling (Honkit preview/build, Markdown linting).

## Prerequisites

- Node.js ≥ 20.x (use `nvm` or Homebrew to install/update).
- `npm` (bundled with Node.js).

## Local Authoring Workflow

1. Clone the repo and install dependencies:
	```bash
	npm install
	```
2. Start the local preview server:
	```bash
	npm run dev
	```
	This runs Honkit in watch mode at <http://localhost:4000>, matching the GitBook layout closely.
3. Edit Markdown files inside `book/`. The preview reloads automatically.
4. Run the quality checks before raising a PR:
	```bash
	npm run lint
	npm run build
	```
	- `lint` runs markdownlint (GitBook-compatible rules).
	- `build` produces a static site under `dist/` to ensure the content compiles.

## GitBook Git Sync

The GitBook space is already connected to this repository. After merging changes into `main`:

1. Open the GitBook project → **Git Sync** sidebar.
2. Click **Pull latest** to import Markdown updates from GitHub.
3. Review the draft build inside GitBook; adjust page order if needed.
4. Publish the space to make the changes visible at the live GitBook URL (custom domains can be added later).

> Tip: GitBook keeps its own version history. If content diverges, use **Sync → Resolve conflicts** inside GitBook to pick either the repo or the GitBook version of a page.

## Contribution Checklist

- Branch from `main` and keep PRs focused (one topic per PR when possible).
- Include screenshot placeholders or actual captures when documenting UI updates.
- Reference source material from `core`, `infra`, and `planning` as needed; cite file paths so future contributors can trace the origin.
- Ensure sensitive data (PII, secrets) never appears in docs or screenshots.
- Images: prefer inline SVG/PNG without separate "Open full size" links (GitBook lightbox handles zoom). Use high-res PNGs; add width hints (e.g., `![caption](path.png =1600x)`) only if a page needs a wider render.

## Testing & Deployment

- `npm run lint` – Markdown lint rules (fails on stylistic or structural issues).
- `npm run build` – Verifies Honkit can generate the static output used by GitBook.
- `npm run dev` – Local preview for manual QA before publishing.

Once tests pass and the PR is merged, trigger Git Sync in GitBook to deploy the updated content. Long term, we can automate this with a GitHub Action that calls the GitBook API, but the current process keeps production separated until custom domains (`intelligenceforgood.gitbook.io`, `i4g.gitbook.io`) are approved through the nonprofit program.

## Related Repositories

- [`intelligenceforgood/core`](../core) – primary source for product and technical documentation during MVP.
- [`intelligenceforgood/infra`](../infra) – Terraform and Cloud Run configuration details referenced throughout the docs.
- [`intelligenceforgood/planning`](../planning) – Change logs, migration runbooks, and roadmap inputs.
