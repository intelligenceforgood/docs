# How It Works

i4g turns raw fraud reports into linked, classified, and actionable
intelligence. This page walks you through the end-to-end flow — from the
moment a victim submits a report to the moment law enforcement receives a
signed dossier.

## The big picture

![How it works — end-to-end flow](../assets/diagrams/how-it-works.svg)

<!--
If the SVG is not yet available, the flow is:

  Report Submitted → Evidence Ingested → Entities Extracted →
  Cases Linked → Analyst Reviews → Intelligence Produced → Action Taken
-->

## Step by step

### 1. Report submitted

A victim or reporter fills out the intake form describing what happened —
freeform narrative, screenshots, chat logs, transaction receipts. The
platform creates a **case** and stores all evidence securely.

### 2. Evidence ingested

The ingestion pipeline processes every piece of evidence attached to the
case. Text is normalized, images are OCR'd, and structured data is parsed.
Everything is stored with a tamper-evident audit trail.

### 3. Entities extracted

The extraction pipeline scans all evidence for **threat entities** — wallet
addresses, email addresses, phone numbers, domains, URLs, bank accounts,
social handles, and more. Multiple detection methods (pattern matching, AI
analysis, machine learning) run in parallel to catch even obfuscated
contact details.

To learn more, see [How Entities Are Extracted](../key-concepts/entity-extraction.md).

### 4. Cases linked

When the same threat entity appears in multiple cases, the platform
automatically links them. A single Bitcoin wallet shared across five
reports connects five otherwise-isolated victims into a coherent picture.
Clusters of linked cases form **campaigns** — coordinated fraud operations
that span multiple victims, channels, and timeframes.

To learn more, see [Campaigns & Threat Networks](../key-concepts/campaigns.md).

### 5. Analyst reviews

Trained analysts review cases through the Console — the web-based analyst
workstation. They classify each case using the
[fraud taxonomy](../key-concepts/fraud-taxonomy.md) (intent, channel,
technique, requested action, claimed persona), assign risk scores, annotate
entities, and decide on next steps.

University engagement programs bring students into this process as part of
capstone projects, providing real-world cybersecurity experience while
scaling the platform's analytical capacity.

### 6. Intelligence produced

As cases are reviewed and classified, the platform aggregates results into
intelligence products:

- **Threat indicators** — vetted entities promoted to the Indicator Registry
  for sharing with partners
- **Risk scores** — entities scored by frequency, recency, and severity
- **Campaign profiles** — linked case clusters with shared entity maps
- **Analytics** — taxonomy trends, geographic heatmaps, timeline views

### 7. Action taken

Intelligence flows to those who can act on it:

| Output             | Recipient             | Purpose                             |
| ------------------ | --------------------- | ----------------------------------- |
| Signed PDF dossier | Law enforcement       | Case briefing with chain of custody |
| STIX 2.1 bundle    | Threat intel partners | Machine-readable indicator sharing  |
| CSV / XLSX export  | Analysts, partners    | Bulk indicator data for analysis    |
| eCrimeX submission | eCrimeX network       | Cross-platform threat sharing       |
| Partner feed       | Integrated partners   | Automated indicator delivery        |

## What happens behind the scenes

You don't need to understand the internals to use the platform, but here's
a quick summary of what powers each step:

- **Ingestion** runs as background jobs that process evidence automatically
- **Extraction** uses a multi-stage pipeline with confidence scoring and
  deduplication
- **Linking** is automatic — no manual case-matching required
- **Reports** are digitally signed for tamper-evidence and chain of custody

## Next steps

- [Find Your Role](find-your-role.md) — jump to the guide that matches you
- [Key Concepts](../key-concepts/README.md) — understand the core ideas
