# Copilot Workflow Guide

How to get the most out of GitHub Copilot in the i4g multi-root workspace. This guide covers the customization architecture, the learning system, and how to extend both.

## Architecture Overview

The workspace uses a layered customization system with three mechanisms:

```
┌─────────────────────────────────────────────────┐
│  Layer 3: Prompt Templates (.prompt.md)         │
│  → One-click workflows (pre-merge, deploy, etc) │
├─────────────────────────────────────────────────┤
│  Layer 2: Scoped Instructions (.instructions.md)│
│  → Auto-loaded by file type (Python, TS, etc)   │
├─────────────────────────────────────────────────┤
│  Layer 1: Workspace Instructions                │
│  → copilot-instructions.md per repo (always on) │
├─────────────────────────────────────────────────┤
│  Foundation: Memory System                      │
│  → Persistent learning across sessions          │
└─────────────────────────────────────────────────┘
```

### Layer 1: Workspace Instructions (always loaded)

Each repo has `.github/copilot-instructions.md` which is automatically injected into every conversation when working in that repo. These contain:

- Repo-specific conventions (conda env, build commands, architecture)
- Cross-references to shared standards in `core/.github/`
- The rehydration protocol, config discipline, and merge readiness rules

**Source of truth:** `core/.github/copilot-instructions.md` — other repos are synchronized from this.

### Layer 2: Scoped Instructions (loaded by file type)

Files in `core/.github/*.instructions.md` with `applyTo` frontmatter are only loaded when you're editing a matching file type. This reduces context noise.

| File                                         | Triggers on                   | Content                                          |
| -------------------------------------------- | ----------------------------- | ------------------------------------------------ |
| `python-standards.instructions.md`           | `**/*.py`                     | Type hints, docstrings, Black, Pydantic patterns |
| `typescript-react-standards.instructions.md` | `**/*.ts, **/*.tsx`           | React hooks, naming, Prettier                    |
| `terraform-standards.instructions.md`        | `**/*.tf`                     | HCL naming, variables, dev-first                 |
| `settings-config.instructions.md`            | `**/settings*.toml, **/.env*` | Env var contract, override patterns              |

**To add a new scoped instruction:**

1. Create `core/.github/<topic>.instructions.md`
2. Add YAML frontmatter with `applyTo: "<glob-pattern>"`
3. Write concise, bullet-point instructions
4. Commit — Copilot picks it up immediately

Example:

```yaml
---
applyTo: "**/alembic/versions/*.py"
---
# Alembic Migration Standards
- Always add a descriptive revision message
- Include idempotent guards (IF NOT EXISTS)
- Never modify a migration already applied to a shared env
```

### Layer 3: Prompt Templates (invoked on demand)

Files in `core/.github/prompts/*.prompt.md` are reusable workflow templates. Access them from the Copilot chat prompt picker.

| Prompt              | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `pre-merge-review`  | Full quality checklist across all changed repos |
| `rehydrate-session` | Start-of-session orientation                    |
| `sprint-wrapup`     | End-of-sprint deliverables                      |
| `record-lesson`     | Save a lesson to repo memory                    |
| `deploy-to-dev`     | Pre-flight deploy checklist                     |
| `bootstrap-sandbox` | Reset local development environment             |

**To create a new prompt:**

1. Create `core/.github/prompts/<name>.prompt.md`
2. Add YAML frontmatter: `mode: agent`, `description: "..."`
3. Write the workflow steps in markdown
4. Commit — it appears in the prompt picker

Example:

```yaml
---
mode: agent
description: "Run OCR extraction smoke test on sample documents"
---
# OCR Smoke Test
1. Check that sample files exist in `data/samples/`
2. Run: `conda run -n i4g python tests/adhoc/test_ocr.py`
3. Verify output files in `data/ocr_output/`
4. Report pass/fail with any errors
```

## The Learning System

Copilot learns from three memory scopes:

### Repo Memory (`/memories/repo/`)

Workspace-scoped facts that persist across all sessions in this workspace.

| File                   | Purpose                                               |
| ---------------------- | ----------------------------------------------------- |
| `lessons-learned.md`   | Coding pitfalls, architecture patterns, workflow tips |
| `workflow-patterns.md` | User preferences, common commands, session routines   |
| `infra-parity.md`      | Dev/prod environment parity checklist                 |

**How it works:**

- During a session, Copilot can read these at rehydration or when relevant
- After discovering something new, use the `record-lesson` prompt or ask Copilot to "save this to repo memory"
- When a lesson appears 3+ times, promote it to a `.instructions.md` file

### User Memory (`/memories/`)

Cross-workspace notes (e.g., `pre-merge-review-lessons.md`). These are automatically loaded into every session.

### Session Memory (`/memories/session/`)

Temporary notes for the current conversation only. Cleared after the conversation ends.

### Learning Flywheel

```
  Work on a task
       ↓
  Discover something (pattern, pitfall, preference)
       ↓
  Record it → repo memory or user memory
       ↓
  Next session: Copilot reads memory, applies lessons
       ↓
  Accumulate 3+ similar lessons
       ↓
  Promote to .instructions.md (permanent, auto-loaded)
       ↓
  Repeat — the system gets smarter over time
```

## Extending the System

### Adding a New Repo to the Workspace

1. Create `.github/copilot-instructions.md` in the new repo
2. Start from the template in `core/.github/copilot-instructions.md`
3. Customize sections 1 (conda env), 3 (language conventions), and 4 (architecture)
4. Add the repo to `i4g.code-workspace`

### Keeping Instructions Synchronized

The `core/.github/copilot-instructions.md` is the source of truth. When updating shared sections:

1. Edit in `core/` first
2. Propagate changes to other repos' `copilot-instructions.md`
3. Consider whether the change should be a scoped `.instructions.md` instead

### Advanced: gstack Skills

The `gstack/` repo in this workspace contains a skill framework for Claude Code (the CLI tool). If you also use Claude Code, gstack provides workflow skills like `/review`, `/ship`, `/investigate`, and `/qa`. See the [gstack README](../../gstack/README.md) for installation instructions.

To create i4g-specific skills inspired by gstack's pattern:

1. Study `gstack/SKILL.md.tmpl` for the template format
2. Each skill is a markdown file with YAML frontmatter and structured workflow steps
3. Skills can be installed to `~/.claude/skills/` for Claude Code

## Quick Reference

### Daily Workflow

1. **Start:** Use the `rehydrate-session` prompt
2. **Work:** Code normally — scoped instructions load automatically
3. **Learn:** Use `record-lesson` when you discover something
4. **Review:** Use `pre-merge-review` before merging
5. **End:** Use `sprint-wrapup` at end of sprint

### File Locations

```
core/.github/
├── copilot-instructions.md          # Always-on workspace context
├── general-coding.instructions.md   # Canonical coding standards
├── architecture-cheatsheet.instructions.md  # System architecture
├── pre-merge-review.instructions.md # Review checklist
├── python-standards.instructions.md       # Scoped: Python files
├── typescript-react-standards.instructions.md  # Scoped: TS/TSX files
├── terraform-standards.instructions.md    # Scoped: Terraform files
├── settings-config.instructions.md        # Scoped: Config files
└── prompts/
    ├── pre-merge-review.prompt.md   # One-click review
    ├── rehydrate-session.prompt.md  # Session start
    ├── sprint-wrapup.prompt.md      # Sprint end
    ├── record-lesson.prompt.md      # Save a lesson
    ├── deploy-to-dev.prompt.md      # Deploy checklist
    └── bootstrap-sandbox.prompt.md  # Local reset
```
