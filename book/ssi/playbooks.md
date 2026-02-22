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
  "id": "fake-exchange-register",
  "name": "Fake Crypto Exchange — Registration Flow",
  "description": "Handles registration on clone exchange sites that mimic Binance/Coinbase.",
  "version": "1.0.0",
  "url_patterns": [
    "^https?://(www\\.)?fake-exchange\\.(com|net|org)",
    "^https?://.*\\.exchange-clone\\.\\w+"
  ],
  "steps": [
    {
      "action": "click",
      "target": "text:Register",
      "description": "Click the Register button",
      "retry": 2
    },
    {
      "action": "type",
      "target": "input[name='email']",
      "value": "{identity.email}",
      "description": "Enter email address"
    },
    {
      "action": "type",
      "target": "input[name='password']",
      "value": "{identity.password}",
      "description": "Enter password"
    },
    {
      "action": "click",
      "target": "button[type='submit']",
      "description": "Submit registration form",
      "retry": 3
    },
    {
      "action": "wait",
      "duration_ms": 2000,
      "description": "Wait for redirect to deposit page"
    },
    {
      "action": "extract_wallets",
      "description": "Extract wallet addresses from deposit page"
    }
  ]
}
```

### Step actions

| Action            | Required fields   | Description                                                      |
| ----------------- | ----------------- | ---------------------------------------------------------------- |
| `click`           | `target`          | Click an element (CSS selector or `text:` prefix for text match) |
| `type`            | `target`, `value` | Type into a form field. Value supports `{identity.*}` variables. |
| `wait`            | `duration_ms`     | Pause for a fixed duration                                       |
| `goto`            | `url`             | Navigate to a specific URL                                       |
| `screenshot`      | —                 | Capture a screenshot at this point                               |
| `extract_wallets` | —                 | Run wallet extraction on the current page                        |
| `scroll`          | `direction`       | Scroll up or down                                                |

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
