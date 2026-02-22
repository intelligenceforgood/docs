# Wallet Extraction

SSI automatically discovers cryptocurrency wallet addresses displayed on scam sites — deposit pages, payment instructions, withdrawal confirmations, and coin tab interfaces. Extracted wallets link investigations to on-chain activity and provide actionable threat indicators.

## How it works

Wallet extraction runs in three stages:

1. **Regex detection** — pattern-based matching for 20+ token networks (ETH, BTC, TRX, SOL, XRP, ADA, DOGE, LTC, and more). Patterns are tuned to each network's address format and length.
2. **LLM verification** — a language model confirms each candidate address, identifies the token symbol and network, and filters out false positives (base64 strings, CSS classes, etc.).
3. **Allowlist filtering** — validated addresses are checked against a configurable token-network allowlist (`config/wallet_allowlist.json`) that defines the 26+ supported token-network pairs.

### When extraction runs

- **During active investigation** — the agent checks every page transition for wallet addresses, including coin tab discovery (clicking BTC/ETH/TRX buttons to reveal deposit addresses).
- **EXTRACT_WALLETS state** — a dedicated agent state performs a final sweep of all loaded content.
- **Standalone CLI scan** — extract wallets from any text file or raw content without running a full investigation.

## Viewing wallets in the Console

### Investigation detail

Open any completed investigation and switch to the **Results** tab. The wallet table shows:

| Column     | Description                                        |
| ---------- | -------------------------------------------------- |
| Address    | The wallet address (truncated with copy button)    |
| Token      | Token symbol (e.g., BTC, ETH, USDT)                |
| Network    | Blockchain network (e.g., Ethereum, Tron, Bitcoin) |
| Confidence | Extraction confidence (high / medium / low)        |
| Source     | Where on the page the address was found            |

### Wallet search (cross-investigation)

Navigate to **SSI → Wallets** to search wallet addresses across all investigations. Filter by token, network, or address substring. This view helps identify the same wallet appearing across multiple scam sites — a strong signal of linked campaigns.

## CLI wallet commands

The `ssi wallet` command group provides standalone wallet tools:

### Validate an address

```bash
ssi wallet validate "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18"
```

Output:

```
✅ Valid ETH address
   Token: ETH
   Network: Ethereum
```

### Scan text for wallets

```bash
# Scan a file
ssi wallet scan page_content.txt

# Scan with JSON output
ssi wallet scan page_content.txt --json
```

### View supported patterns

```bash
ssi wallet patterns
```

Lists every token network and its regex pattern.

### View the allowlist

```bash
# Full allowlist
ssi wallet allowlist

# Filter by symbol
ssi wallet allowlist --symbol BTC

# JSON output
ssi wallet allowlist --json
```

### Export wallets

Export wallet data from an investigation to XLSX, CSV, or JSON:

```bash
# Export as XLSX (default)
ssi wallet export data/evidence/<ID>/investigation.json

# Export as CSV
ssi wallet export data/evidence/<ID>/investigation.json --format csv

# Custom output path
ssi wallet export data/evidence/<ID>/investigation.json --output wallets.xlsx
```

## API endpoints

| Method | Path                                | Description                                                                                        |
| ------ | ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| `GET`  | `/wallets`                          | Search wallets across all investigations (query params: `token`, `network`, `address`, pagination) |
| `GET`  | `/investigations/{id}/wallets.xlsx` | Download investigation wallets as XLSX                                                             |
| `GET`  | `/investigations/{id}/wallets.csv`  | Download investigation wallets as CSV                                                              |

## Customizing the allowlist

The token-network allowlist controls which token-network pairs SSI recognizes. Edit `config/wallet_allowlist.json` to add or remove pairs:

```json
[
  { "symbol": "BTC", "network": "Bitcoin" },
  { "symbol": "ETH", "network": "Ethereum" },
  { "symbol": "USDT", "network": "Tron" },
  { "symbol": "USDT", "network": "Ethereum" }
]
```

Restart the SSI API after editing. The CLI picks up changes immediately.
