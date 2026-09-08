# Modern Web HIG

A universal Human Interface Guidelines (HIG) and product-engine contract for modern web applications, commerce sites, and content platforms.

**Current version:** [v1.5.0](./HIG.md)

## What is this?

The Modern Web HIG defines design principles, information architecture, state machines, interaction rules, accessibility standards, and programmatic execution constraints for building high-quality web experiences. It is organized as a **9-Layer Governance Framework**:

| Layer | Focus |
|---|---|
| 0 | Applicability & Scope — page archetypes and mandatory rule matrix |
| 1 | UX Principles — motion, functional micro-animations, density, spatial ergonomics |
| 2 | Information Architecture — document fundamentals, navigation, i18n/RTL |
| 3 | Visual & Design Tokens — contrast-verified three-tier token system |
| 4 | Interaction & State — state machines, optimistic UI, data protection |
| 5 | Accessibility — WCAG 2.2 AA, keyboard navigation, focus management |
| 6 | Performance — Core Web Vitals budgets (INP, LCP, CLS, TTFB) |
| 7 | AI & Agent Enforcement — machine-readable guardrails for coding agents |
| 8 | Quality Assurance — CI/CD gates and automated build standards |

## Who is this for?

- **Designers and engineers** building web apps, dashboards, commerce flows, or marketing sites
- **AI coding agents** (Cursor, Claude Code, GitHub Copilot) that need deterministic, lintable UI constraints
- **Teams** establishing shared UX, a11y, and performance standards across products

## Quick start

1. Read the full contract: **[HIG.md](./HIG.md)**
2. Identify your page archetype (Content/Marketing, Commerce, Application, or Auth/Account)
3. Apply the Layer 0 applicability matrix to determine which rules are mandatory for your context
4. Wire the Layer 7 ESLint/Stylelint rules and Layer 8 CI gates into your pipeline

## Integrate into your workflow

For product teams and coding agents, follow **[INTEGRATION.md](./INTEGRATION.md)** — an efficient path that avoids dumping the full HIG into every prompt:

1. **Pin** `HIG.md` in the product repo (vendor copy, submodule, or tagged URL)
2. **Declare archetypes** once (`docs/hig-scope.md` — see [examples/hig-scope.example.md](./examples/hig-scope.example.md))
3. **Wire agents** with the copy-paste templates in [examples/agent-rules/](./examples/agent-rules/) (Cursor, Claude Code, Copilot, `AGENTS.md`)
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
