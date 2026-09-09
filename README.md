# The HIG for AI-native web development.

The open-source, vendor-neutral standard for building modern web interfaces.

**[Quick Reference](./HIG-QUICK.md)** · **[Read the Standard](./HIG.md)** · **[Use with AI](./INTEGRATION.md)** · **[Contribute](./CONTRIBUTING.md)**

**Current version:** [v1.9.0](./HIG.md) · [Release notes](./RELEASE_NOTES.md) · [Documentation site](https://frozonfreak.github.io/hig/)

---

## What

The Web HIG is an open, vendor-neutral standard for how web interfaces should behave — covering accessibility, performance, forms, loading states, security, and interactions.

It is a rulebook and engineering contract, not a component library. You keep your design system, framework, and components; the HIG defines how they should work together.

Read the [Quick Reference](./HIG-QUICK.md) (~5 minutes) to get started.

## Why

The web already has HTML standards, WCAG accessibility guidelines, CSS conventions, and design systems — but nothing ties them into one shared behavioral contract for modern apps.

| Existing approach | What it gives you | What it misses |
|---|---|---|
| Component libraries (MUI, Bootstrap, shadcn/ui) | Pre-built widgets | No shared rules for error recovery, delete flows, or token discipline |
| Platform HIGs (Apple, Material Design) | Polished vendor guidance | Portability across web stacks and AI tooling |
| Style guides | Colors, typography, brand | Behavior, states, performance targets, security UX |
| WCAG | Accessibility compliance | Performance, mutations, CI enforcement, AI agent rules |

The Web HIG fills that gap: a versioned, lintable standard that teams and AI coding agents can pin in any product repo — without replacing your stack.

## How

Add the HIG to an existing project in one afternoon:

1. **Pin the contract** — copy `HIG-QUICK.md`, `HIG-LITE.md`, `HIG.md`, `rules/`, and `VERSION` into your repo (e.g. `docs/hig/`)
2. **Map your pages** — create `docs/hig-scope.md` listing routes and page archetypes (Content, Commerce, Application, or Auth). See [examples/hig-scope.example.md](./examples/hig-scope.example.md)
3. **Wire your tools** — add agent rules for Cursor, Copilot, or Claude Code from [examples/agent-rules/](./examples/agent-rules/)
4. **Review and automate** — use the Quick Reference in PRs; add ESLint/CI gates when ready

Full adoption guide: **[INTEGRATION.md](./INTEGRATION.md)**

---

## Who is this for?

- **Designers and engineers** building web apps, dashboards, commerce flows, or marketing sites
- **AI coding agents** (Cursor, Claude Code, GitHub Copilot) that need deterministic, lintable UI constraints
- **Teams** establishing shared UX, a11y, and performance standards across products

## Quick start

1. Read **[HIG-QUICK.md](./HIG-QUICK.md)** — 98 rules, ~5 minutes (Layer 1)
2. Identify your page archetype (Content/Marketing, Commerce, Application, or Auth/Account)
3. Open **[HIG-LITE.md](./HIG-LITE.md)** + topic modules when building features (Layer 2)
4. Apply the Layer 0 applicability matrix to determine which rules are mandatory for your context
5. Open **[HIG.md](./HIG.md)** only for edge cases or normative detail (Layer 3)
6. Wire the Layer 7 ESLint/Stylelint rules and Layer 8 CI gates into your pipeline
7. Run `npm run validate` to verify contract integrity when upgrading pins

## What is inside?

The standard covers design principles, information architecture, state machines, interaction rules, accessibility, performance, security, and programmatic enforcement for AI agents. It is organized as a **10-Layer Governance Framework**:

| Layer | Focus |
|---|---|
| 0 | Applicability & Scope — page archetypes and mandatory rule matrix |
| 1 | UX Principles — motion, functional micro-animations, density, spatial ergonomics |
| 2 | Information Architecture — document fundamentals, navigation, i18n/RTL |
| 3 | Visual & Design Tokens — contrast-verified three-tier token system |
| 4 | Interaction & State — server-driven rendering, state machines, optimistic UI, data protection |
| 5 | Accessibility — WCAG 2.2 AA conformance, keyboard navigation, focus management |
| 6 | Performance — lab & field metrics, Core Web Vitals (LCP, INP, CLS) + supporting metrics |
| 7 | AI & Agent Enforcement — rule IDs, severity, machine-readable guardrails for coding agents |
| 8 | Quality Assurance — blocking/warning/observation CI/CD gates |
| 9 | Security & Privacy — CSP, XSS/CSRF, PII handling, auth UX, audit logging |

## Three layers — pick your depth (v1.9.0)

The HIG is split into three consumption layers so teams and AI agents never need the full spec in every prompt:

```
                         WEB HIG
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
    HIG-QUICK.md       HIG-LITE.md           HIG.md
      Layer 1            Layer 2             Layer 3
    ~5 minutes         Practical           Full
    98 rules           documentation       specification
          │                  │
          │            rules/ + framework/
          │            archetype packs
          └──────────────────┴──► All rules map to HIG.md
```

| Layer | File(s) | Read time | Use when |
|---|---|---|---|
| **1 — Quick Reference** | [HIG-QUICK.md](./HIG-QUICK.md) | ~5 min | Daily work, AI agent default, code review checklist |
| **2 — Practical** | [HIG-LITE.md](./HIG-LITE.md), [rules/](./rules/), [framework/](./framework/) | ~15–30 min | Building features — rule IDs, topic modules, archetype packs |
| **3 — Full specification** | [HIG.md](./HIG.md) | As needed | Edge cases, normative conflicts, CI gate definitions |

**Tell an AI:** *"Follow Modern Web HIG Quick Reference."* — pin [HIG-QUICK.md](./HIG-QUICK.md) instead of feeding the 20,000-token full document.

| Supporting file | Use |
|---|---|
| [HIG-CORE.md](./HIG-CORE.md) | Session preamble — vocabulary, archetypes, HIG-SIM-001 |
| [rules/archetypes/](./rules/archetypes/) | Preload correct modules per page type |
| [VERSION](./VERSION) | Single version pin for product repos and CI |
| [rules/INDEX.md](./rules/INDEX.md) | Human-readable topic index and rule ID registry |
| [rules/manifest.yaml](./rules/manifest.yaml) | Machine-readable load triggers for Layer 2 modules |

Every Quick, Lite, and module rule maps to a canonical section in [HIG.md](./HIG.md) — not a separate standard.

## Integrate into your workflow

For product teams and coding agents, follow **[INTEGRATION.md](./INTEGRATION.md)** — an efficient path that avoids dumping the full HIG into every prompt:

1. **Pin** `HIG-QUICK.md` + `HIG-LITE.md` + `HIG.md` in the product repo (vendor copy, submodule, or tagged URL)
2. **Declare archetypes** once (`docs/hig-scope.md` — see [examples/hig-scope.example.md](./examples/hig-scope.example.md))
3. **Wire agents** with Layer 1 Quick Reference default + Layer 7 YAML from [examples/agent-rules/](./examples/agent-rules/)
4. **Add a PR checklist**, then Layer 8 lint/CI when you can automate Layer 7

| Tool | Template |
|---|---|
| Cursor | [examples/agent-rules/cursor-hig.mdc](./examples/agent-rules/cursor-hig.mdc) → `.cursor/rules/hig.mdc` |
| Claude Code | [examples/agent-rules/CLAUDE-hig.md](./examples/agent-rules/CLAUDE-hig.md) → merge into `CLAUDE.md` |
| GitHub Copilot | [examples/agent-rules/copilot-instructions-hig.md](./examples/agent-rules/copilot-instructions-hig.md) → `.github/copilot-instructions.md` |
| Multi-agent | [examples/agent-rules/AGENTS-hig.md](./examples/agent-rules/AGENTS-hig.md) → `AGENTS.md` |

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## License

This project is licensed under the [MIT License](./LICENSE).
