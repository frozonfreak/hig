# Adopters — The Web HIG

Products and repositories that **pin** The Web HIG (semver + profile) and use it in a development workflow. This list is informational — not certification.

---

## Reference implementations

| Project | Version / profile | Stack | Notes |
| --- | --- | --- | --- |
| [HIG documentation site](https://frozonfreak.github.io/hig/) | v1.12.2 · Full | Static docs | Hosts the standard’s public documentation |
| [Live demo (Aruvi Flow)](https://hig.aruviflow.com/) | v1.12.2 · Practical | Web app | Demonstrates archetypes, surfaces, states, and HIG-aligned UX patterns |
| [This repository](https://github.com/frozonfreak/hig) | v1.12.2 · Full | Markdown, CI | Source of truth; `examples/agent-rules/` consumed by downstream repos |

---

## Community adopters

Add your project with a pull request. Copy a row from the template below into this table.

| Project | Version / profile | Archetypes | How you use it | Link |
| --- | --- | --- | --- | --- |

_No community entries yet — be the first._

### Table row template

```markdown
| [Project name](https://example.com) | v1.12.2 · Practical | Application, Auth | Cursor rule + `docs/hig-scope.md` | [repo](https://github.com/example/project) |
```

---

## Submission template

Copy into your PR description:

```markdown
### Adopter entry

- **Name:**
- **URL:**
- **Pinned HIG version:** (must match docs/hig/VERSION or equivalent)
- **Profile:** Quick Reference | Practical | Full
- **Archetypes in scope:** content | commerce | application | auth
- **How you use it:** (e.g. Cursor rule + hig-scope.md + PR checklist)
- **Public evidence:** (link to hig-scope, agent rule, or blog post — no private repos required)
```

**Requirements:**

- Pin an explicit semver (tag or `VERSION` file), not floating `main`
- Describe profile honestly (Quick is valid for many teams)
- No paywall for evidence links

---

## Related

- Adoption steps: [INTEGRATION.md](./INTEGRATION.md)
- Copy-paste templates: [examples/](./examples/)
- Share badge: [SHARE.md](./SHARE.md)
- Profiles: [PROFILES.md](./PROFILES.md)
