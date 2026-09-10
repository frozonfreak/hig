# Contributing to The Web HIG

Thank you for helping improve an **open behavioral standard** for the web. This repository holds the specification and supporting artifacts — not a reference UI library.

**Before you start:** [RATIONALE.md](./RATIONALE.md) (why we exist) · [SPECIFICATION.md](./SPECIFICATION.md) (where normative text lives) · [VERSIONING.md](./VERSIONING.md) (semver rules)

---

## What belongs here

Good contributions:

- Clarifying ambiguous **MUST** / **SHOULD** language or resolving contradictions
- New or refined rules with stable IDs, severity, and archetype applicability
- Layer 0 matrix updates for archetypes
- Synchronized updates across [HIG.md](./HIG.md), [HIG-QUICK.md](./HIG-QUICK.md), [HIG-LITE.md](./HIG-LITE.md), and [rules/*.md](./rules/)
- [rules/INDEX.md](./rules/INDEX.md) and [rules/manifest.yaml](./rules/manifest.yaml) registry entries
- [framework/*.md](./framework/) adapter improvements
- Machine-readable artifacts ([MACHINE_READABLE.md](./MACHINE_READABLE.md), [schema/](./schema/))
- [INTEGRATION.md](./INTEGRATION.md), [examples/](./examples/), and agent templates
- Adopter entries ([ADOPTERS.md](./ADOPTERS.md)) with pinned semver evidence

Out of scope:

- Product-specific components or themes
- Breaking visual redesigns of the docs site without accessibility review
- Secrets or proprietary product code

---

## How to propose a spec change

1. **Search [issues](https://github.com/frozonfreak/hig/issues)** for duplicates.
2. Open a **[Spec change proposal](https://github.com/frozonfreak/hig/issues/new?template=spec-change.yml)** — describe problem, affected layers, and backward compatibility.
3. Fork, branch from `main`, implement focused edits.
4. Run **`npm run validate`** — CI rejects contract integrity failures.
5. Open a PR using [.github/PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md).

### File sync checklist (substantive rule changes)

| Step | File(s) |
| --- | --- |
| Normative text | [HIG.md](./HIG.md) |
| High-frequency imperatives | [HIG-QUICK.md](./HIG-QUICK.md) |
| Practical summary + IDs | [HIG-LITE.md](./HIG-LITE.md) |
| Topic depth | Relevant [rules/*.md](./rules/) |
| Index / triggers | [rules/INDEX.md](./rules/INDEX.md), [rules/manifest.yaml](./rules/manifest.yaml) |
| Version bump | [VERSION](./VERSION), title in HIG.md, manifest `version:` |
| Release docs | [CHANGELOG.md](./CHANGELOG.md), [RELEASE_NOTES.md](./RELEASE_NOTES.md), [HIG.md §8.1](./HIG.md#81-version-history) |

Every Lite and Quick rule **must** map to a canonical rule ID in HIG.md.

---

## Versioning

Follow [Semantic Versioning](https://semver.org/) as documented in [VERSIONING.md](./VERSIONING.md):

| Bump | Examples |
| --- | --- |
| **PATCH** | Typos, non-meaning clarifications |
| **MINOR** | New rules, modules, backward-compatible guidance |
| **MAJOR** | Breaking MUST requirements, token semantics, mandatory matrix |

---

## Writing style

- Prefer **testable** requirements — verifiable by humans, linters, or CI
- Use RFC 2119 keywords consistently (see [HIG-CORE.md](./HIG-CORE.md))
- Tables and diagrams over long prose when they reduce ambiguity
- Mark archetype-specific rules explicitly
- Cite related rule IDs instead of duplicating normative paragraphs

---

## Governance (lightweight)

- **Maintainers** merge PRs that pass CI and align with [RATIONALE.md](./RATIONALE.md) non-goals
- **Major semver** changes should include migration notes in RELEASE_NOTES
- **Disputes** defer to full [HIG.md](./HIG.md) text; open an issue if Layer 1/2 extracts disagree with Layer 3

Roadmap context: [ROADMAP.md](./ROADMAP.md)

---

## Code of conduct

All participants follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

Security issues: [SECURITY.md](./SECURITY.md) — do not open public issues for sensitive reports.
