# Security Model

How we keep victims' data safe while delivering evidence law enforcement can trust.

![Security Model](../assets/architecture/security_model.svg)

<details>
<summary>Mermaid source (click to expand)</summary>

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'16px', 'fontFamily':'system-ui, sans-serif'}, 'flowchart': {'curve':'basis', 'padding':20}}}%%
flowchart TB
    classDef user      fill:#e8eaf6,stroke:#5c6bc0,stroke-width:2px,color:#1a237e
    classDef edge      fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef auth      fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#bf360c
    classDef service   fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef data      fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#004d40
    classDef vault     fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c
    classDef monitor   fill:#efebe9,stroke:#5d4037,stroke-width:2px,color:#3e2723
    classDef kms       fill:#fce4ec,stroke:#ad1457,stroke-width:2px,color:#880e4f
    classDef role      fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px,color:#4a148c

    subgraph Principals["👤 Principals"]
        Victim(["Victim<br/>view own case only"]):::user
        AnalystU(["Analyst<br/>view assigned cases"]):::user
        Admin(["Admin<br/>manage all cases"]):::user
        LEOUser(["LEO<br/>download with subpoena"]):::user
        Partner(["Partner API<br/>API-key authenticated"]):::user
    end

    subgraph AuthLayer["🔒 Authentication Layer"]
        LB{{"Global HTTPS LB<br/>TLS 1.3 termination"}}:::edge
        IAP["Identity-Aware Proxy<br/>Google OAuth 2.0<br/>JWT validation"]:::edge
        APIKey["API Key Auth<br/>header: X-API-KEY"]:::auth
    end

    subgraph RBAC["🔑 Authorization · RBAC"]
        direction LR
        RoleUser["role: user<br/>own case only"]:::role
        RoleAnalyst["role: analyst<br/>assigned cases"]:::role
        RoleAdmin["role: admin<br/>all cases · manage"]:::role
        RoleLEO["role: leo<br/>reports · subpoena"]:::role
    end

    subgraph ServiceLayer["⚡ Service Layer · Cloud Run"]
        Console(["Next.js Console<br/>sa-app · masked views"]):::service
        API(["FastAPI Gateway<br/>sa-app · enforces RBAC"]):::service
        Workers(["Cloud Run Jobs<br/>sa-ingest · sa-report<br/>sa-intake"]):::service
    end

    subgraph DataZone["💾 Data Stores"]
        CaseDB[("Cloud SQL · PG 15<br/>row-level security<br/>IAM auth · no passwords")]:::data
        Evidence[("GCS Buckets<br/>uniform ACL<br/>public access blocked")]:::data
        VectorStore["Vertex AI Search<br/>read-only for analysts"]:::data
    end

    subgraph VaultZone["🛡️ PII Vault · isolated project"]
        Tokenizer["Tokenization Engine<br/>regex + LLM-assisted<br/>SSN · email · phone · card · DOB"]:::vault
        VaultDB[("vault_db<br/>token_id · case_id<br/>pii_type · encrypted_value")]:::vault
        KMS["Cloud KMS<br/>AES-256-GCM<br/>90-day key rotation"]:::kms
        VaultSecrets["Secret Manager<br/>tokenization-pepper<br/>pii-tokenization-key"]:::vault
    end

    subgraph AuditZone["📊 Audit & Monitoring"]
        AuditLog["Audit Log<br/>every PII access logged<br/>correlation IDs"]:::monitor
        Alerts["Alert Policies<br/>vault anomalies<br/>failed auth"]:::monitor
        Metrics["Log-Based Metrics<br/>pii_access_alert<br/>ingestion_failure"]:::monitor
    end

    Victim -- "① HTTPS" --> LB
    AnalystU -- "① HTTPS" --> LB
    Admin -- "① HTTPS" --> LB
    LEOUser -- "① HTTPS" --> LB
    Partner -- "① HTTPS + X-API-KEY" --> APIKey

    LB -- "② TLS 1.3" --> IAP
    APIKey -- "② validate" --> API

    IAP -- "③ Google Sign-In" --> Console
    IAP -- "③ OIDC token" --> API

    Console -- "④ API call" --> API
    API -- "⑤ check role" --> RBAC

    RoleUser -. "scoped" .-> CaseDB
    RoleAnalyst -. "scoped" .-> CaseDB
    RoleAdmin -. "full" .-> CaseDB
    RoleLEO -. "reports" .-> Evidence

    API -- "⑥ IAM auth" --> CaseDB
    API -- "⑥ signed URLs" --> Evidence
    API -- "⑥ queries" --> VectorStore
    Workers -- "⑥ IAM auth" --> CaseDB
    Workers -- "⑥ write" --> Evidence

    API -- "⑦ tokenize on upload" --> Tokenizer
    Workers -- "⑦ tokenize" --> Tokenizer
    Tokenizer -- "encrypt" --> KMS
    Tokenizer -- "store tokens" --> VaultDB
    Tokenizer -. "secrets" .-> VaultSecrets

    API -. "⑧ detokenize<br/>(approval required)" .-> Tokenizer

    Tokenizer -- "log access" --> AuditLog
    API -- "structured logs" --> AuditLog
    AuditLog --> Metrics
    Metrics --> Alerts
```

</details>

## Core safeguards

- **Immediate masking:** PII is tokenized on upload using regex patterns and LLM-assisted detection (SSN, email, phone, credit card, address, DOB). Analysts and most systems see tokens like `<PII:SSN:7a8f2e>`, not raw identifiers.
- **Separated stores:** Canonical PII lives in an isolated GCP project (`i4g-pii-vault`) with its own Cloud SQL instance and KMS keys. Case data, vectors, and reports live in the main project with scoped IAM access.
- **Approvals for reveal:** Detokenization requires explicit approvals (or subpoena) and is fully audited with correlation IDs.
- **Encryption everywhere:** TLS 1.3 in transit; AES-256-GCM at rest with KMS-wrapped keys rotated every 90 days. Signed dossiers include SHA-256 hash manifests for verification.
- **Least privilege:** Four RBAC roles (user, analyst, admin, leo) limit visibility. Row-level security scopes queries by `assigned_to`. Cloud SQL uses IAM auth — no stored passwords. Seven service accounts follow least-privilege bindings.
- **Proactive monitoring:** Log-based metrics trigger alerts on unusual vault access, failed authentication, ingestion failures, and signature mismatches.

## Why it matters

- Victims stay protected while their cases move forward.
- Partners and donors see a compliant, auditable path from intake to court-ready evidence.
- The architecture scales without relaxing privacy guarantees.
