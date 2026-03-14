#!/usr/bin/env node

/**
 * init-agent.js — Generate IDE-specific agent context files
 *
 * Usage:
 *   node scripts/init-agent.js           # interactive menu
 *   node scripts/init-agent.js cursor    # direct pick
 *   node scripts/init-agent.js all       # generate all
 *
 * Source of truth: AGENTS.md + contexts/project.yaml (in git)
 * Generated files: .cursorrules, CLAUDE.md, etc. (gitignored)
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..');
const YAML_PATH = path.join(ROOT, 'contexts', 'project.yaml');

// Compact rules block shared by all IDE configs
const rules = `Read contexts/project.yaml for full project knowledge.

Electron 28 desktop app (@nde/next-gen-tools v1.0.1).
Stack: React 19, Zustand 5, TailwindCSS 4, Ant Design 6, Radix/shadcn.
Language: JavaScript only (.js/.jsx). No TypeScript.
Main app: apps/ui/. Monorepo: pnpm + Turborepo.

Rules:
- Zustand selector pattern: useStore((s) => s.val)
- React functional components + hooks only
- HashRouter for Electron
- IPC via contextBridge in preload
- Ant Design for data-heavy, shadcn/ui for primitives
- Views = per route, Components = reusable, Stores = per domain

Commands: pnpm ui (dev), pnpm test (test), pnpm ui:build:win (build)`;

// IDE targets: id, display name, file path, optional content wrapper
const targets = [
  {
    id: 'cursor',
    name: 'Cursor',
    file: '.cursorrules',
    content: () => rules,
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    file: '.windsurfrules',
    content: () => rules,
  },
  {
    id: 'claude',
    name: 'Claude Code',
    file: 'CLAUDE.md',
    content: () => `# CLAUDE.md\n\n${rules}`,
  },
  {
    id: 'cline',
    name: 'Cline',
    file: '.clinerules',
    content: () => rules,
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    file: '.github/copilot-instructions.md',
    content: () => rules,
  },
];

function generate(target) {
  const filePath = path.join(ROOT, target.file);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, target.content(), 'utf-8');
  console.log(`  ✓ ${target.file} (${target.name})`);
}

function generateAll() {
  console.log('\nGenerating all agent configs:\n');
  targets.forEach(generate);
  console.log('\nDone! These files are gitignored.\n');
}

function generateOne(id) {
  const target = targets.find((t) => t.id === id);
  if (!target) {
    console.error(`Unknown target: ${id}`);
    console.error(`Available: ${targets.map((t) => t.id).join(', ')}, all`);
    process.exit(1);
  }
  console.log('');
  generate(target);
  console.log('');
}

async function interactive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

  console.log('\n🔧 Agent Context Init\n');
  console.log('Which IDE agent config do you want to generate?\n');
  targets.forEach((t, i) => console.log(`  ${i + 1}. ${t.name} (${t.file})`));
  console.log(`  ${targets.length + 1}. All of the above`);
  console.log('');

  const answer = await ask('Pick a number: ');
  const num = parseInt(answer.trim(), 10);

  if (num === targets.length + 1) {
    generateAll();
  } else if (num >= 1 && num <= targets.length) {
    generateOne(targets[num - 1].id);
  } else {
    console.error('Invalid choice.');
    process.exit(1);
  }

  rl.close();
}

// --- Main ---

if (!fs.existsSync(YAML_PATH)) {
  console.error('Error: contexts/project.yaml not found.');
  console.error('Run a deep scan first to generate it.');
  process.exit(1);
}

const arg = process.argv[2];

if (!arg) {
  interactive();
} else if (arg === 'all') {
  generateAll();
} else {
  generateOne(arg);
}
