# The Web HIG

**AI-native behavioral standard for the modern web.**

An open, vendor-neutral standard for how web interfaces should behave — for your team, your design system, and your AI coding tools.

**[Quick Reference](./HIG-QUICK.md)** · **[Live demo](https://hig.aruviflow.com/)** · **[View on GitHub](https://github.com/frozonfreak/hig)** · **[Documentation site](https://frozonfreak.github.io/hig/)** · **[Integrate](./INTEGRATION.md)**

**Current version:** [v1.9.0](./HIG.md) · [Release notes](./RELEASE_NOTES.md)

---

> **Not a component library.** A behavioral contract for modern web applications that humans and AI coding agents can follow and validate. You keep your design system, framework, and components — The Web HIG defines how they should work together.

**Design systems define *what* your UI looks like.**  
**The Web HIG defines *how* it behaves.**

Unlike traditional UX guidelines, every requirement can be referenced, loaded selectively, and eventually enforced by tooling and AI agents.

---

## Why another standard?

The web already has HTML standards, WCAG guidelines, CSS conventions, and design systems — but there is no widely adopted, vendor-neutral behavioral contract that brings these concerns together for modern web applications and AI-assisted development.

| Standard | Role |
|---|---|
| WCAG | Accessibility |
| Design systems | Visual consistency |
| Frameworks | Implementation |
| **The Web HIG** | **Behavioral contract** |

**Where this fits:**

```
Web platform     HTML / CSS / JS
      ↓
Accessibility    WCAG
      ↓
Design system    MUI / shadcn / custom
      ↓
The Web HIG    behavior, states, UX, performance, security, enforcement
      ↓
Application
      ↓
AI / CI validation
```

| Existing approach | What it gives you | What it misses |
|---|---|---|
| Component libraries (MUI, Bootstrap, shadcn/ui) | Pre-built widgets | No shared rules for error recovery, delete flows, or token discipline |
| Platform HIGs (Apple, Material Design) | Polished vendor guidance | Portability across web stacks and AI tooling |
| Style guides | Colors, typography, brand | Behavior, states, performance targets, security UX |
| WCAG | Accessibility compliance | Performance, mutations, CI enforcement, AI agent rules |

The Web HIG fills that gap: a versioned, lintable standard that teams and AI coding agents can pin in any product repo — without replacing your stack.

---

## One standard. Three levels.

Progressive disclosure — load only what you need. Pin [HIG-QUICK.md](./HIG-QUICK.md) instead of the 20,000-token full document.

| Level | Document | When to use |
|---|---|---|
| **Quick** | [HIG-QUICK.md](./HIG-QUICK.md) — 98 rules, ~5 min | Default for daily work and AI agents |
| **Practical** | [HIG-LITE.md](./HIG-LITE.md) + [rules/](./rules/) | Building features — rule IDs, topic modules, archetype packs |
| **Full** | [HIG.md](./HIG.md) | Edge cases, spec conflicts, CI gate definitions |

**Tell an AI:** *"Follow The Web HIG Quick Reference."*

```
                         THE WEB HIG
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

---

## Built for humans and AI agents

```
Developer → HIG → AI agent → Code → Validation → CI
```

- **Developers & designers** — shared standards for UX, accessibility, tokens, and performance. Written for humans first.
- **AI coding agents** — token-efficient three-layer model, stable rule IDs, YAML guardrails for Cursor, Copilot, and Claude Code.

| Tool | Template |
|---|---|
| Cursor | [examples/agent-rules/cursor-hig.mdc](./examples/agent-rules/cursor-hig.mdc) → `.cursor/rules/hig.mdc` |
| Claude Code | [examples/agent-rules/CLAUDE-hig.md](./examples/agent-rules/CLAUDE-hig.md) → merge into `CLAUDE.md` |
| GitHub Copilot | [examples/agent-rules/copilot-instructions-hig.md](./examples/agent-rules/copilot-instructions-hig.md) → `.github/copilot-instructions.md` |
| Multi-agent | [examples/agent-rules/AGENTS-hig.md](./examples/agent-rules/AGENTS-hig.md) → `AGENTS.md` |

---

## Start here

| If you are… | Start with… |
|---|---|
| **A developer** | [HIG-QUICK.md](./HIG-QUICK.md) — 98 rules, ~5 minutes, then pin in your repo |
| **A designer** | Essential rules for states, tokens, accessibility, and motion in [HIG-QUICK.md](./HIG-QUICK.md) |
| **Building with AI** | [Agent rule templates](./examples/agent-rules/) for Cursor, Copilot, or Claude Code |
| **Adopting the standard** | [INTEGRATION.md](./INTEGRATION.md) — pin, map routes, wire tools |

---

## Try it in one afternoon

1. **Pin the contract** — copy `HIG-QUICK.md`, `HIG-LITE.md`, `HIG.md`, `rules/`, and `VERSION` into your repo (e.g. `docs/hig/`)
2. **Map your pages** — create `docs/hig-scope.md` with routes and page archetypes (Content, Commerce, Application, or Auth). See [examples/hig-scope.example.md](./examples/hig-scope.example.md)
3. **Wire your tools** — add agent rules from [examples/agent-rules/](./examples/agent-rules/)
4. **Review and automate** — use the Quick Reference in PRs; add ESLint/CI gates when ready

Full adoption guide: **[INTEGRATION.md](./INTEGRATION.md)**

---

## What's inside

98 rules · 16 topic modules · 4 page archetypes · 10 governance layers

| Layer | Focus |
|---|---|
| 0 | Applicability & Scope — page archetypes and mandatory rule matrix |
| 1 | UX Principles — motion, functional micro-animations, density, spatial ergonomics |
| 2 | Information Architecture — document fundamentals, navigation, i18n/RTL |
| 3 | Visual & Design Tokens — contrast-verified three-tier token system |
| 4 | Interaction & State — server-driven rendering, state machines, optimistic UI, data protection |
| 5 | Accessibility — WCAG 2.2 AA conformance, keyboard navigation, focus management |
| 6 | Performance — Core Web Vitals (LCP, INP, CLS) + supporting metrics |
| 7 | AI & Agent Enforcement — rule IDs, severity, machine-readable guardrails |
| 8 | Quality Assurance — blocking/warning/observation CI/CD gates |
| 9 | Security & Privacy — CSP, XSS/CSRF, PII handling, auth UX, audit logging |

**Supporting files:** [HIG-CORE.md](./HIG-CORE.md) · [rules/INDEX.md](./rules/INDEX.md) · [rules/manifest.yaml](./rules/manifest.yaml) · [VERSION](./VERSION)

Explore the full specification on the **[documentation site](https://frozonfreak.github.io/hig/)** or try the **[live demo](https://hig.aruviflow.com/)**.

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## License

This project is licensed under the [MIT License](./LICENSE).
