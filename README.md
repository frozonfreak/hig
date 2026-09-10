# The Web HIG

**An open, versioned behavioral standard for the modern web.**

Vendor-neutral requirements for how web interfaces behave — for design systems, product teams, CI, and AI coding agents. You keep your stack and visuals; The Web HIG defines testable interaction, state, accessibility, performance, and security UX.

**Current release:** [v1.9.0](./VERSION) · [Changelog](./CHANGELOG.md) · [Release notes](./RELEASE_NOTES.md)

**[Quick Reference](./HIG-QUICK.md)** · **[Live demo](https://hig.aruviflow.com/)** · **[Documentation site](https://frozonfreak.github.io/hig/)** · **[Integrate](./INTEGRATION.md)** · **[View on GitHub](https://github.com/frozonfreak/hig)**

---

> **Not a component library.** A behavioral contract humans and agents can pin, cite, and validate.  
> **Design systems define *what* it looks like.** **The Web HIG defines *how* it behaves.**

---

## Standard documentation

| Document | Role |
| --- | --- |
| [RATIONALE.md](./RATIONALE.md) | Why the standard exists, goals, non-goals |
| [SPECIFICATION.md](./SPECIFICATION.md) | Index to normative layers and modules |
| [HIG.md](./HIG.md) | **Normative specification** (Layer 3, full contract) |
| [PROFILES.md](./PROFILES.md) | Lightweight Quick Reference vs Practical vs Full |
| [VERSIONING.md](./VERSIONING.md) | Semver, pinning, upgrades |
| [CHANGELOG.md](./CHANGELOG.md) | Keep a Changelog history |
| [RELEASE_NOTES.md](./RELEASE_NOTES.md) | Adoption-focused release write-ups |
| [ROADMAP.md](./ROADMAP.md) | Contract and tooling direction |
| [MACHINE_READABLE.md](./MACHINE_READABLE.md) | Manifest, rule registry roadmap, linters |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Spec changes and governance |
| [ADOPTERS.md](./ADOPTERS.md) | Real projects pinning the contract |
| [INTEGRATION.md](./INTEGRATION.md) | Step-by-step adoption in product repos |
| [examples/](./examples/) | Scope templates, agent rules, walkthroughs |

---

## Start here

| Role | First read |
| --- | --- |
| Developer | [HIG-QUICK.md](./HIG-QUICK.md) (~5 min) — pin in repo |
| Designer | [HIG-QUICK.md](./HIG-QUICK.md) — states, tokens, motion, a11y |
| AI / agent setup | [examples/agent-rules/](./examples/agent-rules/) |
| Architect / audit | [SPECIFICATION.md](./SPECIFICATION.md) + [HIG.md](./HIG.md) |
| Adopting a team | [PROFILES.md](./PROFILES.md) → [INTEGRATION.md](./INTEGRATION.md) |

**Agent default prompt:** *"Follow The Web HIG Quick Reference."*

---

## One standard, three levels

Progressive disclosure — load only what you need.

| Level | Document | When |
| --- | --- | --- |
| **Quick** | [HIG-QUICK.md](./HIG-QUICK.md) — 98 rules | Daily work, agents, PR review |
| **Practical** | [HIG-LITE.md](./HIG-LITE.md) + [rules/](./rules/) | Features — IDs, modules, archetypes |
| **Full** | [HIG.md](./HIG.md) | Edge cases, CI gates, disputes |

Preamble: [HIG-CORE.md](./HIG-CORE.md) · Topic loading: [rules/manifest.yaml](./rules/manifest.yaml)

```
                    THE WEB HIG
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
 HIG-QUICK.md      HIG-LITE.md          HIG.md
   Layer 1           Layer 2            Layer 3
  ~5 minutes        Practical          Normative
       │                 │
       │           rules/ + framework/
       └─────────────────┴──► Same rule IDs throughout
```

---

## Where this sits in your stack

| Layer | Examples |
| --- | --- |
| Platform | HTML, CSS, ARIA |
| Accessibility | WCAG 2.2 (target in HIG) |
| Design system | MUI, shadcn, custom tokens |
| **The Web HIG** | **Behavior, states, enforcement** |
| Application | Your product code |

More context: [RATIONALE.md](./RATIONALE.md)

---

## Built for humans and AI

```
Developer → pinned HIG → AI agent → Code → Validation → CI
```

| Tool | Template |
| --- | --- |
| Cursor | [examples/agent-rules/cursor-hig.mdc](./examples/agent-rules/cursor-hig.mdc) |
| Claude Code | [examples/agent-rules/CLAUDE-hig.md](./examples/agent-rules/CLAUDE-hig.md) |
| GitHub Copilot | [examples/agent-rules/copilot-instructions-hig.md](./examples/agent-rules/copilot-instructions-hig.md) |
| Multi-agent | [examples/agent-rules/AGENTS-hig.md](./examples/agent-rules/AGENTS-hig.md) |

Machine-readable loading today: [rules/manifest.yaml](./rules/manifest.yaml) · Roadmap: [MACHINE_READABLE.md](./MACHINE_READABLE.md)

---

## Try it in one afternoon

1. **Pin** — copy `VERSION`, `HIG-QUICK.md`, and optional `HIG-CORE.md` to `docs/hig/` ([PROFILES.md](./PROFILES.md))
2. **Scope** — [examples/hig-scope.example.md](./examples/hig-scope.example.md) → `docs/hig-scope.md`
3. **Agents** — one file from [examples/agent-rules/](./examples/agent-rules/)
4. **Validate upgrades** — `npm run validate` when you vendor the full repo

Walkthrough: [examples/adoption/quick-profile-walkthrough.md](./examples/adoption/quick-profile-walkthrough.md)

---

## Specification contents (summary)

98 quick rules · 16 topic modules · 4 page archetypes · Layers 0–9

| Layer | Focus |
| --- | --- |
| 0 | Applicability & archetypes |
| 1 | UX, motion, density |
| 2 | IA, forms, search, notifications, i18n |
| 3 | Tokens, container layout |
| 4 | Server-driven UI, state machines, mutations |
| 5 | Accessibility (WCAG 2.2 AA) |
| 6 | Performance lab & field |
| 7 | Rule IDs, agent guardrails |
| 8 | CI blocking / warning / observation |
| 9 | Security & privacy UX |

Detail: [SPECIFICATION.md](./SPECIFICATION.md) · Module index: [rules/INDEX.md](./rules/INDEX.md)

---

## Contributing & license

Contributions welcome — read [CONTRIBUTING.md](./CONTRIBUTING.md). Code of conduct: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

Licensed under [MIT](./LICENSE).
