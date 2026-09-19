# The Web HIG

[![Version](https://img.shields.io/github/v/tag/frozonfreak/hig?label=version&color=1d4ed8)](https://github.com/frozonfreak/hig/releases)
[![License: MIT](https://img.shields.io/github/license/frozonfreak/hig)](./LICENSE)
[![CI](https://github.com/frozonfreak/hig/actions/workflows/validate.yml/badge.svg)](https://github.com/frozonfreak/hig/actions/workflows/validate.yml)
[![Pin me](https://img.shields.io/badge/Pin_me-HIG--QUICK.md-0f172a)](./HIG-QUICK.md)

**Keep your design system. Pin a versioned contract for how web interfaces behave.**

Vendor-neutral, testable rules for interaction, states, accessibility (WCAG 2.2 AA), performance, and security UX — for product teams, design systems, CI, and AI coding agents. You keep your stack and visuals; The Web HIG defines behavior you can cite and validate.

### Start in one file

**[HIG-QUICK.md](./HIG-QUICK.md)** (~5 minutes) is the whole onboarding path. Pin it: copy `HIG-QUICK.md` + `VERSION` into `docs/hig/` (or use [packages/install](./packages/install/)). Tell agents: *"Follow The Web HIG Quick Reference."* Open [HIG-LITE.md](./HIG-LITE.md) only when you need rule IDs, and [HIG.md](./HIG.md) only for edge cases.

**Current release:** [v1.10.1](./VERSION) · [Changelog](./CHANGELOG.md) · [Release notes](./RELEASE_NOTES.md)

**[Live demo](https://hig.aruviflow.com/)** · **[Documentation site](https://frozonfreak.github.io/hig/)** · **[Integrate](./INTEGRATION.md)** · **[Adopters](./ADOPTERS.md)**

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
| [EVALUATOR.md](./EVALUATOR.md) | Multidimensional CI/evaluator report contract (Layer 8) |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Spec changes and governance |
| [ADOPTERS.md](./ADOPTERS.md) | Real projects pinning the contract |
| [INTEGRATION.md](./INTEGRATION.md) | Step-by-step adoption in product repos |
| [skills/](./skills/) | Ready-to-copy agent skills (Cursor, Claude, Copilot, Windsurf) |
| [packages/install](./packages/install/) | `npx @web-hig/install` |
| [SHARE.md](./SHARE.md) | Share badge and copy-paste markdown with UTM parameters |
| [examples/](./examples/) | Scope templates, agent rules, walkthroughs |

---

## Start here

Everyone starts in **[HIG-QUICK.md](./HIG-QUICK.md)**. The rows below are optional next steps, not a second onboarding path.

| Role | After HIG-QUICK |
| --- | --- |
| Developer | Pin `HIG-QUICK.md` + `VERSION` in `docs/hig/` |
| Designer | Same file — states, tokens, motion, accessibility |
| AI / agent setup | `npx @web-hig/install` or [skills/](./skills/) |
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

| Tool | Always-on rule | Skill |
| --- | --- | --- |
| Cursor | [examples/agent-rules/cursor-hig.mdc](./examples/agent-rules/cursor-hig.mdc) | `.cursor/skills/web-hig/` |
| Claude Code | [examples/agent-rules/CLAUDE-hig.md](./examples/agent-rules/CLAUDE-hig.md) | `.claude/skills/web-hig/` |
| GitHub Copilot | [examples/agent-rules/copilot-instructions-hig.md](./examples/agent-rules/copilot-instructions-hig.md) | `.github/skills/web-hig/` |
| Windsurf | [examples/agent-rules/windsurf-hig.md](./examples/agent-rules/windsurf-hig.md) | `.windsurf/skills/web-hig/` |
| Multi-agent | [examples/agent-rules/AGENTS-hig.md](./examples/agent-rules/AGENTS-hig.md) | — |

Canonical skill: [skills/web-hig/SKILL.md](./skills/web-hig/SKILL.md). Copy map: [skills/README.md](./skills/README.md).

Machine-readable loading today: [rules/manifest.yaml](./rules/manifest.yaml) · Roadmap: [MACHINE_READABLE.md](./MACHINE_READABLE.md)

---

## Try it in one afternoon

1. **Install** — `npx @web-hig/install` pins `HIG-QUICK.md` and copies agent rules plus skills ([packages/install](./packages/install/))
2. **Scope** — edit `docs/hig-scope.md` for your routes ([examples/hig-scope.example.md](./examples/hig-scope.example.md))
3. **Escalate** — `npx @web-hig/install --profile practical` when you need HIG-LITE + modules
4. **Validate upgrades** — `npm run validate` in this repo when bumping pins

Manual copy: [PROFILES.md](./PROFILES.md) · Walkthrough: [examples/adoption/quick-profile-walkthrough.md](./examples/adoption/quick-profile-walkthrough.md)

---

## Specification contents (summary)

98 quick rules · 17 topic modules · 4 page archetypes · Layers 0–9

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

## Share this HIG

Copy a badge into your README, blog, or docs. Every link points back to this repo with UTM parameters so inbound clicks can be attributed by source.

![The Web HIG](https://frozonfreak.github.io/hig/badge.svg)

```markdown
[![The Web HIG](https://frozonfreak.github.io/hig/badge.svg)](https://github.com/frozonfreak/hig?utm_source=github_readme&utm_medium=badge&utm_campaign=share)
```

More placements (docs, blog, social, HTML) and the UTM convention: [SHARE.md](./SHARE.md). Interactive copy: [documentation site](https://frozonfreak.github.io/hig/#share).

---

## Contributing & license

Contributions welcome — read [CONTRIBUTING.md](./CONTRIBUTING.md). Code of conduct: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

Licensed under [MIT](./LICENSE).
