# Integrating Modern Web HIG into your development workflow

This guide shows an **efficient** way to adopt the Modern Web HIG in a product repo: progressive loading, thin agent rules, then lint/CI — without pasting the full contract into every prompt.

**Current contract:** [HIG.md](./HIG.md) v1.8.0 (see README for version).

---

## Progressive loading levels

| Level | File | Load when |
| --- | --- | --- |
| **0** | [HIG-CORE.md](./HIG-CORE.md) | Session start — philosophy, vocabulary, archetypes |
| **1** | [HIG-LITE.md](./HIG-LITE.md) | **Every UI/CSS/front-end task** (default) |
| **2** | [rules/*.md](./rules/) + [framework/*.md](./framework/) via [manifest.yaml](./rules/manifest.yaml) | Task matches a topic (combobox, forms, SSR, security…) |
| **3** | [HIG.md](./HIG.md) | Edge cases, spec conflicts, full normative detail |

**Do not** dump all of `HIG.md` into every system prompt. Agents work better with:

1. [HIG-LITE.md](./HIG-LITE.md) as default context (Level 1)
2. Topic-triggered lookups via [rules/manifest.yaml](./rules/manifest.yaml) (Level 2)
3. A short always-on agent rule (archetype + Layer 7 YAML)
4. CI as the hard backstop (Layer 8)

---

## Efficient adoption path

| Stage | Effort | What you get |
| --- | --- | --- |
| **1. Agent rules** | Minutes | Agents use HIG-LITE by default; load Level 2 modules on topic match |
| **2. Scope doc** | Minutes | Humans and agents share one archetype map for the product |
| **3. PR checklist** | Minutes | Reviewers catch HIG regressions without waiting on custom linters |
| **4. Lint + CI** | Hours | Layer 8 gates fail the build on a11y/perf/token violations |

Do stages 1–3 on day one. Add stage 4 when you can automate the Layer 7 rules (custom ESLint/Stylelint or equivalent).

---

## Step 1 — Pin the contract in your product repo

Pick one pinning strategy and stick to it:

| Strategy | When to use |
| --- | --- |
| **Vendor copy** | Fastest: copy `HIG.md`, `HIG-LITE.md`, `rules/`, and `framework/` into e.g. `docs/hig/` and note the version in your README |
| **Git submodule / subtree** | You want upstream pulls without manual copy |
| **Raw URL pin** | Agent rules link to tagged release files (e.g. `.../blob/v1.8.0/HIG-LITE.md`) |

**Minimum pin set for agents:**

| File | Purpose |
| --- | --- |
| `HIG-LITE.md` | Default daily context |
| `HIG.md` | Full specification (Level 3) |
| `rules/manifest.yaml` | Topic-triggered loading |
| `rules/*.md` | Standalone topic modules |
| `framework/*.md` | Framework adapters (React, Next, Vue, Nuxt, Astro) |
| `rules/INDEX.md` | Human-readable rule index |

Record the pinned version next to the files (e.g. `docs/hig/VERSION` containing `1.8.0`) so upgrades are intentional.

---

## Step 2 — Declare page archetypes once

Create a short product-local scope file (example: `docs/hig-scope.md`):

```markdown
# HIG scope for this product

Pinned contract: Modern Web HIG v1.8.0
- Daily context: `docs/hig/HIG-LITE.md`
- Full spec: `docs/hig/HIG.md`
- Topic index: `docs/hig/rules/manifest.yaml`

| Route / area | Archetype | Notes |
| --- | --- | --- |
| `/`, `/blog/*` | Content / Marketing | SEO mandatory |
| `/products/*`, `/cart`, `/checkout` | Commerce | Checkout = unsaved-changes protection |
| `/app/*`, `/admin/*` | Application | Server rendering + mutation state machines |
| `/login`, `/settings` | Auth / Account | No decorative motion |

Default for new UI: Application unless the route map says otherwise.
```

Agents and humans should resolve archetype **before** applying Layers 1–9 (see HIG Layer 0).

---

## Step 3 — Wire coding agents

Copy the templates under [`examples/agent-rules/`](./examples/agent-rules/) into your product repo. Keep the always-on rule **short**; default to HIG-LITE, not the full HIG.

### Loading workflow for agents

1. **Always:** Read `HIG-LITE.md` (Level 1) + resolve archetype from scope doc
2. **On topic match:** Consult `rules/manifest.yaml` → open matching `rules/*.md` module (Level 2); load `framework/*.md` when stack-specific
3. **On edge case:** Open `HIG.md` (Level 3)
4. **Always:** Apply Layer 7 YAML guardrails from the agent rule file
5. **Cite rule IDs** when declining conflicting requests (e.g. `HIG-A11Y-003`)

### Cursor

1. Copy `examples/agent-rules/cursor-hig.mdc` → `.cursor/rules/hig.mdc`
2. Set `alwaysApply: true`, or use globs such as `**/*.{tsx,jsx,css,scss}`
3. Point the rule at your pinned `HIG-LITE.md`, `HIG.md`, `rules/manifest.yaml`, and `docs/hig-scope.md`

### Claude Code

1. Copy `examples/agent-rules/CLAUDE-hig.md` into your project `CLAUDE.md` (merge if you already have one)
2. Keep the Layer 7 YAML block intact

### GitHub Copilot

1. Copy `examples/agent-rules/copilot-instructions-hig.md` → `.github/copilot-instructions.md`
2. Merge with existing Copilot instructions if present

### Generic / multi-agent (`AGENTS.md`)

1. Copy `examples/agent-rules/AGENTS-hig.md` → `AGENTS.md` at the repo root
2. Useful when several tools (Cursor, Claude Code, Codex, etc.) share one instruction file

### Per-task prompt pattern (optional)

When starting a UI task, prepend:

```text
Follow Modern Web HIG v1.8.0.
Default context: docs/hig/HIG-LITE.md (Level 1).
Load docs/hig/rules/<module>.md from manifest.yaml when task matches a topic.
Load docs/hig/framework/<stack>.md when framework-specific.
Archetype: <content|commerce|application|auth> per docs/hig-scope.md.
Apply Layer 0 matrix + Layer 7 guardrails. Cite rule IDs on conflicts.
Prefer simplest compliant implementation (HIG-SIM-001).
Escalate to docs/hig/HIG.md only for edge cases.
```

---

## Step 4 — Human PR checklist (until linters exist)

Add to your PR template (or use as a review checklist):

```markdown
### HIG checklist
- [ ] Archetype identified (Content / Commerce / Application / Auth)
- [ ] Layer 0 matrix applied (no mandatory rules skipped)
- [ ] No raw hex outside token files; semantic/component tokens used
- [ ] No `transition: all` in application-authored CSS; micro-feedback uses duration tokens; ≤300ms
- [ ] Components use `@container` for layout; `@media` only for viewport/preferences/page-level
- [ ] Slow async server regions have streaming boundaries + skeleton; server mutations show pending UI
- [ ] Native HTML preferred over ARIA; icon buttons have accessible names; images have `alt`
- [ ] Modals implement focus containment (not just `aria-modal`); focus ring visible with sufficient contrast
- [ ] Reduced-motion path respected; min 24×24px targets (44px preferred for touch)
- [ ] No optimistic confirmation on destructive mutations without undo/soft-delete
- [ ] Error/empty/loading states use HIG taxonomies (§2.5–2.7)
- [ ] Forms have labels, error summary, and appropriate autocomplete (§2.11)
- [ ] No secrets/PII in client code or logs; CSP configured (Layer 9)
```

---

## Step 5 — Lint and CI (Layer 8)

When ready to automate:

1. Encode Layer 7 constraints as ESLint/Stylelint rules (see HIG §7.2 for the intended `eslint-plugin-hig` rule set)
2. Run axe-core / Playwright a11y at WCAG 2.2 AA on critical routes
3. **Lab/CI gates (blocking)** — synthetic interaction latency, LCP, CLS, TTFB from HIG Layer 6 / 8:
   - Synthetic interaction latency > 200 ms
   - LCP > 2.5 s
   - CLS > 0.10
   - TTFB > 800 ms
4. **Field RUM (observation/SLO)** — field INP, LCP, CLS monitored but not treated as deterministic CI results
5. **Security CI (blocking)** — dependency audit, secret scanning, SAST, CSP/header checks
6. **Visual regression (warning)** — layout, responsive, dark-mode screenshot diffs

Until a shared `eslint-plugin-hig` package is available in your stack, approximate with existing rules (no raw colors, a11y plugin, ban `transition: all` in app CSS) and keep the PR checklist as the gap-filler.

---

## What “done” looks like

A product repo is integrated when:

1. **Pinned** `HIG-LITE.md`, `HIG.md`, and `rules/` exist
2. **`hig-scope.md`** (or equivalent) maps routes → archetypes
3. At least one **agent rule file** defaults to Level 1 and loads Level 2 on topic match
4. PRs use the **HIG checklist** (and CI gates when automated)

That sequence keeps agent context small, enforcement deterministic, and upgrades explicit.
