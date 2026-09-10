# Examples

Copy these into a **product** repository. They are not loaded when developing The Web HIG itself.

---

## Adoption paths

| Goal | Start here |
| --- | --- |
| Fastest agent + PR workflow | [adoption/quick-profile-walkthrough.md](./adoption/quick-profile-walkthrough.md) |
| Route → archetype map | [hig-scope.example.md](./hig-scope.example.md) |
| Full pin list + CI stages | [INTEGRATION.md](../INTEGRATION.md) |
| Conformance levels | [PROFILES.md](../PROFILES.md) |
| Public listing | [ADOPTERS.md](../ADOPTERS.md) |

---

## Pin set (vendor copy)

| Source | Destination in product repo |
| --- | --- |
| [hig-scope.example.md](./hig-scope.example.md) | `docs/hig-scope.md` (edit routes) |
| [../HIG-QUICK.md](../HIG-QUICK.md) | `docs/hig/HIG-QUICK.md` |
| [../HIG-LITE.md](../HIG-LITE.md) | `docs/hig/HIG-LITE.md` |
| [../HIG.md](../HIG.md) | `docs/hig/HIG.md` |
| [../VERSION](../VERSION) | `docs/hig/VERSION` |
| [../rules/](../rules/) | `docs/hig/rules/` |
| [../framework/](../framework/) | `docs/hig/framework/` |

**Quick Reference profile minimum:** `VERSION`, `HIG-QUICK.md`, optional `HIG-CORE.md`, one agent rule.

---

## Agent rules

| File | Destination |
| --- | --- |
| [agent-rules/cursor-hig.mdc](./agent-rules/cursor-hig.mdc) | `.cursor/rules/hig.mdc` |
| [agent-rules/CLAUDE-hig.md](./agent-rules/CLAUDE-hig.md) | merge into `CLAUDE.md` |
| [agent-rules/copilot-instructions-hig.md](./agent-rules/copilot-instructions-hig.md) | `.github/copilot-instructions.md` |
| [agent-rules/AGENTS-hig.md](./agent-rules/AGENTS-hig.md) | `AGENTS.md` |

---

## Reference implementations

See [ADOPTERS.md](../ADOPTERS.md) for the live demo and documentation site using these patterns.
