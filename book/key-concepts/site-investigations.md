# Site Investigations

The Scam Site Investigator (SSI) automates the analysis of suspicious
websites — from quick infrastructure checks to full AI-driven
investigations that navigate scam funnels, fill fake forms, and extract
cryptocurrency wallet addresses.

## What SSI does

When an analyst submits a suspicious URL, SSI investigates the site and
returns a structured intelligence package: infrastructure data, risk
assessment, fraud classification, discovered wallet addresses, and a
complete evidence trail.

## Three levels of investigation

SSI supports three scan types, each building on the previous:

![SSI investigation flow](../assets/diagrams/ssi-investigation-flow.svg)

<!--
Flow diagram:
URL → Passive Recon → AI Agent → Wallet Extraction → Evidence Package
-->

| Scan type   | What happens                                    | Duration | Site interaction |
| ----------- | ----------------------------------------------- | -------- | ---------------- |
| **Passive** | Infrastructure recon only — no site interaction | 30–60 s  | None             |
| **Active**  | Passive + AI agent navigates the site           | 2–5 min  | Yes (synthetic)  |
| **Full**    | Active + wallet extraction + classification     | 3–7 min  | Yes (synthetic)  |

### Passive recon

Collects intelligence without touching the target site:

- **WHOIS** — domain registration, registrar, creation date
- **DNS records** — hosting infrastructure (A, MX, NS, TXT)
- **SSL certificate** — issuer, validity, self-signed detection
- **IP geolocation** — hosting country, ASN, organization
- **Screenshot** — full-page render of the site
- **Reputation checks** — VirusTotal and urlscan.io results

### AI agent investigation

After passive recon, an AI agent opens the site in a browser and
investigates it like a human would:

1. **Generates a synthetic identity** — a realistic but provably fake
   person (test SSN range, Stripe test credit cards)
2. **Navigates the scam funnel** — reads pages, fills forms, clicks
   buttons, follows redirects through the entire user journey
3. **Records PII exposure** — tracks which personal data fields the site
   asks for at each step
4. **Takes screenshots** — captures every page the agent visits
5. **Classifies the scam** — applies the
   [fraud taxonomy](fraud-taxonomy.md) with a risk score (0–100)

The agent uses a decision cascade: playbook rules → DOM pattern detection
→ LLM text analysis → LLM vision analysis. Most routine pages resolve
without an LLM call, keeping investigations fast and cost-efficient.

### Wallet extraction

During full scans, the agent discovers cryptocurrency wallet addresses
displayed on deposit or payment pages. Discovered wallets are extracted
as threat entities and can be promoted to
[threat indicators](indicators.md).

## Risk scoring

The investigation produces a risk score (0–100) combining passive and
active signals:

| Range  | Risk level | Meaning                                    |
| ------ | ---------- | ------------------------------------------ |
| 0–29   | Low        | Likely legitimate or insufficient data     |
| 30–59  | Medium     | Some suspicious indicators — review needed |
| 60–79  | High       | Multiple scam indicators present           |
| 80–100 | Critical   | Strong evidence of fraud                   |

## Evidence package

Every investigation produces a structured evidence package:

- Human-readable report (PDF or Markdown)
- STIX 2.1 threat intelligence bundle
- Full-page screenshots at every step
- HAR network recording
- DOM snapshots
- Wallet extraction results

All artifacts are timestamped and can be pushed to I4G core to create a
case and store indicators.

## What you'll see in the Console

- **SSI Investigate** — submit a URL and select scan type
- **Investigation list** — browse past investigations with status and
  risk badges
- **Investigation detail** — Recon tab (WHOIS, DNS, SSL), Results tab
  (risk score, wallets, classification), Live Monitor (watch the agent
  work in real time)
- **Wallets page** — browse all discovered cryptocurrency addresses

## Learn more

- [Investigating Sites](../analyst-guide/investigating-sites.md) — using
  the Console to run site investigations
- [Fraud Taxonomy](fraud-taxonomy.md) — how scam classifications work

## References

1. [SSI Technical Design](https://github.com/intelligenceforgood/ssi/blob/main/docs/tdd.md)
   — detailed SSI architecture and agent decision model.
