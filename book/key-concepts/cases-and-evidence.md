# Cases & Evidence

A **case** is a single fraud report submitted to the platform — the atomic
unit of everything i4g does. Every analysis, entity extraction, campaign
link, and intelligence product traces back to one or more cases.

## What is a case?

When someone reports a scam, the platform creates a case containing:

- **Narrative** — the victim's description of what happened
- **Evidence** — chat logs, screenshots, receipts, voice notes, blockchain
  records, or any other files the reporter attaches
- **Metadata** — submission date, reporter info (encrypted), country, and
  language

A case is always one report from one reporter. If two victims report the
same scammer, those are two separate cases that the platform links through
shared [entities](entities.md).

## Case lifecycle

Every case moves through a defined sequence of stages:

![Case lifecycle flowchart](../assets/diagrams/case-lifecycle.svg)

<!--
Submitted → Queued → Under Review → Classified → Closed
-->

| Stage            | What happens                                                  |
| ---------------- | ------------------------------------------------------------- |
| **Submitted**    | The report arrives and evidence is uploaded.                  |
| **Queued**       | Ingestion is complete — the case is ready for analyst review. |
| **Under Review** | An analyst is actively reviewing the case.                    |
| **Classified**   | The analyst has assigned a fraud taxonomy classification.     |
| **Closed**       | All actions are complete — the case is resolved.              |

## Evidence types

The platform accepts a wide range of evidence formats:

| Category          | Examples                                           |
| ----------------- | -------------------------------------------------- |
| **Text**          | Chat transcripts, email threads, SMS conversations |
| **Images**        | Screenshots, photos of documents, QR codes         |
| **Documents**     | PDF receipts, bank statements, contracts           |
| **Financial**     | Transaction records, blockchain transaction hashes |
| **Audio / Video** | Voice notes, screen recordings                     |

All evidence is processed through the ingestion pipeline — text is
normalized, images are OCR'd, and structured data is parsed automatically.

## PII protection

Cases contain sensitive personal information. The platform protects it at
every layer:

- **Encryption at rest** — all evidence and PII fields are encrypted in
  storage
- **Role-based access** — researchers see anonymized data; only analysts
  and above see full values
- **Audit trail** — every access to case data is logged

Victim contact information is stored separately from case evidence and is
only decrypted under controlled access policies.

## How cases connect to everything else

Cases are the foundation of the intelligence cycle:

- **Entities** are extracted from case evidence →
  see [Entities](entities.md)
- Cases sharing entities form **campaigns** →
  see [Campaigns](campaigns.md)
- Analysts classify cases using the **fraud taxonomy** →
  see [Fraud Taxonomy](fraud-taxonomy.md)
- Cases drive **reports and dossiers** →
  see [Dossiers & Reports](dossiers-and-reports.md)

## What you'll see in the Console

- **Cases list** — browse and filter all cases in your queue
- **Case detail** — view the narrative, evidence timeline, extracted
  entities, taxonomy classification, and analyst actions
- **Status badges** — color-coded lifecycle stage on every case card

## Learn more

- [How Entities Are Extracted](entity-extraction.md) — how the platform
  finds threat entities in case evidence
- [Reviewing Cases](../analyst-guide/reviewing-cases.md) — the analyst
  workflow for reviewing and classifying cases
