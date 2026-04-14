# How It Works

I4G processes fraud reports through a seven-stage pipeline: intake →
ingestion → extraction → linking → review → intelligence production →
action.

## Pipeline overview

![How it works — end-to-end flow](../assets/diagrams/how-it-works.svg)

## Pipeline stages

{% hint style="info" %}
Steps 1–4 are fully automatic. Human review begins at step 5.
{% endhint %}

### 1. Report submitted

A victim or reporter submits a narrative description with supporting
evidence — screenshots, chat logs, transaction receipts. The platform
creates a case and stores all evidence.

### 2. Evidence ingested

The ingestion pipeline processes each piece of evidence. Text is
normalized, images are OCR'd, and structured data is parsed. All
operations are recorded in a tamper-evident audit trail.

### 3. Entities extracted

The extraction pipeline identifies threat entities — wallet addresses,
email addresses, phone numbers, domains, URLs, bank accounts, and social
handles. Multiple detection methods (pattern matching, NLP, ML) run in
parallel to catch obfuscated values.

See [How Entities Are Extracted](../key-concepts/entity-extraction.md).

### 4. Cases linked

When the same entity appears in multiple cases, the platform links them
automatically. Clusters of linked cases form
[campaigns](../key-concepts/campaigns.md) — coordinated fraud operations
spanning multiple victims and channels.

### 5. Analyst review

Analysts classify cases using the
[fraud taxonomy](../key-concepts/fraud-taxonomy.md) (intent, channel,
technique, requested action, claimed persona), assign risk scores, and
annotate entities. University engagement programs bring students into this
process through structured capstone projects.

### 6. Intelligence produced

| Product               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| **Threat indicators** | Vetted entities promoted to the Indicator Registry   |
| **Risk scores**       | Entities scored by frequency, recency, and severity  |
| **Campaign profiles** | Linked case clusters with shared entity maps         |
| **Analytics**         | Taxonomy trends, geographic heatmaps, timeline views |

### 7. Action taken

| Output             | Recipient             | Purpose                             |
| ------------------ | --------------------- | ----------------------------------- |
| Signed PDF dossier | Law enforcement       | Case briefing with chain of custody |
| STIX 2.1 bundle    | Threat intel partners | Machine-readable indicator sharing  |
| CSV / XLSX export  | Analysts, partners    | Bulk indicator data for analysis    |
| eCrimeX submission | eCrimeX network       | Cross-platform threat sharing       |
| Partner feed       | Integrated partners   | Automated indicator delivery        |

## Next steps

- [Find Your Role](find-your-role.md) — jump to your guide
- [Key Concepts](../key-concepts/README.md) — platform terminology
