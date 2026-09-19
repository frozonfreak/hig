# Rationale — The Web HIG

**Status:** Informative (non-normative) · **Spec version:** see [VERSION](./VERSION)

This document explains *why* The Web HIG exists, what problems it optimizes for, and what it deliberately is not. Normative requirements live in [HIG.md](./HIG.md).

---

## Problem statement

Modern web products combine:

- Platform standards (HTML, CSS, ARIA)
- Accessibility law and guidance (WCAG)
- Design systems (visual language)
- Application frameworks (React, Vue, etc.)
- AI-assisted development (agents that generate UI at scale)

Each layer solves part of the problem. None of them define a **portable, versioned behavioral contract** for product UX: error recovery, destructive actions, loading and empty states, token discipline, server-driven rendering defaults, performance budgets, and security-sensitive flows — in terms humans and tools can cite consistently.

Checklists and blog posts fill the gap informally. They do not pin semver, do not map to CI severity, and do not compose with agent context windows.

---

## Design goals

| Goal | How the standard addresses it |
| --- | --- |
| **Testable behavior** | RFC 2119 vocabulary, stable rule IDs (`HIG-*`), Layer 8 CI gate classes |
| **Progressive disclosure** | Three consumption layers — [HIG-QUICK.md](./HIG-QUICK.md), [HIG-LITE.md](./HIG-LITE.md) + [rules/](./rules/), [HIG.md](./HIG.md) |
| **Scope before rules** | Layer 0 page archetypes (content, commerce, application, auth) reduce over-application |
| **Stack neutrality** | Framework adapters under [framework/](./framework/); Layer 4 reference architecture is not vendor-locked |
| **Human + machine** | [rules/manifest.yaml](./rules/manifest.yaml) for topic loading; Layer 7 guardrails; path to full rule registry ([MACHINE_READABLE.md](./MACHINE_READABLE.md)) |
| **Adopt without rewrite** | Pin the contract in `docs/hig/`; keep your components and design tokens |

---

## Non-goals

The Web HIG is **not**:

- A component library or Figma kit
- A replacement for WCAG, HTML, or platform APIs
- A brand or visual identity system (use your design system for *look*; HIG for *behavior*)
- A catalog of every award-site layout (use **HIG-EXP-**\* baseline for fluid/expressive *obligations* on content surfaces)
- A single mandatory bundle of every rule on every page (Layer 0 applicability matrix applies)

---

## Why not “just use WCAG + a design system”?

WCAG answers *accessibility conformance*. Design systems answer *visual consistency*. Neither standardizes:

- Optimistic UI and destructive mutation flows
- Error / empty / loading taxonomies tied to state machines
- Token usage rules (raw hex bans, motion budgets, container-query layout)
- Server rendering defaults and streaming boundaries for app archetypes
- Agent-facing enforcement severity and autofix safety

The Web HIG sits **between** design system and application code — same role as a platform HIG, but **vendor-neutral** and **web-native**.

---

## Relationship to other standards

```
┌─────────────────────────────────────────────────────────┐
│  W3C / WHATWG — HTML, CSS, ARIA (platform)              │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  WCAG 2.2 — accessibility conformance target            │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  Your design system — color, type, components (visual)  │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  The Web HIG — behavior, states, perf, security UX,     │
│  enforcement (this repository)                          │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  Application — routes, data, business logic             │
└─────────────────────────────────────────────────────────┘
```

Where WCAG and HIG overlap (e.g. focus visibility), HIG rule IDs point to the same bar — WCAG 2.2 Level AA is the accessibility target ([HIG-A11Y-002](./rules/accessibility.md)).

---

## Competitive landscape

There is no single direct competitor. The Web HIG sits in the **gap** between accessibility conformance, widget patterns, vendor design systems, engineering guidance, and quality tooling. It does not replace those systems; it connects product behaviour, states, architecture, and enforcement into one versioned contract.

| System | Main responsibility | Where HIG differs |
| --- | --- | --- |
| **W3C / WCAG** | Accessibility conformance | HIG covers whole-product behaviour; WCAG remains the a11y target ([HIG-A11Y-002](./rules/accessibility.md)). HIG is not a WCAG wrapper ([Non-goals](#non-goals)). |
| **WAI-ARIA APG** | Accessible widget interaction | Closest *philosophical* relative: it turns specs into practical patterns. Scope is accessibility and interaction semantics, not complete product behaviour (mutations, loading taxonomies, SSR defaults, CI severity). |
| **Open UI** | Standardizing browser UI primitives | HIG governs application behaviour *above* the browser. Open UI proposes work to standards bodies rather than defining the final platform standards itself. |
| **Material Design** | Google’s design system | Visual/component system, not a vendor-neutral behavioral contract. Switching from MUI to Tailwind/shadcn changes that layer; HIG rules still apply. |
| **Fluent** | Microsoft’s design system | Same issue: product/design ecosystem rather than a portable web behaviour contract. |
| **Carbon** | IBM product/design system | Enterprise component/design system; HIG is stack-neutral governance for whatever components you already use. |
| **GOV.UK Design System** | Government service patterns | Very strong UX patterns, but domain-specific (UK government services). |
| **web.dev** | Web engineering guidance | Excellent material, distributed as articles rather than a pinned, versioned contract with rule IDs and CI severity. |
| **Lighthouse** | Automated quality auditing | Measurement/tool. HIG evaluators MUST NOT be a single-score Lighthouse clone ([EVALUATOR.md](./EVALUATOR.md), HIG.md §8.2). |
| **The Web HIG** | Product behaviour + states + architecture + enforcement | Attempts to connect those layers without replacing the systems above. |

**WAI-ARIA APG** is the closest existing analogue in method: synthesize underlying specifications into practical patterns. Its scope is intentionally accessibility and interaction semantics.

**Open UI** is an important comparison for *controls*. Its goal is to standardize anatomy, states, and behaviour of common controls so capabilities can land in HTML/CSS/ARIA/Web APIs. That is platform work. HIG is application-behaviour work sitting on top of the platform.

HIG does not need to replace either one. Explicit non-goals include replacing WCAG, HTML, or platform APIs, and shipping a component library ([ROADMAP.md](./ROADMAP.md)).

### What is packaged together here

Three things are rarely one normative, versioned contract elsewhere:

1. **Behaviour rather than appearance.** Design systems define *what* UI looks like. A rule such as **HIG-MUT-001** (destructive mutations MUST NOT use conventional optimistic confirmation) does not care whether the control came from MUI, Radix, Bootstrap, or hand-written HTML.
2. **Application state as UX.** Loading, error, empty, stale, offline, destructive mutation, and recovery are first-class ([rules/states.md](./rules/states.md), [rules/mutations.md](./rules/mutations.md)) — not optional polish bolted onto a component kit.
3. **AI coding-agent consumption.** Stable rule IDs, Quick/Practical/Full profiles ([PROFILES.md](./PROFILES.md)), machine-readable [rules/manifest.yaml](./rules/manifest.yaml) with topic triggers, explicit severity, exception mechanics, and agent templates. **Policy-as-code** for agents is planned ([ROADMAP.md](./ROADMAP.md)), not yet shipped.

---

## Conformance profiles

Not every product needs the full specification in daily work. See [PROFILES.md](./PROFILES.md):

- **Quick Reference profile** — Layer 1 for agents and PR review
- **Practical profile** — Layer 2 modules + archetype packs for feature work
- **Full specification profile** — Layer 3 for disputes, audits, and CI gate definitions

---

## Evolution

Changes are governed by [Semantic Versioning](./VERSIONING.md) and [CONTRIBUTING.md](./CONTRIBUTING.md). User-facing narrative per release: [RELEASE_NOTES.md](./RELEASE_NOTES.md). Machine-oriented history: [CHANGELOG.md](./CHANGELOG.md) and [HIG.md §8.1](./HIG.md#81-version-history).

Planned work: [ROADMAP.md](./ROADMAP.md).
