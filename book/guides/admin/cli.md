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

- `i4g bootstrap` – reset/load/verify smoke flows. Subcommands: `local reset|load|verify|smoke`, `dev reset|load|verify|smoke`, and `seed-sample`. Local bootstrap supports `--smoke-search` and `--smoke-dossiers` (FastAPI must be running) so you can capture verification evidence without rerunning imports. Set `I4G_ENV=local` when running local bootstrap commands in CI.
- `i4g settings` – inspect/export config manifests so docs and CI stay in sync.
- `i4g jobs` – run worker jobs (ingest, report, intake, account, dossier, ingest-retry).
- `i4g ingest` – bundle and Vertex ingest helpers; tag saved searches.
- `i4g taxonomy` – manage fraud taxonomy definitions (regenerates backend data and frontend types).
- `i4g search` – query or evaluate Vertex, refresh schema, annotate saved searches.
- `i4g data` – prepare retrieval datasets and indexes.
- `i4g reports` – verify dossier/ingestion artifacts.
- `i4g extract` – OCR and semantic extraction pipelines.
- `i4g smoke` – dossiers, Vertex retrieval, Cloud Run smokes.
- `i4g admin` – saved-search export/import/tagging, dossier build/process/pilot, RAG query helpers.
- `i4g azure` – legacy Azure migration and export helpers.

## Guardrails

- Local bootstrap refuses to run unless `I4G_ENV=local` (override with `--force` only when you know the target is isolated). It prints the bundle manifest sha256 during verification so you can confirm what was loaded.
- Dev bootstrap blocks prod targets and non-dev envs unless `--force` is passed; it always impersonates the WIF service account you provide, logs the project/region/bundle, and computes a sha256 when the bundle URI points to a local file.
- Keep `--dry-run` and `--verify-only` in regular use to avoid unintended writes.
- Smokes: add `--smoke-search` on local runs, `--smoke-dossiers` when FastAPI is up, or `--run-dossier-smoke/--run-search-smoke` on dev runs to capture verification evidence; failures stop the run. Dev verify defaults to running both smokes; dev reset/load leave them opt-in.

## Dev reprime workflow (manual)

- Use the manual GitHub Action dispatch in [core/.github/workflows/dev-reprime.yaml](core/.github/workflows/dev-reprime.yaml) instead of auto-triggers. It defaults to `dry_run=true` and requires `confirm=RUN` for real execution.
- Inputs mirror the CLI: `project`, `region`, optional `bundle_uri`/`dataset`, `run_smoke`, dossier/search smoke toggles, search params, `report_dir`, and `wif_service_account`.
- Real runs need WIF secrets in the repo (`GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_SERVICE_ACCOUNT_EMAIL`); dry runs skip gcloud entirely.
- Every run uploads the bootstrap report artifact; attach it to the PR or handoff so reviewers know what was reset and which smokes ran.
- Preferred usage: after reviewing storage-affecting changes (bundles/chroma/sqlite schema) and only with lead approval.

## Quick starts

```bash
# Browse commands
 i4g --help

# Show config sources
 i4g settings info

# Refresh sandbox data (skip OCR or vectors if you need speed)
 i4g bootstrap local load --skip-ocr --skip-vector

# Full local reset + verification
i4g bootstrap local reset --bundle-uri data/bundles/synthetic_coverage/bundle.jsonl --smoke-dossiers

# Dev bootstrap via Cloud Run jobs (dry-run first)
 i4g bootstrap dev reset --bundle-uri gs://i4g-dev-data-bundles/demo/bundle.jsonl --dry-run

# Dev smoke-only verification (no job execution)
 i4g bootstrap dev smoke --smoke-api-url https://fastapi-gateway-y5jge5w2cq-uc.a.run.app

# Smoke dossiers against local FastAPI
 I4G_API_KEY=dev-token i4g smoke dossiers --api-url http://localhost:8000

# Export saved searches to a file
 i4g admin export-saved-searches --owner alice --output alice.json
```
