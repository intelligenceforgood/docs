# Law Enforcement Guide

The i4g program delivers digitally signed, evidence-rich reports that streamline intake for law enforcement agencies. Analysts assemble and verify dossiers; this guide explains how recipients can interpret reports, verify authenticity, and request additional data.

<img src="../assets/screenshots/leo-report-placeholder.svg" alt="Law enforcement report placeholder" title="Law enforcement report" />
> Placeholder: replace with a screenshot of the PDF report viewer highlighting key sections (timeline, entity table, evidence manifest).

## Report Contents

Each report follows a standardized template derived from the production PRD:

1. **Cover Sheet** – Case ID, user alias, generating analyst, timestamp, digital signature hash.
2. **Executive Summary** – One-page narrative of the scam, financial impact, and recommended next steps.
3. **Timeline** – Chronological sequence of critical messages, transactions, and interventions.
4. **Entity Overview** – Table of extracted entities (wallets, emails, phone numbers) with confidence scores.
5. **Evidence Manifest** – Links to redacted artifacts; full-resolution files stored in secure object storage.
6. **Appendices** – Risk flags, related cases, references to applicable criminal statutes.

## Authenticity & Chain of Custody

* Reports include a SHA-256 signature generated at export time. Verify using the hash listed on the cover sheet and the `.signatures.json` provided by the analyst.
* Each evidence file contains embedded metadata referencing the case ID and export timestamp.
* Access to raw PII or unredacted media requires a subpoena or mutual aid agreement. Contact `leo@intelligenceforgood.org` with the Case ID.

## Requesting Additional Information

1. Email the liaison (above) from an official domain with subject line `Case <ID> – Additional Evidence Request`.
2. Specify the exact materials required (e.g., original chat logs, tokenized PII rehydration, crypto transaction traces).
3. Attach the signed request form or subpoena when applicable.
4. Expect a response within 2 business days. Urgent cases should also trigger the secure hotline.

## Feedback Loop

Your feedback helps improve the system:

* Report sections that require more detail or different formatting.
* Additional entities or metrics that would support your investigative process.
* Outcomes (arrests, funds recovered) tied to i4g reporting.

## Data Handling Expectations

* Treat all shared artifacts as confidential and for official use only.
* Do not forward reports to third parties without consent from Intelligence for Good or the user.
* Notify the liaison immediately if you detect compromised credentials, phishing attempts, or other operational risks involving the shared data.

i4g is a volunteer-led nonprofit initiative. We appreciate your partnership in bringing scammers to justice and protecting vulnerable communities.
