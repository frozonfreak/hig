# HIG Evaluator Report Contract

**Status:** Informative (tooling contract) · **Spec version:** see [VERSION](./VERSION)  
**Layer 8 basis:** [HIG.md §8](./HIG.md#layer-8-quality-assurance--cicd-gates) · **Machine-readable:** [schema/evaluator-report.schema.json](./schema/evaluator-report.schema.json)

The Web HIG is **multidimensional**. Evaluators (CI, PR bots, local CLI, agent audits) MUST NOT reduce conformance to a single headline number such as `HIG Score: 83/100` without the full report structure below.

This is intentionally **not** a Lighthouse clone: scores supplement **rule-level findings** tied to `HIG-*` IDs, archetype scope, and Layer 8 gate severity.

---

## Required report shape

### 1. Severity summary (primary pass/fail signal)

Maps to Layer 8 gate levels:

| Bucket | Layer 8 | Typical source |
| --- | --- | --- |
| **BLOCKING** | Fails build/PR | `severity: error`, HIG MUST violations, critical a11y/security |
| **WARNINGS** | Reported | `severity: warning`, SHOULD violations, regressions |
| **OBSERVATIONS** | Tracked | `severity: info`, field RUM, advisory checks |

```
BLOCKING       3
WARNINGS      12
OBSERVATIONS  19
```

**Build status** MUST derive from **BLOCKING** (and project gate policy), not from `overall_score`.

### 2. Dimension block (required)

Fixed dimensions (bucket rule IDs via [rules/evaluator-dimensions.yaml](./rules/evaluator-dimensions.yaml)):

| Key | Label | Typical rule prefixes / modules |
| --- | --- | --- |
| `accessibility` | Accessibility | `HIG-A11Y-*` |
| `ux` | UX | `HIG-UX-*`, `HIG-SIM-*`, states, forms, notifications |
| `performance` | Performance | Layer 6, [performance.md](./rules/performance.md) |
| `security` | Security | `HIG-SEC-*` |
| `architecture` | Architecture | `HIG-SSR-*`, `HIG-MUT-*`, architecture module |
| `responsive` | Responsive | `HIG-CQ-*`, `HIG-I18N-*` |
| `motion` | Motion | `HIG-MOT-*`, `HIG-VT-*`, `HIG-EXP-*` |
| `seo` | SEO | Document metadata / structured data (content, commerce) |

Each dimension MUST include:

- `score` (0–100) — **supplementary**; see scoring policy below  
- `blocking`, `warnings`, `observations` counts for that dimension  

Example (human-readable):

```
HIG Compliance
────────────────
Accessibility       94
UX                  87
Performance         78
Security            91
Architecture        82
Responsive          95
Motion              88
SEO                 90

Overall              88
```

### 3. Findings list (required)

Every blocking and warning SHOULD appear as a structured finding:

```json
{
  "rule_id": "HIG-A11Y-004",
  "dimension": "accessibility",
  "severity_bucket": "blocking",
  "message": "Icon button missing accessible name.",
  "location": "src/components/menu.tsx:42"
}
```

### 4. Overall score (optional, deprioritized)

`overall_score` MAY be emitted as a weighted mean of dimension scores. It MUST NOT be the only exported metric. UIs SHOULD list dimensions and severity counts before overall.

---

## Anti-patterns

| Do not | Do instead |
| --- | --- |
| Publish `HIG Score: 83/100` alone | Full report: severity summary + dimensions + findings |
| Fail/pass on overall score | Fail on BLOCKING count and gate policy |
| Collapse WCAG into one number | Keep Accessibility dimension + cite `HIG-A11Y-*` / WCAG refs in findings |
| Score dimensions with zero applicable checks without marking `applicable: false` | Mark SEO N/A for pure auth routes, etc. |

---

## Scoring policy (informative default)

Scores are **secondary** to counts and rule IDs. Recommended default per dimension:

\[
\text{score} = \mathrm{round}\left(100 \times \frac{\text{passed applicable checks}}{\max(\text{applicable checks}, 1)}\right)
\]

where a check fails if it produced a finding in that dimension at blocking or warning severity (observations may optionally be excluded from the numerator).

Tools MUST document any alternate weighting. See `scoring` in [rules/evaluator-dimensions.yaml](./rules/evaluator-dimensions.yaml).

---

## Scope metadata

Reports MUST include:

- `hig_version` — pinned contract ([VERSION](./VERSION))  
- `scope.archetype` — Layer 0  
- `scope.surface` — when `content` (`document` \| `hybrid` \| `experience`)  
- `evaluator.name` / `evaluator.version` — which tool produced the report  

Only rules **applicable** to that archetype/surface (see [applicability.md](./rules/applicability.md)) SHOULD count toward denominators.

---

## JSON schema & example

| Artifact | Purpose |
| --- | --- |
| [schema/evaluator-report.schema.json](./schema/evaluator-report.schema.json) | Validate machine output |
| [examples/evaluator-report.example.json](./examples/evaluator-report.example.json) | Reference payload |
| [rules/evaluator-dimensions.yaml](./rules/evaluator-dimensions.yaml) | Dimension ↔ rule prefix map |

---

## Implementation status

No reference evaluator CLI ships in this repository yet. [ROADMAP.md](./ROADMAP.md) tracks `eslint-plugin-hig`, `rules/registry.yaml`, and evaluator tooling. Until then, adopt this contract in custom CI aggregators (ESLint + axe + custom HIG checks).

---

## Agent / PR comment template

When summarizing for humans, use this order:

1. `build_status` + BLOCKING / WARNINGS / OBSERVATIONS  
2. Table of dimension scores with per-dimension severity counts  
3. Top blocking findings (rule ID + location)  
4. Overall score last, if at all  
