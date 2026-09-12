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

## Conformance profiles

Not every product needs the full specification in daily work. See [PROFILES.md](./PROFILES.md):

- **Quick Reference profile** — Layer 1 for agents and PR review
- **Practical profile** — Layer 2 modules + archetype packs for feature work
- **Full specification profile** — Layer 3 for disputes, audits, and CI gate definitions

---

## Evolution

Changes are governed by [Semantic Versioning](./VERSIONING.md) and [CONTRIBUTING.md](./CONTRIBUTING.md). User-facing narrative per release: [RELEASE_NOTES.md](./RELEASE_NOTES.md). Machine-oriented history: [CHANGELOG.md](./CHANGELOG.md) and [HIG.md §8.1](./HIG.md#81-version-history).

Planned work: [ROADMAP.md](./ROADMAP.md).
