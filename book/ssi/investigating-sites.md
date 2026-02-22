# Investigating Sites

SSI supports three scan types. Each builds on the previous one, collecting progressively more intelligence.

| Scan type   | What happens                                                          | Duration | Risk to target           |
| ----------- | --------------------------------------------------------------------- | -------- | ------------------------ |
| **Passive** | OSINT enrichment only — no browser interaction                        | 30–60 s  | None                     |
| **Active**  | Passive + AI agent interacts with the site (form filling, navigation) | 2–5 min  | Low (uses synthetic PII) |
| **Full**    | Active + wallet extraction + classification                           | 3–7 min  | Low                      |

## Passive scan

A passive scan collects infrastructure intelligence without touching the target site.

### What it collects

1. **WHOIS** — domain registrar, creation/expiration dates, registrant info, nameservers.
2. **DNS** — A, MX, NS, TXT records revealing the hosting infrastructure.
3. **SSL/TLS certificate** — issuer, validity period, self-signed detection.
4. **IP geolocation** — hosting country, city, ASN, organization.
5. **Full-page screenshot** — rendered via headless Chromium.
6. **DOM snapshot** — the page's complete HTML structure.
7. **HAR recording** — every network request the page makes.
8. **Form field inventory** — every input the site presents (name, email, credit card, etc.).
9. **VirusTotal check** — how many security engines flag the URL (requires API key).
10. **urlscan.io** — page analysis, contacted domains, and reputation data.

### From the Console

1. Navigate to **SSI → Investigate**.
2. Paste the URL and select **Passive** scan type.
3. Click **Investigate**.
4. Results appear on the investigation detail page with a Recon tab showing WHOIS, DNS, SSL, and GeoIP cards.

### From the CLI

```bash
ssi investigate url "https://suspicious-site.example" --passive
```

Skip individual checks if they time out or you lack API keys:

```bash
ssi investigate url "https://suspicious-site.example" --passive \
  --skip-whois --skip-virustotal
```

## Full investigation (AI agent)

Without the `--passive` flag, SSI runs the passive scan first, then launches the AI agent.

### How the agent works

1. **Generates a synthetic identity** — a realistic but provably fake person with name, address, email, phone, SSN, credit card. SSNs use the IRS 900–999 invalid range; credit cards use Stripe test BINs.

2. **Navigates the scam funnel** — the agent opens the site in Chromium and reasons about each page:
   - Reads page content and identifies interactive elements.
   - Decides which forms to fill and which buttons to click.
   - Types in synthetic PII from the generated identity.
   - Follows redirects through login → details → payment → confirmation pages.
   - Takes a screenshot at every step.

3. **Records PII exposure** — tracks exactly which personal data fields the site asked for and at which step.

4. **Classifies the scam** — applies the i4g fraud taxonomy (intent, channel, techniques, actions, persona) with a risk score from 0–100.

5. **Extracts wallets** — discovers cryptocurrency addresses displayed on deposit or payment pages (see [Wallet Extraction](wallet-extraction.md)).

### Decision cascade

The agent uses a four-tier decision process at each step:

1. **Playbook** — if a matching playbook exists for the URL pattern, follow its predefined steps.
2. **DOM Inspector** — heuristic detectors identify common patterns (registration forms, deposit pages, email verification prompts) without calling the LLM.
3. **LLM text analysis** — the LLM reads the page content and decides the next action.
4. **LLM vision analysis** — if text analysis is inconclusive, the LLM examines a screenshot for visual cues.

This cascade reduces cost and latency — most routine pages resolve at tier 1 or 2 without an LLM call.

### From the Console

1. Navigate to **SSI → Investigate**.
2. Paste the URL and select **Active** or **Full** scan type.
3. Click **Investigate**.
4. Switch to the **Live Monitor** tab to watch the agent work in real time (see [Live Monitoring](live-monitoring.md)).
5. When complete, the **Results** tab shows the risk score, wallet table, PII exposure summary, and evidence downloads.

### From the CLI

```bash
# Full investigation (passive + active + wallet extraction)
ssi investigate url "https://suspicious-site.example"

# Active only (skip wallet extraction)
ssi investigate url "https://suspicious-site.example" --scan-type active

# Choose output format
ssi investigate url "https://suspicious-site.example" --format both
```

## Interpreting results

### Key findings to look for

| Finding                                            | What it means                                   |
| -------------------------------------------------- | ----------------------------------------------- |
| Domain created days/weeks ago                      | Scam sites are typically short-lived            |
| WHOIS data is privacy-protected or missing         | Common for sites hiding ownership               |
| Self-signed or recently issued SSL cert            | Legitimate businesses use established CAs       |
| Hosted in unexpected country for the claimed brand | e.g., "Etsy" hosted in Russia or China          |
| Form asks for SSN, credit card, or bank details    | Red flags for a shopping/brand site             |
| VirusTotal detections > 0                          | Security engines have already flagged it        |
| External scripts from suspicious domains           | May indicate phishing kits or data exfiltration |
| Cryptocurrency wallet addresses found              | Strong indicator of crypto scam                 |
| Multiple pages collecting escalating PII           | Scam funnel designed to harvest personal data   |

### Risk score

The risk score (0–100) is computed from passive and active signals combined:

- **0–29**: Low risk — likely legitimate or insufficient data.
- **30–59**: Medium risk — some suspicious indicators. Manual review recommended.
- **60–79**: High risk — multiple scam indicators present.
- **80–100**: Critical — strong evidence of fraud.

### Fraud classification

The five-axis taxonomy classifies the scam across:

- **Intent** — what the scammer is trying to achieve.
- **Channel** — how they reach victims (website, social media, messaging).
- **Techniques** — deception methods used (impersonation, urgency, fake endorsements).
- **Actions** — what the victim is asked to do (enter PII, send crypto, install software).
- **Persona** — who the scammer pretends to be (bank, exchange, romantic interest).

## Push results to i4g core

If you have the i4g core API running, push investigation results to create a case:

### From the Console

Enable **Push to Core** in the investigation submission form before clicking Investigate.

### From the CLI

```bash
ssi investigate url "https://suspicious-site.example" \
  --push-to-core --trigger-dossier
```

This creates a case in core, stores wallet addresses as indicators, domains and IPs as entities, and evidence files as source documents.

## Recommended workflow

```bash
# 1. Quick passive scan to assess the target
ssi investigate url "<URL>" --passive --format both

# 2. Review the LEO report
cat data/evidence/<ID>/leo_evidence_report.md

# 3. If suspicious, run a full investigation
ssi investigate url "<URL>" --format both

# 4. Review the complete evidence package
ls data/evidence/<ID>/
```
