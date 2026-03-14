# Project Agent Rules

Read contexts/project.yaml for full structured knowledge about this project.

## Quick Reference

- Name: Next-Gen Development Tools (@nde/next-gen-tools v1.0.1)
- Type: Electron 28 desktop app
- Stack: React 19, Zustand 5, TailwindCSS 4, Ant Design 6, Radix/shadcn
- Build: pnpm monorepo + Turborepo + electron-vite
- Language: JavaScript (.js/.jsx only, no TS)
- Main app: apps/ui/

## Coding Rules

- React functional components + hooks only
- Zustand stores with selector pattern: useStore((s) => s.value)
- One store per domain in stores/
- Views in views/, components in components/, shadcn in components/ui/
- HashRouter routing (required for Electron)
- IPC via contextBridge.exposeInMainWorld() in preload
- Ant Design for data-heavy UI, shadcn/ui for primitives

## Key Paths

- Main process: apps/ui/src/main/index.js
- Anti-detection: apps/ui/src/main/anti-detection/
- React app: apps/ui/src/renderer/src/
- Stores: apps/ui/src/renderer/src/stores/ (11 stores)
- MCP server: apps/ui/scripts/scrum-mcp-server.js
- BMAD agents: _bmad/bmm/agents/
- Tests: apps/ui/tests/

## Commands

- Dev: pnpm ui
- Build: pnpm ui:build:win / ui:build:mac / ui:build:linux
- Test: pnpm test
- MCP: cd apps/ui && pnpm mcp:sse
- BMAD Install: pnpm bmad:install
- BMAD Update: pnpm bmad:update

## Optional: IDE-specific configs

Generate additional IDE-specific agent rule files (gitignored):

```bash
node scripts/init-agent.js          # interactive
node scripts/init-agent.js cursor   # Cursor (.cursorrules)
node scripts/init-agent.js claude   # Claude Code (CLAUDE.md)
node scripts/init-agent.js all      # all IDEs
```

## Sync contexts after codebase changes

Read `.agent/skills/context-sync/SKILL.md` for when and how to sync.
