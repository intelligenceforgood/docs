# Playbooks

Playbooks are predefined step sequences for known scam-site templates. When SSI recognizes a URL pattern, it follows the playbook instead of relying on LLM reasoning — this is faster, cheaper, and more reliable for sites with predictable layouts.

## How playbooks work

1. **URL matching** — before the AI agent starts, the `PlaybookMatcher` tests the target URL against every playbook's regex patterns.
2. **Step execution** — if a match is found, the `PlaybookExecutor` runs each step sequentially: click a button, fill a form field, wait for a page load, extract wallets, etc.
3. **Variable resolution** — step values like `{identity.email}` or `{identity.password}` are replaced with data from the generated synthetic identity.
4. **Retry logic** — each step has a configurable retry count. If retries are exhausted, the playbook falls back to the LLM agent for that step.
5. **Fallback** — if the entire playbook fails (site layout changed), SSI seamlessly switches to full LLM-driven investigation.

## Viewing playbooks in the Console

Playbook management is CLI-first. The Console does not yet have a playbook editor, but investigation detail pages show which playbook was used (if any) and whether it succeeded or fell back to the agent.

## CLI playbook commands

### List available playbooks

```bash
ssi playbook list

# JSON output
ssi playbook list --json

# From a custom directory
ssi playbook list --dir ./my-playbooks
```

### Show playbook details

```bash
ssi playbook show <playbook-id>

# JSON output for programmatic use
ssi playbook show <playbook-id> --json
```

### Validate a playbook file

```bash
ssi playbook validate path/to/playbook.json
```

Checks the JSON schema, verifies all template variables are resolvable, and reports errors.

### Test URL matching

```bash
ssi playbook test-match "https://suspicious-site.example/register"
```

Reports which playbook (if any) matches the URL, along with the match confidence.

> For playbook JSON schema details, step actions, template variables, and how to write new playbooks, see the [Playbook Authoring Guide](https://github.com/intelligenceforgood/ssi/blob/main/docs/playbook_authoring.md) in the developer docs.
