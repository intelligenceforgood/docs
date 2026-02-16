# Contributing

We welcome contributions that improve clarity, accessibility, and accuracy of the i4g documentation.

## How to Help

1. Review open items in the [planning roadmap](https://github.com/intelligenceforgood/planning/blob/main/roadmap.md) or backlog issues in the GitHub repository.
2. Create a feature branch (`docs/<short-description>`) and make focused changes.
3. Run the local checks appropriate for the repo you changed:

   ```bash
   # Docs (this repo)
   npm run lint

   # Core (Python backend)
   conda run -n i4g pytest tests/unit

   # UI (Next.js frontend)
   cd ui && pnpm format && pnpm build
   ```

4. Open a pull request summarizing the changes and linking to the source material (e.g., PRDs, Terraform modules).
5. After merge, trigger GitBook Git Sync to publish updates.

> For full setup instructions, see the [Developer Setup Guide](guides/developer-setup.md).

## Style Guidelines

- Use inclusive, plain language. Avoid jargon unless defined.
- Favor short paragraphs, bulleted lists, and callout blocks for readability.
- Reference workspace files with relative paths (e.g., `core/docs/prd_production.md`).
- Keep dates ISO-formatted (YYYY-MM-DD) and time zones explicit (UTC unless otherwise stated).

## Visuals & Assets

- Store screenshots under `book/assets/screenshots/` and reference them with relative links.
- Preserve SVG logos in `book/assets/branding/`; request new assets from the design liaison if needed.
- Ensure screenshots hide or blur any PII before committing.

## Code of Conduct

All contributors must follow the overarching project [Code of Conduct](https://github.com/intelligenceforgood/docs/blob/main/CONTRIBUTING.md). Report violations to the program administrators immediately.
