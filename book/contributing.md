# Contributing

We welcome contributions that improve clarity, accessibility, and accuracy of the i4g documentation.

## How to Help

1. Review open items in [Roadmap → Open Questions](roadmap/open-questions.md) or backlog issues in the GitHub repository.
2. Create a feature branch (`docs/<short-description>`) and make focused changes.
3. Run the local checks:

   ```bash
   npm run lint
   npm run build
   ```

4. Open a pull request summarizing the changes and linking to the source material (e.g., PRDs, Terraform modules).
5. After merge, trigger GitBook Git Sync to publish updates.

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

All contributors must follow the overarching project [Code of Conduct](../CONTRIBUTING.md). Report violations to the program administrators immediately.
