# Dossiers & Reports

The platform produces several types of intelligence products — from signed
PDF dossiers for law enforcement to machine-readable STIX bundles for
threat intelligence partners. Every output maintains a chain of custody
and tamper-evident audit trail.

## Report types

| Report type          | Format          | Audience              | Purpose                             |
| -------------------- | --------------- | --------------------- | ----------------------------------- |
| **PDF Dossier**      | PDF             | Law enforcement       | Case briefing with evidence summary |
| **LEA Report**       | PDF / Markdown  | Law enforcement       | Formal evidence report for filing   |
| **STIX Bundle**      | JSON (STIX 2.1) | Threat intel partners | Machine-readable indicator sharing  |
| **CSV / XLSX**       | Spreadsheet     | Analysts, partners    | Bulk indicator data for analysis    |
| **Evidence Package** | ZIP archive     | Law enforcement       | Complete evidence with metadata     |

## Chain of custody

Every report maintains an unbroken chain of custody from evidence
collection to final delivery:

1. **Evidence ingested** — timestamped with source and upload metadata
2. **Entities extracted** — recorded with detector, confidence, and
   text span
3. **Analyst reviewed** — all actions logged with analyst ID and timestamp
4. **Report generated** — template filled with audited data, generation
   timestamp recorded
5. **Report signed** — digital signature applied for tamper-evidence

This chain means a law enforcement partner can trace any claim in a
dossier back to the specific evidence, extraction, and analyst review
that supports it.

## Digital signatures

PDF dossiers and evidence packages are digitally signed. The signature
proves:

- **Integrity** — the file hasn't been modified since generation
- **Authenticity** — the report was produced by the i4g platform
- **Timestamp** — when the report was generated

Recipients can verify signatures using the verification panel in the
Console or through standard PDF signature verification tools.

## What's in a dossier?

A typical PDF dossier contains:

- **Executive summary** — case overview, key findings, risk assessment
- **Threat entities** — extracted entities with confidence scores and
  linked case context
- **Taxonomy classification** — 5-axis fraud classification
- **Campaign links** — related cases and shared entity maps
- **Evidence summary** — referenced evidence with timestamps
- **Analyst notes** — annotations and observations from the review
- **Chain of custody** — full audit trail from intake to report

## What you'll see in the Console

- **Report Builder** — select a template and generate reports for cases
  or campaigns
- **Report Library** — browse and download previously generated reports
- **Dossier verification** — verify digital signatures on received
  dossiers

## Learn more

- [Reports & Dossiers](../analyst-guide/reports-and-dossiers.md) — using
  the Console to generate and manage reports
- [Working with Reports](../law-enforcement-guide/working-with-reports.md)
  — the law enforcement perspective on receiving reports
