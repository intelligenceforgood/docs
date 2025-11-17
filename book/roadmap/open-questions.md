# Open Questions

The following topics require further investigation or stakeholder input. Track progress in `planning/change_log.md` and update this list when questions are resolved.

## Identity & Access Management

- What is the most accessible alternative to Google Identity Platform for users without Google accounts (e.g., Passkeys, Magic Links, NGO-focused providers)?
- How should hardware key or step-up authentication be introduced for administrators handling PII rehydration?

## Networking & Infrastructure

- Do any VM workloads still rely on the existing Cloud NAT? If so, create an alternative NAT or expand `endpoint_types` accordingly before production rollout.
- Should the static egress IP be mirrored in production despite limited Azure dependencies post-migration?

## Data Partnerships

- What data-sharing agreements are required when partnering with universities or law enforcement agencies internationally?
- How will user support lines integrate with i4g (phone, SMS, in-person)?

## Product Experience

- Which onboarding flow best supports low-tech users (wizard, chatbot, hotline transcription)?
- Should analysts have configurable dashboards to visualize campaign clusters and recovery metrics?

## Documentation

- Where should long-form technical deep dives live (public GitBook vs. contributor-only space)?
- What is the translation/localization plan for non-English speaking users and partners?

Please submit PRs or planning issues when you have proposals or findings related to these questions.
