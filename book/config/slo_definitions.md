# Service Level Objectives (SLOs)

> **Aligned with:** PRD NFR-1 (Performance)
> **Created:** 2026-02-14
> **Owner:** Platform Engineering

---

## Overview

This document defines baseline SLO targets for the i4g platform. Cloud
Monitoring alert policies (see `infra/modules/monitoring/`) fire when burn
rates exceed these budgets over rolling windows.

---

## API Latency

| Endpoint Category | p50 Target | p95 Target | p99 Target | Budget Window |
| ----------------- | ---------- | ---------- | ---------- | ------------- |
| Search / List     | < 500 ms   | < 2 s      | < 5 s      | 28 days       |
| Case Detail       | < 300 ms   | < 1 s      | < 3 s      | 28 days       |
| Detokenize        | < 200 ms   | < 1 s      | < 2 s      | 28 days       |
| LLM-backed (RAG)  | < 2 s      | < 5 s      | < 10 s     | 28 days       |
| Dashboard widgets | < 1 s      | < 3 s      | < 5 s      | 28 days       |

## Error Rate

| Service       | Target         | Measurement                          |
| ------------- | -------------- | ------------------------------------ |
| API (overall) | < 1 % 5xx      | HTTP 5xx / total requests            |
| Ingestion job | < 5 % failures | failed records / processed records   |
| Report job    | < 2 % failures | failed reports / attempted reports   |
| Dossier queue | < 2 % failures | failed dossiers / attempted dossiers |

## Queue & Job Health

| Metric                     | Target                                  |
| -------------------------- | --------------------------------------- |
| Review queue depth         | < 500 unassigned items (alert at > 500) |
| Report generation duration | < 30 min per batch (alert if stuck)     |
| Dossier generation latency | p95 < 10 min per dossier                |
| Ingestion throughput       | ≥ 100 records / hour in steady state    |

## PII Vault Access

| Metric                          | Target                         |
| ------------------------------- | ------------------------------ |
| Detokenization calls / user / h | ≤ 10 (alert above threshold)   |
| Unusual-access alerts / day     | < 5 (investigate if sustained) |

## Mobile (Future)

| Metric                  | Target    |
| ----------------------- | --------- |
| Dashboard load on 4G    | p95 < 3 s |
| Image evidence download | p95 < 5 s |

---

## Monitoring Implementation

SLO monitoring is implemented via:

1. **Structured log events** emitted by the `Observability` and `AlertingService`
   classes in `core/src/i4g/`.
2. **Cloud Monitoring log-based metrics** that parse structured JSON logs for
   `alert=true` events, keyed by `alert_type`.
3. **Terraform alert policies** in `infra/modules/monitoring/` that define
   notification channels, burn-rate windows, and escalation rules.
4. **StatsD / OpenTelemetry metrics** for latency histograms and counters,
   configurable via `ObservabilitySettings`.

### Key Structured Log Fields

| Field        | Type   | Purpose                                                                         |
| ------------ | ------ | ------------------------------------------------------------------------------- |
| `alert`      | `bool` | `true` for alert-worthy events                                                  |
| `alert_type` | `str`  | Category: `pii_access`, `ingestion_failure`, `dossier_stuck`, `dossier_failure` |
| `severity`   | `str`  | `warning` or `critical`                                                         |
| `component`  | `str`  | Emitting service component                                                      |

---

## Revision History

| Date       | Change                            |
| ---------- | --------------------------------- |
| 2026-02-14 | Initial SLO baseline (WS-8 / F51) |
