# Partner Feed Administration Guide

> Configure and manage the partner indicator feed API for external consumers.

## Overview

The partner feed provides a machine-readable, paginated indicator feed at `GET /feeds/indicators`. Partners authenticate with dedicated API keys separate from the analyst console authentication.

## Enabling the Partner Feed

Set the following environment variables:

```bash
I4G_PARTNER_FEED__ENABLED=true
I4G_PARTNER_FEED__RATE_LIMIT_PER_MINUTE=60
I4G_PARTNER_FEED__DEFAULT_PAGE_SIZE=50
I4G_PARTNER_FEED__MAX_PAGE_SIZE=500
```

Or configure in `config/settings.local.toml`:

```toml
[partner_feed]
enabled = true
rate_limit_per_minute = 60
default_page_size = 50
max_page_size = 500
```

## API Key Management

Partner API keys are stored in the `partner_api_keys` table with SHA-256 hashed keys.

### Creating a Key

Insert directly into the database (admin operation):

```python
import hashlib, uuid
from datetime import UTC, datetime, timedelta

key_id = str(uuid.uuid4())
raw_key = f"i4g-partner-{uuid.uuid4().hex}"
key_hash = hashlib.sha256(raw_key.encode()).hexdigest()

# Store key_hash, key_prefix (first 8 chars of raw_key), partner_name, scopes
# Provide raw_key to the partner (it cannot be recovered from the hash)
```

### Key Fields

| Field                   | Description                             |
| ----------------------- | --------------------------------------- |
| `key_id`                | Unique identifier (UUID)                |
| `partner_name`          | Human-readable partner name             |
| `key_hash`              | SHA-256 hash of the raw key             |
| `key_prefix`            | First 8 characters for identification   |
| `scopes`                | JSON array of allowed scopes (reserved) |
| `rate_limit_per_minute` | Per-key rate limit override             |
| `is_active`             | Enable/disable without deleting         |
| `expires_at`            | Optional expiration timestamp           |

### Revoking a Key

Set `is_active = false` on the key record. The partner receives a 403 response.

## Rate Limiting

Each key has a configurable `rate_limit_per_minute`. When exceeded, the API returns HTTP 429. Rate limiting uses in-memory tracking (resets on server restart).

## Audit Logging

Every partner feed request is logged to the `partner_feed_audit` table:

| Field           | Description                   |
| --------------- | ----------------------------- |
| `key_id`        | Which key was used            |
| `partner_name`  | Partner identification        |
| `endpoint`      | API path accessed             |
| `query_params`  | Filter parameters used        |
| `result_count`  | Number of indicators returned |
| `response_code` | HTTP status code              |
| `ip_address`    | Client IP                     |

## Output Formats

- **JSON** (default): Paginated response with camelCase field names
- **CSV**: Raw CSV download (`?fmt=csv`)
- **STIX 2.1**: STIX bundle format (`?fmt=stix`)

## Query Parameters

| Parameter      | Type     | Description                             |
| -------------- | -------- | --------------------------------------- |
| `category`     | string   | Filter by indicator category            |
| `minRiskScore` | float    | Minimum risk score (0–100)              |
| `since`        | ISO-8601 | Only indicators updated after this date |
| `tlp`          | string   | TLP level (default: `TLP:AMBER`)        |
| `page`         | int      | Page number (1-indexed)                 |
| `pageSize`     | int      | Items per page                          |
| `fmt`          | string   | Output format: `json`, `csv`, `stix`    |
