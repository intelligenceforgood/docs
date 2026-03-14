# Scheduled Reports

Scheduled reports automate recurring report generation. Administrators
configure a template, cadence, scope, and recipient list; the platform
generates reports on schedule without manual intervention.

## Creating a Schedule

Use the API or CLI to create a schedule:

```bash
# CLI example
i4g jobs scheduled-reports
```

Or via the API:

```
POST /intelligence/scheduled-reports
{
  "template": "weekly_summary",
  "cadence": "weekly",
  "scope": {"entity_types": ["crypto_wallet"]},
  "options": {"format": "pdf"},
  "recipients": ["analyst@example.com"]
}
```

## Cadence Options

| Cadence   | Behavior                            |
| --------- | ----------------------------------- |
| `daily`   | Next run at the same time tomorrow  |
| `weekly`  | Next run 7 days after the last run  |
| `monthly` | Next run on the same day next month |

## Configuration

| Env Var                                                  | Default | Description                                |
| -------------------------------------------------------- | ------- | ------------------------------------------ |
| `I4G_ANALYTICS__SCHEDULED_REPORT_CHECK_INTERVAL_MINUTES` | 15      | How often the job checks for due schedules |

The scheduled reports job runs as part of the shared ingest-job Docker image.

## Managing Schedules

- **List schedules**: `GET /intelligence/scheduled-reports`
- **Deactivate**: `PUT /intelligence/scheduled-reports/{id}/deactivate`

Deactivated schedules stop generating reports but remain in the database
for audit purposes.

## Troubleshooting

| Symptom                | Check                                               |
| ---------------------- | --------------------------------------------------- |
| Reports not generating | Verify `is_active = true` and `next_run_at` is past |
| Wrong report content   | Check the `scope` JSON matches intended filters     |
| Job not running        | Confirm Cloud Scheduler triggers are active         |
| Duplicate reports      | Check `last_run_at` — the job is idempotent         |

See `src/i4g/worker/jobs/scheduled_reports.py` for the full implementation.
