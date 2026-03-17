# Evidence Storage

SSI investigation evidence (screenshots, DOM snapshots, PDF reports, session logs) is stored using a UUID-prefix sharding scheme for even distribution across storage backends.

## Sharding Scheme

Evidence artifacts are organized under a 2-level hex prefix derived from the scan UUID. This creates 65,536 possible shards ($16^4$) for balanced distribution across filesystem directories or GCS prefixes.

**Path convention:**

```
{prefix}/scans/{hex[0:2]}/{hex[2:4]}/{scan_id}/
```

**Example:**

```
scan_id:  fd70a83f-91de-4533-9506-ebe3916dbff9
hex:      fd70a83f91de45339506ebe3916dbff9
path:     scans/fd/70/fd70a83f-91de-4533-9506-ebe3916dbff9/
```

The utility function `evidence_path()` in `core/src/i4g/utils/evidence_path.py` computes this path from a scan UUID.

## Directory Structure

Each scan's evidence directory contains:

```
scans/fd/70/fd70a83f-91de-4533-9506-ebe3916dbff9/
├── metadata.json          # File manifest with SHA-256 hashes
├── report.pdf             # Generated investigation report
├── evidence.zip           # Complete evidence bundle
├── screenshots/
│   ├── step-001.png       # Full-page screenshots per step
│   ├── step-002.png
│   └── ...
├── dom/
│   ├── page.html          # Raw DOM snapshot
│   └── scripts.json       # Extracted script analysis
└── session.log            # Browser session log
```

## Storage Backends

### Local (Development)

Evidence is stored under `data/evidence/` relative to the project root:

```
data/evidence/scans/fd/70/fd70a83f-91de-4533-9506-ebe3916dbff9/
```

The `site_scans.evidence_path` column stores the absolute local path.

### Google Cloud Storage (Production)

Evidence is stored in the GCS bucket configured by `storage.ssi_evidence_bucket` with the prefix from `storage.ssi_evidence_prefix`:

```
gs://i4g-evidence/ssi/evidence/scans/fd/70/fd70a83f-91de-4533-9506-ebe3916dbff9/
```

The `site_scans.evidence_path` column stores the full `gs://` URI.

## Evidence Manifest

Each evidence directory contains a `metadata.json` manifest for integrity verification:

```json
{
  "scan_id": "fd70a83f-91de-4533-9506-ebe3916dbff9",
  "generated_at": "2026-03-16T12:00:00+00:00",
  "file_count": 5,
  "files": [
    {
      "path": "report.pdf",
      "size_bytes": 124567,
      "sha256": "abc123..."
    },
    {
      "path": "screenshots/step-001.png",
      "size_bytes": 45678,
      "sha256": "def456..."
    }
  ]
}
```

Manifests are generated automatically for new investigations and can be backfilled for existing scans using `scripts/generate_evidence_manifests.py`.

## Evidence Resolution

The Core API resolves evidence locations using the following strategy (see `core/src/i4g/api/ssi_evidence.py`):

1. **Explicit `gs://` URI** — If `evidence_path` starts with `gs://`, parse and use the bucket/key directly.
2. **Sharded fallback** — Construct the GCS location from settings (`ssi_evidence_bucket` / `ssi_evidence_prefix`) using the sharded path `evidence_path(scan_id)`.
3. **Flat fallback** — Try the legacy flat path `{prefix}/{scan_id}/` for pre-migration scans.
4. **Local filesystem** — For local development, serve files directly from the filesystem path.

## Migration

Evidence created before the sharding scheme was introduced uses flat paths (`{prefix}/{scan_id}/`). The migration script moves artifacts to the sharded layout:

```bash
# Dry run (local)
conda run -n i4g python scripts/migrate_evidence_paths.py --dry-run --backend local

# Live migration (local)
conda run -n i4g python scripts/migrate_evidence_paths.py --backend local

# GCS migration (dev/prod)
conda run -n i4g I4G_ENV=dev python scripts/migrate_evidence_paths.py --backend gcs
```

The migration is idempotent — scans already at sharded paths are skipped.

## Lifecycle Management

Evidence retention follows these policies:

- **Active investigations:** Evidence is retained indefinitely while the associated case is open.
- **Resolved cases:** Evidence follows the same retention policy as case data (configurable per environment).
- **Purged cases:** Evidence artifacts are deleted when the case is purged.

The sharded layout enables efficient lifecycle operations because purge scripts can target specific prefix shards without listing the entire bucket.
