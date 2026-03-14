---
name: BMAD Integration
description: Use BMAD Method v6.1.0 for AI-driven agile development with GUI, IDE, and MCP integration
---

# BMAD Integration Skill

This skill enables AI-driven agile development using the BMAD (Breakthrough Method for Agile AI-Driven) system v6.1.0 with full synchronization between GUI, IDE, and Scrum MCP.

## Quick Start

1. **Sync Context**: Click "Sync All" in the BMAD Integration panel
2. **Create PRD**: Type `*create-prd` in Agent Chat
3. **Create Architecture**: Type `*create-architecture`
4. **Create Stories**: Type `*create-story`
5. **Save Artifacts**: Click "Save" buttons on AI responses

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                      BMAD Context Sync                           │
├────────────────┬─────────────────┬─────────────────┬─────────────┤
│   SYNC Mode    │    GUI Mode     │    IDE Mode     │   MCP Mode  │
├────────────────┼─────────────────┼─────────────────┼─────────────┤
│ • Load files   │ • Agent Chat    │ • .cursorrules  │ • Stories   │
│ • Sync stories │ • Context aware │ • .windsurfrules│ • Epics     │
│ • Update IDE   │ • Save to files │ • AGENTS.md     │ • Board API │
└────────────────┴─────────────────┴─────────────────┴─────────────┘
```

## Workflow Commands

| Command                | Agent     | Description         |
| ---------------------- | --------- | ------------------- |
| `*create-prd`          | PM        | Guided PRD creation |
| `*create-story`        | SM        | Create user story   |
| `*create-architecture` | Architect | Design architecture |
| `*create-epics`        | PM        | Create epics        |
| `*brainstorm`          | Analyst   | Brainstorm ideas    |
| `*save-prd`            | PM        | Save PRD to file    |
| `*help`                | -         | Show commands       |

## File Structure (v6.1.0)

```
project/
├── _bmad/
│   ├── _config/            # Installation manifests
│   │   ├── manifest.yaml
│   │   ├── agent-manifest.csv
│   │   ├── skill-manifest.csv
│   │   ├── workflow-manifest.csv
│   │   └── agents/         # Compiled agent configs
│   ├── _memory/            # Agent memory & state
│   │   └── config.yaml
│   ├── core/               # BMAD core framework
│   │   ├── agents/         # bmad-master.md
│   │   ├── tasks/          # Core tasks (shard-doc, etc.)
│   │   └── workflows/      # brainstorming, elicitation, party-mode
│   └── bmm/                # BMad Method module
│       ├── agents/         # analyst, architect, dev, pm, qa, sm, ux-designer
│       ├── config.yaml     # Module config (v6.1.0)
│       ├── data/            # Data files
│       ├── teams/           # Team definitions
│       └── workflows/       # 4 phases + quick-flow + document + context
├── _bmad-output/
│   ├── prd.md              # PRD document
│   ├── architecture.md     # Architecture doc
│   ├── product-brief.md    # Product brief
│   ├── planning-artifacts/  # Phase 1-3 artifacts
│   └── implementation-artifacts/  # Phase 4 artifacts
├── .cursorrules             # Cursor IDE config
├── .windsurfrules           # Windsurf IDE config
└── AGENTS.md                # Universal agent rules
```

## v6.1.0 Key Changes

- **Everything is now skills-based** — all workflows, agents, and tasks are markdown with SKILL.md entrypoints
- **Legacy YAML/XML workflow engine removed** — unified skill manifests
- **New agents**: `qa.md` (QA agent), `quick-flow-solo-dev.md` (solo dev quick flow)
- **New manifests**: skill-manifest.csv, workflow-manifest.csv, agent-manifest.csv
- **Edge Case Hunter** added as parallel code review layer
- **Whiteport Design Studio (WDS)** module available

## BMM Workflow Phases

| Phase | Directory | Purpose |
|-------|-----------|---------|
| 1 - Analysis | `1-analysis/` | Research, market analysis |
| 2 - Planning | `2-plan-workflows/` | PRD, product brief |
| 3 - Solutioning | `3-solutioning/` | Architecture, UX design |
| 4 - Implementation | `4-implementation/` | Stories, sprints, code review |
| Quick Flow | `bmad-quick-flow/` | Fast-track development |
| Document | `document-project/` | Project documentation |
| Context | `generate-project-context/` | AI context generation |
| QA | `qa-generate-e2e-tests/` | E2E test generation |

## Integration Modes

### Sync Mode

Master synchronization - loads context, syncs MCP stories, generates IDE rules.

### GUI Mode

Chat with agents using workflow commands. Context from PRD/Arch/Stories auto-included.

### IDE Mode

Export files for external editors (Cursor, Windsurf). Same workflow commands work.

### MCP Mode

Scrum board connection at `http://127.0.0.1:3847/mcp`.

## MCP Server

- **Base**: `http://127.0.0.1:3847`
- **MCP**: `http://127.0.0.1:3847/mcp`
- **SSE**: `http://127.0.0.1:3847/sse`

### MCP Tools

- `create-story` - Create a story on the board
- `update-card` - Update card properties
- `move-card` - Move card between lists
- `list-stories` - Get all stories
- `add-epic` - Add an epic
- `get-board` - Get board state

## IDE Setup

### Cursor/Windsurf MCP Config

```json
{
  "mcpServers": {
    "scrum": {
      "url": "http://127.0.0.1:3847/mcp"
    }
  }
}
```

## Context Flow

1. **Files → Chat**: PRD, Arch, Stories loaded into prompts
2. **MCP → Files**: Stories synced to `stories.md`
3. **Chat → Files**: Save buttons write to `_bmad-output/`
4. **Files → IDE**: Rules generated for external editors

## Agents

| Agent            | File                    | Role             | Use For                  |
| ---------------- | ----------------------- | ---------------- | ------------------------ |
| PM               | pm.md                   | Product Manager  | PRD, requirements, epics |
| Architect        | architect.md            | System Architect | Design, tech stack       |
| SM               | sm.md                   | Scrum Master     | Stories, sprints         |
| Analyst          | analyst.md              | Business Analyst | Research, brainstorm     |
| Dev              | dev.md                  | Developer        | Implementation           |
| UX Designer      | ux-designer.md          | UX Designer      | Design, wireframes       |
| QA               | qa.md                   | Quality Assurance| Testing, edge cases      |
| Quick Flow Solo  | quick-flow-solo-dev.md  | Solo Developer   | Fast-track development   |

## Best Practices

1. Always start with "Sync All"
2. Follow workflow: PRD → Architecture → Epics → Stories
3. Save artifacts using the buttons
4. Keep context updated with periodic syncs
5. Use the right agent for each task

## Upgrade / Reinstall

```bash
npx bmad-method@latest install --yes --action update --modules bmm
```

## Troubleshooting

| Issue                 | Solution                  |
| --------------------- | ------------------------- |
| MCP disconnected      | Check server on port 3847 |
| Context not loading   | Run "Sync All"            |
| IDE not reading rules | Restart IDE, run Sync     |
| Stories not syncing   | Check MCP, run Sync       |
