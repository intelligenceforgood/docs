# CLI Guide

Use the `i4g` CLI to run local operations, smokes, and admin workflows from one place. It keeps common tasks consistent and safer than ad-hoc script invocations.

## Install or upgrade

Install editable inside the repo so the `i4g` entry point tracks your working tree and exposes all subcommands:

- `pip install -e .`
- Confirm the version: `i4g --version`

## Shell completion

Tab completion avoids typos on long subcommands and flags. Typer does not install completion automatically, so run this once per shell you use:

- `i4g --install-completion`

Restart the shell afterward so the completion script is picked up.

## Config precedence

Many commands accept numerous runtime options. Rather than remembering every flag, consolidate settings and let the CLI resolve them safely:

1. `config/settings.default.toml` – shared defaults checked into the repo.
2. Optional `config/settings.local.toml` – your personal overrides (git-ignored).
3. Env vars `I4G_*` with `__` for nesting (e.g., `I4G_VECTOR__BACKEND`) – great for CI or one-off changes.
4. CLI flags – last-mile overrides when you truly need to deviate.

This ordering helps prevent accidental runs against production or someone else’s test data. Use `i4g settings info` to see which files and environment values are active before running a command.

## Command map (shortcuts)

- `i4g env` – bootstrap or seed local data (e.g., `bootstrap-local`, `seed-sample`).
- `i4g settings` – inspect/export config manifests so docs and CI stay in sync.
- `i4g jobs` – run worker jobs (ingest, report, intake, account, dossier, ingest-retry).
- `i4g ingest` – bundle and Vertex ingest helpers; tag saved searches.
- `i4g search` – query or evaluate Vertex, refresh schema, annotate saved searches.
- `i4g data` – prepare retrieval datasets and indexes.
- `i4g reports` – verify dossier/ingestion artifacts.
- `i4g extract` – OCR and semantic extraction pipelines.
- `i4g smoke` – dossiers, Vertex retrieval, Cloud Run smokes.
- `i4g admin` – saved-search export/import/tagging, dossier build/process/pilot, RAG query helpers.

## Quick starts

```bash
# Browse commands
 i4g --help

# Show config sources
 i4g settings info

# Refresh sandbox data (skip OCR or vectors if you need speed)
 i4g env bootstrap-local --skip-ocr --skip-vector

# Smoke dossiers against local FastAPI
 I4G_API_KEY=dev-token i4g smoke dossiers --api-url http://localhost:8000

# Export saved searches to a file
 i4g admin export-saved-searches --owner alice --output alice.json
```
