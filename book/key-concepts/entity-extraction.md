# How Entities Are Extracted

Entity extraction is how the platform turns messy, freeform scam reports
into structured, linkable intelligence. Every piece of evidence submitted
with a case goes through a multi-stage pipeline that finds threat entities
— even when scammers deliberately disguise them.

## The pipeline at a glance

![Extraction pipeline](../assets/diagrams/extraction-pipeline.svg)

<!--
Simplified 6-box flow:
Source Text → Normalize → Detect (Regex + AI + ML) → Merge & Score →
Filter → Result
-->

### 1. Normalize

Raw evidence arrives in many forms — chat transcripts with emoji, OCR'd
screenshots with typos, email threads with headers. The normalization step
cleans the text: standardizes encoding, strips formatting noise, and
prepares it for analysis.

### 2. Detect

Three detection methods run in parallel and cross-check each other:

| Method               | How it works                             | Strengths                          |
| -------------------- | ---------------------------------------- | ---------------------------------- |
| **Pattern matching** | Regex rules for known entity formats     | Fast, precise for standard formats |
| **AI analysis**      | Large language model identifies entities | Handles context and obfuscation    |
| **Machine learning** | Trained NER models classify text spans   | Good at names, orgs, locations     |

Running multiple methods in parallel means the system catches entities that
any single approach would miss. A regex catches a standard Bitcoin address;
the AI catches a deliberately spaced-out email; the ML model catches a
person name.

### 3. Merge & Score

When multiple detectors find the same entity, their results are merged.
The system assigns a **confidence score** (0.0 – 1.0) based on:

- How many detectors agreed
- How well the value matches known formats
- Whether the entity was seen in other cases

Higher confidence means more reliable extraction. Entities with very low
confidence are flagged for review rather than discarded.

### 4. Filter

Before results are finalized, the pipeline applies filters:

- **Blocklist** — known false positives (test email addresses, placeholder
  phone numbers, example domains) are removed
- **Deduplication** — the same entity appearing multiple times in one case
  is consolidated into a single record
- **Validation** — format checks confirm that wallet addresses are valid,
  phone numbers have reasonable structure, etc.

### 5. Result

The final set of extracted entities is attached to the case with full
provenance — which detector found each entity, the confidence score, and
the exact text span in the evidence where it was found. This creates a
complete audit trail for every extraction decision.

## Handling obfuscation

Scammers know their contact details get flagged, so they disguise them:

| Obfuscation technique      | Example                       | What the platform sees |
| -------------------------- | ----------------------------- | ---------------------- |
| Spaced characters          | `j o h n @ g m a i l . c o m` | `john@gmail.com`       |
| Word substitution          | `john at gmail dot com`       | `john@gmail.com`       |
| Zero-width characters      | `john​@​gmail​.​com`          | `john@gmail.com`       |
| Mixed scripts              | `jоhn@gmail.com` (Cyrillic о) | `john@gmail.com`       |
| Number/letter substitution | `j0hn@gma1l.c0m`              | `john@gmail.com`       |

The normalization and AI detection stages work together to reverse these
techniques. The pipeline doesn't just match patterns — it understands what
scammers are trying to hide.

## Audit trail

Every extraction decision is recorded:

- Which detector found the entity
- The confidence score and how it was computed
- The exact text location in the source evidence
- Whether the entity was merged, filtered, or promoted

This means analysts can always trace back to _why_ the platform flagged
a particular entity, and auditors can verify that the extraction process
is working correctly.

## What you'll see in the Console

When you open a case, the **Entities** tab shows all extracted entities
with their type badges, confidence scores, and source spans. You can click
any entity to see its full detail and linked cases.

## References

1. [Entity Extraction Technical Design](https://github.com/intelligenceforgood/core/blob/main/docs/design/entity_extraction_tdd.md)
   — detailed pipeline architecture and merge algorithm.
