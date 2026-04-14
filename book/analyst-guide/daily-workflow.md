# Daily Workflow

Your daily rhythm as an analyst: check the dashboard, triage cases,
review evidence, classify, and take action.

## The five-step loop

### 1. Check the Dashboard

Open the Console and review the **Dashboard**. The KPI cards show
today's case volume, unresolved alerts, and active threats. Scan the
activity feed for any overnight changes that need attention.

### 2. Open the case queue

Navigate to **Cases**. The queue shows cases ordered by priority and
status. Use the filters at the top to focus on:

- **Status** — new, in review, needs info, accepted, closed.
- **Priority** — high-priority cases are flagged with a red badge.
- **Classification** — filter by
  [taxonomy](../key-concepts/fraud-taxonomy.md) axis if you are
  specializing (e.g., all romance-intent cases).

### 3. Review a case

Click a case to open its detail page. This is where you spend most of
your time. See [Reviewing Cases](reviewing-cases.md) for the full
walkthrough.

### 4. Classify and annotate

Apply the five-axis [fraud taxonomy](../key-concepts/fraud-taxonomy.md):

- **Intent** — what the scammer is trying to achieve.
- **Channel** — how they reach the victim.
- **Technique** — deception methods used.
- **Requested Action** — what the victim is asked to do.
- **Claimed Persona** — who the scammer pretends to be.

Add a risk score and any analyst notes. Your classifications power the
platform's analytics, campaign detection, and law enforcement referrals.

### 5. Take action

After review, choose an action:

- **Close Case** — marks the case as resolved.
- **Share** — shares case information with partners or liaisons.
- **Escalate** — flags the case for administrator or LEA attention.
- **Link to Campaign** — associates the case with a
  [threat campaign](../key-concepts/campaigns.md).

## Tips for efficient triage

- Start with the highest-priority cases each session.
- Use [Search](search-and-discovery.md) to find related cases before
  classifying — similar scam narratives often share entities.
- Check the [Entity Explorer](entity-explorer.md) when you notice
  wallet addresses or domains that may link to other cases.
- If a case appears to be part of a larger operation, link it to a
  campaign before closing.

## When in doubt

Err on the side of escalation. Administrators can always downgrade a
classification, but missed threats are harder to recover.

See [Escalation paths](README.md#escalation-paths) in the Start Here
page for when and how to escalate.
