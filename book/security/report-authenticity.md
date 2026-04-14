# Report Authenticity

Every I4G report is digitally signed so you can confirm it hasn't been
altered since generation. This page walks you through verification — no
technical tools required beyond a SHA-256 calculator.

For background on report types and the chain of custody, see
[Dossiers & Reports](../key-concepts/dossiers-and-reports.md).

## What the signature proves

- **Integrity** — the file hasn't been modified since the platform
  generated it.
- **Origin** — the report was produced by a verified I4G instance, not
  fabricated externally.
- **Completeness** — every evidence artifact listed in the manifest was
  present when the report was signed.

## Where to find the signature

| Location                    | What it contains                            |
| --------------------------- | ------------------------------------------- |
| **Dossier footer**          | Aggregate SHA-256 hash (human-readable)     |
| **Cover sheet**             | Case ID, analyst, timestamp, aggregate hash |
| **`.signatures.json` file** | Machine-readable per-artifact and aggregate |
|                             | hashes bundled with the evidence package    |

## How to verify a report

### Step 1 — Locate the aggregate hash

Open the dossier PDF and find the aggregate hash printed in the footer
or on the cover sheet.

### Step 2 — Collect per-artifact hashes

Open the evidence manifest section of the report (or the
`.signatures.json` file). Each evidence artifact — screenshot, chat log,
document — has its own SHA-256 hash.

### Step 3 — Recompute the aggregate

1. Sort the per-artifact hashes in alphabetical (lexicographic) order.
2. Concatenate them into a single string with no separator.
3. Compute the SHA-256 hash of the concatenated string.

### Step 4 — Compare

Your computed hash must match the aggregate hash from Step 1 exactly.
If it matches, the report is authentic and unmodified. If it doesn't,
the document or one of its artifacts has been altered.

{% hint style="warning" %}
If the hashes don't match, do not rely on the report's contents.
Contact your I4G liaison to request a fresh copy.
{% endhint %}

## Quick-reference commands

If you have a command-line SHA-256 tool available, you can automate
Step 3:

```bash
# Sort hashes, concatenate, and compute aggregate
cat .signatures.json | jq -r '.artifacts[].hash' | sort | tr -d '\n' | shasum -a 256
```

## Need help?

If you're a law enforcement partner receiving reports, your I4G liaison
can walk you through verification on first use. See the full
[Working with Reports](../law-enforcement-guide/working-with-reports.md)
guide for report structure and how to request additional evidence.
