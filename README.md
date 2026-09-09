# Modern Web HIG

A universal Human Interface Guidelines (HIG) and product-engine contract for modern web applications, commerce sites, and content platforms.

> **Note:** This is not a UI component library (like MUI or Bootstrap). It is a set of governance rules for your existing design system and AI agents.

**Current version:** [v1.9.0](./HIG.md) · [Release notes](./RELEASE_NOTES.md) · **[Documentation site](https://frozonfreak.github.io/hig/)**

## What is this?

The Modern Web HIG defines design principles, information architecture, state machines, interaction rules, accessibility standards, and programmatic execution constraints for building high-quality web experiences. It is organized as a **10-Layer Governance Framework**:

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

## Progressive loading (v1.9.0)

The HIG is layered for token-efficient agent and team workflows:

```
                    MODERN WEB HIG
                          │
             ┌────────────┼────────────┐
             │            │            │
       HIG-CORE.md   HIG-LITE.md     HIG.md
        Level 0       Level 1       Level 3
       Philosophy    AI default     Complete
       + archetypes  daily context  specification
                          │
                    rules/INDEX.md
                    rules/manifest.yaml
                       Level 2
                    Topic-triggered
                    deep lookups
```

| File | Use |
|---|---|
| [HIG-CORE.md](./HIG-CORE.md) | Session preamble — vocabulary, archetypes, HIG-SIM-001 |
| [HIG-LITE.md](./HIG-LITE.md) | **Default agent context** — essential rules with rule ID links |
| [rules/archetypes/](./rules/archetypes/) | **Archetype packs** — preload correct modules per page type |
| [VERSION](./VERSION) | Single version pin for product repos and CI |
| [rules/INDEX.md](./rules/INDEX.md) | Human-readable topic index and rule ID registry |
| [rules/manifest.yaml](./rules/manifest.yaml) | Machine-readable load triggers for Level 2 modules |
| [rules/*.md](./rules/) | Standalone topic modules (accessibility, forms, architecture, …) |
| [framework/*.md](./framework/) | React, Next.js, Vue, Nuxt, Astro adapters |
| [HIG.md](./HIG.md) | Full normative contract — edge cases and deep reference |

HIG-LITE is a compressed summary of HIG — not a separate standard. Every Lite rule maps to a canonical rule ID in the full specification.

## Who is this for?

- **Designers and engineers** building web apps, dashboards, commerce flows, or marketing sites
- **AI coding agents** (Cursor, Claude Code, GitHub Copilot) that need deterministic, lintable UI constraints
- **Teams** establishing shared UX, a11y, and performance standards across products

## Quick start

1. Read the essential rules: **[HIG-LITE.md](./HIG-LITE.md)** (most tasks)
2. Identify your page archetype (Content/Marketing, Commerce, Application, or Auth/Account)
3. Apply the Layer 0 applicability matrix to determine which rules are mandatory for your context
4. Open **[HIG.md](./HIG.md)** for full detail when needed
5. Wire the Layer 7 ESLint/Stylelint rules and Layer 8 CI gates into your pipeline
6. Run `npm run validate` to verify contract integrity when upgrading pins

## Integrate into your workflow

For product teams and coding agents, follow **[INTEGRATION.md](./INTEGRATION.md)** — an efficient path that avoids dumping the full HIG into every prompt:

1. **Pin** `HIG.md` + `HIG-LITE.md` in the product repo (vendor copy, submodule, or tagged URL)
2. **Declare archetypes** once (`docs/hig-scope.md` — see [examples/hig-scope.example.md](./examples/hig-scope.example.md))
3. **Wire agents** with Level 1 default context + Layer 7 YAML from [examples/agent-rules/](./examples/agent-rules/)
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
