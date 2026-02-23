# CLI Reference

The `ssi` command-line interface provides access to every SSI capability from the terminal. It is useful for admins running batch scans, scripted automation, and quick lookups.

For installation instructions, see the [SSI Developer Guide](https://github.com/intelligenceforgood/ssi/blob/main/docs/developer_guide.md).

## Command overview

```
ssi
├── investigate        Investigate suspicious URLs
│   ├── url            Single URL investigation
│   ├── batch          Batch investigation from file
│   ├── list           List past investigations
│   └── show           Show investigation detail
│
├── playbook           Manage playbooks
│   ├── list           List all playbooks
│   ├── show           Show playbook details
│   ├── validate       Validate playbook JSON
│   └── test-match     Test URL against patterns
│
├── wallet             Wallet extraction tools
│   ├── validate       Validate a wallet address
│   ├── scan           Scan text/file for wallets
│   ├── allowlist      Show token-network allowlist
│   ├── export         Export wallets to file
│   └── patterns       Show supported patterns
│
├── settings           Configuration management
│   ├── show           Display resolved settings
│   └── validate       Validate settings
│
└── --version          Show version
```

## investigate

### `ssi investigate url`

Run a single investigation.

```bash
ssi investigate url "<URL>" [OPTIONS]
```

| Flag                | Description                                | Default          |
| ------------------- | ------------------------------------------ | ---------------- |
| `--passive`         | Passive-only scan (no browser interaction) | `false`          |
| `--scan-type`       | Scan type: `passive`, `active`, `full`     | `full`           |
| `--format`          | Output format: `json`, `markdown`, `both`  | `json`           |
| `--output`          | Custom output directory                    | `data/evidence/` |
| `--skip-whois`      | Skip WHOIS lookup                          | `false`          |
| `--skip-screenshot` | Skip screenshot capture                    | `false`          |
| `--skip-virustotal` | Skip VirusTotal check                      | `false`          |
| `--skip-urlscan`    | Skip urlscan.io check                      | `false`          |
| `--push-to-core`    | Push results to i4g core API               | `false`          |
| `--trigger-dossier` | Trigger dossier generation after push      | `false`          |

Examples:

```bash
# Passive scan only
ssi investigate url "https://example.com" --passive

# Full investigation with both output formats
ssi investigate url "https://example.com" --format both

# Skip slow checks
ssi investigate url "https://example.com" --skip-whois --skip-virustotal

# Push results to core
ssi investigate url "https://example.com" --push-to-core --trigger-dossier
```

### `ssi investigate batch`

Investigate multiple URLs from a file.

```bash
ssi investigate batch <FILE> [OPTIONS]
```

| Flag            | Description                                                    | Default          |
| --------------- | -------------------------------------------------------------- | ---------------- |
| `--passive`     | Passive-only for all URLs                                      | `false`          |
| `--output`      | Output directory                                               | `data/evidence/` |
| `--concurrency` | Parallel investigations                                        | `1`              |
| `--events`      | Emit JSONL events to stdout                                    | `false`          |
| `--resume`      | Skip already-completed URLs                                    | `false`          |
| `--format`      | Input format: `text` (one URL per line) or `json` (structured) | auto-detect      |

Examples:

```bash
# Basic batch
ssi investigate batch urls.txt

# Parallel with event streaming
ssi investigate batch urls.txt --concurrency 3 --events > events.jsonl

# Resume interrupted batch
ssi investigate batch urls.txt --output ./results --resume
```

### `ssi investigate list`

List past investigations from the database.

```bash
ssi investigate list
```

### `ssi investigate show`

Display detail for a specific investigation.

```bash
ssi investigate show <SCAN_ID>
```

## playbook

### `ssi playbook list`

```bash
ssi playbook list [--json] [--dir PATH]
```

### `ssi playbook show`

```bash
ssi playbook show <PLAYBOOK_ID> [--json] [--dir PATH]
```

### `ssi playbook validate`

```bash
ssi playbook validate <PATH>
```

Validates JSON schema, template variables, and URL patterns.

### `ssi playbook test-match`

```bash
ssi playbook test-match "<URL>" [--dir PATH]
```

Reports which playbook matches the URL.

## wallet

### `ssi wallet validate`

```bash
ssi wallet validate "<ADDRESS>"
```

Validates a wallet address and identifies the token/network.

### `ssi wallet scan`

```bash
ssi wallet scan <SOURCE> [--json]
```

Scans a text file or raw content for wallet addresses.

### `ssi wallet allowlist`

```bash
ssi wallet allowlist [--json] [--symbol SYMBOL] [--path PATH]
```

Displays the token-network allowlist. Filter by symbol or use a custom allowlist file.

### `ssi wallet export`

```bash
ssi wallet export <FILE> [--format FORMAT] [--output PATH] [--filter/--no-filter]
```

Export wallets from an investigation JSON file to XLSX (default), CSV, or JSON.

### `ssi wallet patterns`

```bash
ssi wallet patterns
```

Lists every supported token network and its detection regex.

## settings

### `ssi settings show`

```bash
ssi settings show
```

Displays the fully resolved configuration (after merging defaults, env-specific files, local overrides, and environment variables).

### `ssi settings validate`

```bash
ssi settings validate
```

Checks that settings are valid and required services are reachable.
