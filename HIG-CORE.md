# Web HIG — Core (Level 0)

**Version:** v1.9.0 · **Canonical contract:** [HIG.md](./HIG.md) · **Daily agent context:** [HIG-LITE.md](./HIG-LITE.md)

Level 0 is the non-negotiable preamble: philosophy, vocabulary, archetype resolution, and simplicity rule. Load this once per session or merge with Level 1 for new agents.

---

## Purpose

The Web HIG is a **web engineering contract** — not a decorative style guide. Every requirement is testable by humans, linters, or CI where possible.

## Normative vocabulary (RFC 2119)

| Keyword | Meaning |
| --- | --- |
| **MUST** | Mandatory — non-compliance is a defect |
| **MUST NOT** | Prohibited |
| **SHOULD** | Default recommendation — deviate only with documented justification |
| **MAY** | Permitted |

## Archetypes (resolve first)

Before applying any rule, identify the page archetype:

| Archetype | Examples |
| --- | --- |
| **Content / Marketing** | Landing, blog, docs, campaigns |
| **Commerce** | PDP, cart, checkout |
| **Application / Dashboard** | Authenticated tools, admin, workflows |
| **Auth / Account** | Sign-in, recovery, settings |

Apply only the mandatory and conditional rules for that archetype ([HIG.md §0.2](./HIG.md#02-applicability-matrix)). Accessibility, tokens, and performance are **universal** — never optional.

## Simplicity rule

**HIG-SIM-001:** The simplest implementation that satisfies applicable HIG requirements MUST be preferred. Do not satisfy a rule by introducing unnecessary complexity (extra Suspense boundaries, containers, animations, ARIA, or client components).

## Progressive loading levels

| Level | File | When to load |
| --- | --- | --- |
| **0** | `HIG-CORE.md` (this file) | Session start, philosophy, archetype context |
| **1** | [HIG-LITE.md](./HIG-LITE.md) | **Default** for all UI/CSS/front-end work |
| **1.5** | [rules/archetypes/](./rules/archetypes/) | After archetype resolved — preload default module set |
| **2** | [rules/*.md](./rules/) via [manifest.yaml](./rules/manifest.yaml) | Task matches a topic (combobox, forms, SSR, security…) |
| **3** | [HIG.md](./HIG.md) | Edge cases, spec conflicts, full normative detail |

HIG-LITE is a compressed summary of HIG — not a separate standard. Every Lite rule maps to a canonical rule ID in the full specification.
