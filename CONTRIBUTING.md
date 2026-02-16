# Contributing to the Documentation Site

## Workflow

1. Open an issue for new sections or major edits.
2. Create a feature branch for your changes.
3. Edit Markdown files inside `book/`. GitBook renders the content natively — no local build step is required.
4. Run `npm run lint` to validate formatting.
5. Submit a pull request with screenshots (if visual changes) and a brief summary.
6. After merge, GitBook Git Sync deploys updates automatically.

## Content Guidelines

- Write in inclusive, volunteer-friendly language.
- Keep sections short and link to deeper technical docs when needed.
- Ensure any diagrams have source files committed (e.g., `.drawio`, `.svg`).
- Add new pages to `book/SUMMARY.md` so they appear in the GitBook navigation.

## Review Checklist

- Spelling and grammar checked.
- Navigation updated in `SUMMARY.md` if new pages are added.
- Links verified (cross-repo links use full GitHub URLs).

Thanks for keeping our knowledge base accessible!
