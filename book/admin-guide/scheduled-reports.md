# Scheduled Reports

Scheduled reports automate recurring report generation. You configure a
template, cadence, scope, and recipient list — the platform generates
reports on schedule without manual intervention.

## Creating a Schedule

From the Console, navigate to **Reports → Scheduled** and click
**New Schedule**:

| Field          | What to enter                                                     |
| -------------- | ----------------------------------------------------------------- |
| **Template**   | Report template to use (e.g. weekly summary, indicator digest).   |
| **Cadence**    | How often the report runs: daily, weekly, or monthly.             |
| **Scope**      | What to include — filter by entity type, engagement, or campaign. |
| **Format**     | Output format: PDF or CSV.                                        |
| **Recipients** | Email addresses that receive the generated report.                |

Click **Create** to activate the schedule.

## Cadence Options

| Cadence     | Behavior                         |
| ----------- | -------------------------------- |
| **Daily**   | Runs at the same time each day.  |
| **Weekly**  | Runs 7 days after the last run.  |
| **Monthly** | Runs on the same day each month. |

## Managing Schedules

The **Scheduled Reports** page lists all configured schedules with their
status, last run time, and next run time.

| Action         | How to do it                                               |
| -------------- | ---------------------------------------------------------- |
| **View**       | Click a schedule to see its configuration and run history. |
| **Deactivate** | Toggle the schedule to inactive. It stops running but      |
|                | remains in the list for audit purposes.                    |
| **Reactivate** | Toggle an inactive schedule back to active.                |

## Troubleshooting

| Symptom                | What to check                                            |
| ---------------------- | -------------------------------------------------------- |
| Reports not generating | Verify the schedule is active and the next run is past.  |
| Wrong report content   | Check the scope filters match your intended data set.    |
| Duplicate reports      | The job is idempotent — check if the schedule was edited |
|                        | while a run was in progress.                             |

## Learn more

- [Reports & Dossiers](../analyst-guide/reports-and-dossiers.md) — how
  analysts generate and share reports
- [Dossiers & Reports](../key-concepts/dossiers-and-reports.md) — report
  types and chain of custody
