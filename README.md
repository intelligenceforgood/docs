# Intelligence for Good Documentation

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docs Site](https://img.shields.io/badge/GitBook-Live-blueviolet.svg)](https://app.gitbook.com/o/Hg1e7Xd0z04S7CXWL3N0/s/wiZ96sabsxLxLwhsQmRz)

This repository backs the public documentation site for **Intelligence for Good (i4g)**. Content is authored in Markdown, published to [GitBook](https://www.gitbook.com/) via Git Sync, and also renders natively on GitHub.

## Repository Layout

```text
.gitbook.yaml          ← tells GitBook to read from book/
book/
├── README.md          ← landing page ("Welcome")
├── SUMMARY.md         ← left-hand navigation tree
├── architecture/      ← system topology, data pipeline, security model
├── api/               ← authentication, sample workflows, taxonomy
├── config/            ← settings manifest, SLO definitions
├── guides/            ← user, analyst, admin, developer setup
├── overview/          ← platform overview, personas, use cases
├── security/          ← access control, secrets reference
├── assets/            ← SVGs, screenshots, branding
│   └── architecture/  ← pre-rendered Mermaid SVGs (see below)
└── contributing.md
package.json           ← lint + diagram rendering scripts
```

## Prerequisites

- **Node.js ≥ 20.x** (use `nvm` or Homebrew).
- **npm** (bundled with Node.js).

## Getting Started

```bash
# 1. Clone and install
git clone https://github.com/intelligenceforgood/docs.git
cd docs
npm install

# 2. Lint your changes
npm run lint

# 3. Auto-fix lint issues
npm run lint:fix
```

## Local Preview & Verification

There is no local GitBook server — GitBook is a SaaS platform that renders content from the synced repository. Use these options to verify before merging:

### VS Code Markdown Preview

Open any `.md` file and press **Cmd + Shift + V** (macOS) or **Ctrl + Shift + V** (Linux/Windows). This renders headings, tables, code blocks, and images. Install the [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) extension to preview Mermaid diagrams inline.

### GitBook Change Requests (Canonical Preview)

Push your branch to GitHub. GitBook automatically creates a **Change Request** for each branch — open the GitBook space and review the rendered draft. This is the only way to see exactly what the published site will look like.

### Pre-Push Checklist

```bash
# 1. Lint all Markdown
npm run lint

# 2. If you edited any Mermaid source, regenerate SVGs
npm run render:diagrams

# 3. Verify SVGs render correctly
open book/assets/architecture/*.svg   # macOS
# xdg-open on Linux
```

## Adding and Editing Pages

1. Create or edit `.md` files inside `book/`.
2. Add new pages to `book/SUMMARY.md` so they appear in the GitBook navigation.
3. Use standard Markdown. GitBook supports fenced code blocks, tables, callout blocks, and Mermaid diagrams natively.
4. For cross-repo links (to `core/`, `infra/`, `planning/`), use **full GitHub URLs** — not relative paths. GitBook only sees the `book/` subtree, so relative links outside it break on the published site.

   ```markdown
   <!-- ✅ Correct — works on GitBook and GitHub -->

   [core/README.md](https://github.com/intelligenceforgood/core/blob/main/README.md)

   <!-- ❌ Broken on GitBook — resolves outside book/ -->

   [core/README.md](../../../core/README.md)
   ```

## Architecture Diagrams (Mermaid)

The architecture pages (`book/architecture/`) contain complex Mermaid flowcharts. These diagrams are maintained using a dual-render approach:

### The Problem

GitBook renders Mermaid blocks natively but **does not support resizing or zoom** — complex diagrams appear too small to read. GitHub, by contrast, renders the same Mermaid blocks at full width with interactive features.

### The Solution

Each architecture page has:

1. **An SVG image** (`book/assets/architecture/*.svg`) — displayed by GitBook at full width with click-to-zoom lightbox.
2. **The Mermaid source** in a `<details>` collapsible — the single source of truth, also rendered interactively on GitHub.

### Editing Diagrams

1. Edit the Mermaid source inside the `<details>` block in the `.md` file.
2. Regenerate the SVGs:

   ```bash
   npm run render:diagrams
   ```

   This extracts Mermaid blocks from the three architecture pages and renders them to SVG at 2400px width using `@mermaid-js/mermaid-cli`.

3. Commit both the updated `.md` file and the regenerated `.svg`.

> **Always run `npm run render:diagrams` after editing any Mermaid source.** The SVG is what GitBook readers see — if you change the Mermaid but skip the render step, GitBook will show a stale diagram.

### Adding a New Diagram

1. Add the Mermaid block to your page using the same pattern (SVG image + `<details>` source).
2. Place the SVG in `book/assets/architecture/`.
3. Add the new file to the `render:diagrams` script in `package.json`.

## GitBook Git Sync

The GitBook space is connected to this repository. After merging changes into `main`, GitBook picks up updates automatically via Git Sync. If auto-sync is not enabled:

1. Open the GitBook project → **Git Sync** sidebar.
2. Click **Pull latest** to import Markdown updates from GitHub.
3. Review the draft build inside GitBook; adjust page order if needed.
4. Publish the space to make the changes live.

## Scripts Reference

| Script          | Command                   | Purpose                                          |
| --------------- | ------------------------- | ------------------------------------------------ |
| Lint            | `npm run lint`            | Check all Markdown files for style issues        |
| Lint fix        | `npm run lint:fix`        | Auto-fix fixable lint issues                     |
| Render diagrams | `npm run render:diagrams` | Regenerate architecture SVGs from Mermaid source |

## Contribution Checklist

- [ ] Branch from `main`; keep PRs focused (one topic per PR).
- [ ] Run `npm run lint` — all checks pass.
- [ ] New pages added to `book/SUMMARY.md`.
- [ ] Cross-repo links use full GitHub URLs.
- [ ] If Mermaid diagrams changed: ran `npm run render:diagrams` and committed the SVGs.
- [ ] No PII, secrets, or sensitive data in docs or screenshots.
- [ ] Screenshots stored in `book/assets/screenshots/`; SVG logos in `book/assets/branding/`.

## Known Limitations

| Issue                                                   | Workaround                                                                   |
| ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| GitBook Mermaid blocks are not resizable/zoomable       | Pre-render to SVG and embed as images (see above)                            |
| GitBook rewrites `.md` links matching its own file tree | Use full GitHub URLs for cross-repo references                               |
| No GitBook-identical local preview                      | Use VS Code Markdown preview locally; push branch for GitBook Change Request |

## Related Repositories

| Repo                                                                              | Purpose                              |
| --------------------------------------------------------------------------------- | ------------------------------------ |
| [`intelligenceforgood/core`](https://github.com/intelligenceforgood/core)         | Python backend, FastAPI, worker jobs |
| [`intelligenceforgood/ui`](https://github.com/intelligenceforgood/ui)             | Next.js analyst console              |
| [`intelligenceforgood/infra`](https://github.com/intelligenceforgood/infra)       | Terraform, Cloud Run, IAM            |
| [`intelligenceforgood/planning`](https://github.com/intelligenceforgood/planning) | Roadmap, change log, task tracking   |
