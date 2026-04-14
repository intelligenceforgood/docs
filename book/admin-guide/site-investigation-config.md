# Site Investigation Settings

The Site Investigation (SSI) system can be configured through the Console
to control scan behavior, domain filtering, and investigation defaults.

## Scan Type Defaults

Administrators can set the default scan type for new investigations:

| Scan type   | What it does                                              |
| ----------- | --------------------------------------------------------- |
| **Passive** | Infrastructure recon only — no interaction with the site. |
| **Active**  | Passive + AI agent navigates the site.                    |
| **Full**    | Active + wallet extraction + fraud classification.        |

Analysts can override the default when submitting an individual
investigation. See
[Investigating Sites](../analyst-guide/investigating-sites.md) for the
analyst perspective.

## Domain Blocklist

The domain blocklist prevents the platform from investigating known
legitimate domains (Google, Facebook, YouTube, etc.). It comes with a
built-in default list, and you can add domain-specific entries.

### How blocking works

- Blocking `google.com` also blocks `mail.google.com` and
  `docs.google.com` (subdomain matching is automatic).
- It does **not** block `notgoogle.com`.
- The blocklist applies to [auto-investigation](auto-investigation.md)
  only. Analysts can still manually investigate a blocked domain from the
  case detail page.

### Managing the blocklist

From the Console's SSI settings page, you can:

- View the current blocklist (built-in + custom entries).
- Add domains — enter the root domain (e.g. `mycompany.com`).
- Remove custom entries. Built-in defaults cannot be removed.

## Concurrency Limits

Control how many SSI investigations run simultaneously. Higher concurrency
processes the queue faster but uses more resources. The default is 3
concurrent investigations.

## Staleness Window

The staleness window determines when a previously scanned URL is eligible
for re-investigation. A URL scanned within the staleness window reuses
the existing results instead of triggering a new scan.

| Setting              | Default | What it controls                                      |
| -------------------- | ------- | ----------------------------------------------------- |
| **Staleness (days)** | 30      | URLs scanned within this window skip re-investigation |

## Learn more

- [Investigating Sites](../analyst-guide/investigating-sites.md) — the
  analyst investigation workflow
- [Auto-Investigation](auto-investigation.md) — automatic URL investigation
- [Site Investigations](../key-concepts/site-investigations.md) — how SSI
  works conceptually
