# Agent skills — The Web HIG

Ready-to-copy Agent Skills for coding tools. One canonical skill; copy it into the editor-native path.

**Faster:** `npx @web-hig/install` copies this skill, always-on agent rules, and `HIG-QUICK.md` into a product repo. See [INTEGRATION.md](../INTEGRATION.md).

Canonical file: [web-hig/SKILL.md](./web-hig/SKILL.md)

## Copy destinations

| Editor | Skill path | Always-on rule (optional companion) |
| --- | --- | --- |
| Cursor | `.cursor/skills/web-hig/SKILL.md` | `.cursor/rules/hig.mdc` |
| Claude Code | `.claude/skills/web-hig/SKILL.md` | merge into `CLAUDE.md` |
| GitHub Copilot | `.github/skills/web-hig/SKILL.md` | `.github/copilot-instructions.md` |
| Windsurf | `.windsurf/skills/web-hig/SKILL.md` | `.windsurf/rules/hig.md` |

Always-on templates live in [examples/agent-rules/](../examples/agent-rules/).

The skill tells agents to **read** the pinned Quick Reference (`docs/hig/HIG-QUICK.md`). Pin that file (or run the installer) so the path exists.
