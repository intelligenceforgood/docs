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

## Playbook JSON format

Playbooks are JSON files stored in `config/playbooks/`. Each file defines:

```json
{
  "playbook_id": "fake_exchange_register",
  "description": "Handles registration on clone exchange sites that mimic Binance/Coinbase.",
  "url_pattern": "^https?://(www\\.)?fake-exchange\\.(com|net|org)",
  "version": "1.0",
  "fallback_to_llm": true,
  "max_duration_sec": 120,
  "tags": ["crypto", "exchange"],
  "steps": [
    {
      "action": "click",
      "selector": "text:Register",
      "description": "Click the Register button",
      "retry_on_failure": 2
    },
    {
      "action": "type",
      "selector": "input[name='email']",
      "value": "{identity.email}",
      "description": "Enter email address"
    },
    {
      "action": "type",
      "selector": "input[name='password']",
      "value": "{identity.password}",
      "description": "Enter password"
    },
    {
      "action": "click",
      "selector": "button[type='submit']",
      "description": "Submit registration form",
      "retry_on_failure": 3
    },
    {
      "action": "wait",
      "value": "2000",
      "description": "Wait for redirect to deposit page"
    },
    {
      "action": "extract",
      "description": "Extract wallet addresses from deposit page"
    }
  ]
}
```

### Step fields

| Field              | Type   | Default | Description                                                  |
| ------------------ | ------ | ------- | ------------------------------------------------------------ |
| `action`           | string | —       | Step type (see table below). **Required.**                   |
| `selector`         | string | `""`    | CSS selector or `text:` prefix for element targeting.        |
| `value`            | string | `""`    | Input value, URL, or wait duration. Supports `{identity.*}`. |
| `description`      | string | `""`    | Human-readable step description.                             |
| `retry_on_failure` | int    | `0`     | Retry this step N times (0–10) before considering it failed. |
| `fallback_to_llm`  | bool   | `true`  | Hand off to LLM vision agent if step fails after retries.    |

### Step actions

| Action     | Required fields     | Description                                                      |
| ---------- | ------------------- | ---------------------------------------------------------------- |
| `click`    | `selector`          | Click an element (CSS selector or `text:` prefix for text match) |
| `type`     | `selector`, `value` | Type into a form field. Value supports `{identity.*}` variables. |
| `select`   | `selector`, `value` | Select an option from a dropdown.                                |
| `navigate` | `value`             | Navigate to a specific URL (passed in `value`).                  |
| `wait`     | `value`             | Pause for a duration in milliseconds (passed in `value`).        |
| `scroll`   | `selector`          | Scroll an element or the page.                                   |
| `extract`  | —                   | Run wallet extraction on the current page.                       |

### Template variables

| Variable                     | Resolves to                      |
| ---------------------------- | -------------------------------- |
| `{identity.email}`           | Generated email address          |
| `{identity.password}`        | Generated password               |
| `{identity.first_name}`      | First name                       |
| `{identity.last_name}`       | Last name                        |
| `{identity.full_name}`       | Full name                        |
| `{identity.phone}`           | Phone number                     |
| `{identity.ssn}`             | SSN (IRS 900–999 invalid range)  |
| `{identity.address}`         | Street address                   |
| `{identity.city}`            | City                             |
| `{identity.state}`           | State                            |
| `{identity.zip}`             | ZIP code                         |
| `{identity.dob}`             | Date of birth                    |
| `{identity.crypto_username}` | Generated crypto-themed username |
| `{identity.cc_number}`       | Stripe test credit card number   |

## API endpoints

| Method   | Path                    | Description                              |
| -------- | ----------------------- | ---------------------------------------- |
| `GET`    | `/playbooks`            | List all playbooks                       |
| `GET`    | `/playbooks/{id}`       | Get playbook details                     |
| `POST`   | `/playbooks`            | Create a new playbook                    |
| `PUT`    | `/playbooks/{id}`       | Update an existing playbook              |
| `DELETE` | `/playbooks/{id}`       | Delete a playbook                        |
| `POST`   | `/playbooks/test-match` | Test a URL against all playbook patterns |

## Writing a new playbook

1. Identify a scam-site template that SSI encounters frequently.
2. Manually walk through the site to map the registration/deposit funnel.
3. Create a JSON file in `config/playbooks/` following the format above.
4. Validate it: `ssi playbook validate config/playbooks/my-playbook.json`.
5. Test the URL match: `ssi playbook test-match "https://target-site.example"`.
6. Run a full investigation against the site and verify the playbook executes correctly.

> **Tip**: Start with broad URL patterns and narrow them if false positives occur. The playbook matcher checks patterns in order and uses the first match.
