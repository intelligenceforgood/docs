# Threat Intelligence Architecture

> Architecture overview for the Threat Intelligence & Fraud Analytics Platform (TIFAP).

## System Overview

TIFAP provides real-time fraud intelligence through five interconnected subsystems:

1. **Aggregation Pipeline** — ingests case data, extracts entities and indicators, computes analytics statistics
2. **Graph Service** — maintains a NetworkX-based entity relationship graph with infrastructure, wallet cluster, and co-occurrence edges
3. **Campaign Intelligence** — groups related cases into threat campaigns with taxonomy rollup, risk scoring, and timeline analysis
4. **Report Pipeline** — generates dossier reports (PDF/DOCX) via background worker tasks with template-based rendering
5. **External Enrichments** — integrates passive DNS, ASN lookup, and blockchain analytics for entity context

## Data Flow

![Threat Intelligence Data Flow](../assets/architecture/threat_intelligence.svg)

<details>
<summary>Mermaid source (click to expand)</summary>

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'14px', 'fontFamily':'system-ui, sans-serif'}, 'flowchart': {'curve':'basis', 'padding':16}}}%%
flowchart LR
    classDef ingest   fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef compute  fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#bf360c
    classDef store    fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#004d40
    classDef api      fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef ext      fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px,color:#4a148c

    Intake["Intake<br/>case submissions"]:::ingest
    Ingestion["Ingestion<br/>entity extraction"]:::ingest

    Intake --> Ingestion
    Ingestion --> EntityRegistry["Entity Registry<br/>persons · orgs · wallets"]:::store
    Ingestion --> IndicatorRegistry["Indicator Registry<br/>URLs · IPs · domains"]:::store

    subgraph Analytics["⏱️ Analytics Jobs"]
        Aggregation["analytics-aggregation<br/>stats · KPIs · risk"]:::compute
        Linkage["linkage-extract<br/>LLM indicator matching"]:::compute
        Clustering["infrastructure-clustering<br/>shared hosting edges"]:::compute
        Watchlist["watchlist-check<br/>entity monitoring"]:::compute
        Takedown["takedown-check<br/>URL reachability"]:::compute
    end

    EntityRegistry --> Aggregation
    IndicatorRegistry --> Aggregation
    IndicatorRegistry --> Linkage
    EntityRegistry --> Clustering
    EntityRegistry --> Watchlist
    IndicatorRegistry --> Takedown

    Aggregation --> EntityStats["entity_stats"]:::store
    Aggregation --> IndicatorStats["indicator_stats"]:::store
    Aggregation --> CampaignStats["campaign_stats"]:::store
    Aggregation --> PlatformKPIs["platform_kpis"]:::store
    Clustering --> InfraEdges["infrastructure_edges"]:::store

    subgraph APIs["⚡ API Endpoints"]
        IntelAPI["Intelligence API<br/>entity explorer · indicators"]:::api
        ImpactAPI["Impact API<br/>dashboard · KPIs"]:::api
        GraphAPI["Graph Service<br/>relationship traversal"]:::api
        PartnerFeed["Partner Feed<br/>indicator sharing"]:::api
    end

    EntityStats --> IntelAPI & ImpactAPI & GraphAPI
    IndicatorStats --> IntelAPI & PartnerFeed
    CampaignStats --> IntelAPI & ImpactAPI
    PlatformKPIs --> ImpactAPI
    InfraEdges --> GraphAPI

    subgraph Enrichment["🌍 External Enrichments"]
        PassiveDNS["Passive DNS"]:::ext
        ASN["ASN Lookup"]:::ext
        Blockchain["Blockchain Analytics"]:::ext
    end

    Enrichment --> EntityRegistry
```

</details>

## Key Components

| Component             | Location                                    | Purpose                                                                                |
| --------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| Analytics Store       | `src/i4g/store/analytics_store.py`          | CRUD for `entity_stats`, `indicator_stats`, `campaign_stats`, `platform_kpis`          |
| Graph Service         | `src/i4g/services/graph_service.py`         | In-memory graph computation (neighbors, subgraphs, clusters, temporal snapshots)       |
| Intelligence API      | `src/i4g/api/intelligence.py`               | Entity explorer, indicator registry, campaign detail, graph, timeline endpoints        |
| Impact API            | `src/i4g/api/impact.py`                     | Dashboard KPIs, loss-by-taxonomy, detection velocity, geography, cumulative indicators |
| Export Adapters       | `src/i4g/services/export_adapters.py`       | CSV, XLSX, STIX 2.1 export for indicators and entities                                 |
| Blockchain Enrichment | `src/i4g/services/enrichment/blockchain.py` | Wallet risk labels, cluster analysis, exchange attribution                             |
| Partner Feed API      | `src/i4g/api/partner_feed.py`               | Machine-readable indicator feed for partner organizations                              |

## Partner Indicator Feed

The partner feed provides a separate authentication path (`X-Partner-API-Key` header) for external consumers. Partners authenticate via dedicated API keys stored as SHA-256 hashes in the `partner_api_keys` table. Each request is rate-limited per key and audit-logged.

Supported output formats: JSON (default), CSV, STIX 2.1.

## Graph Edge Types

| Edge Type        | Source                    | Color      | Description                           |
| ---------------- | ------------------------- | ---------- | ------------------------------------- |
| `co_occurrence`  | Case entity co-membership | Blue       | Entities appearing in the same case   |
| `infrastructure` | DNS/hosting relationships | Red dashed | Infrastructure edges from passive DNS |
| `wallet_cluster` | Blockchain analytics      | Gold thick | On-chain wallet groupings             |

## Campaign Intelligence

Threat campaigns group related cases by shared indicators and entities. The campaign model computes:

- **Risk score** — weighted combination of loss sum, victim count, and indicator diversity
- **Taxonomy rollup** — aggregated fraud classifications from member cases
- **Timeline** — temporal sequence of case events within the campaign
- **LEA referral tracking** — which member cases have been referred to law enforcement

See `core/docs/design/threat_intelligence_analytics_tdd.md` for the full technical design.
