# Web HIG

This project follows the Web HIG v1.9.0.

- **Default context (Level 1):** `docs/hig/HIG-LITE.md` (or repo `HIG-LITE.md`)
- **Topic index (Level 2):** `docs/hig/rules/manifest.yaml`
- **Full spec (Level 3):** `docs/hig/HIG.md` (edge cases only)
- **Archetype map:** `docs/hig-scope.md`

## Before UI changes

1. Resolve archetype (`content` | `commerce` | `application` | `auth`) from the scope map.
2. Read HIG-LITE.md for essential rules.
3. Load archetype pack from `rules/archetypes/<archetype>.md` → preload default modules.
4. Match task keywords against `rules/manifest.yaml` → load matching `rules/*.md` module (and `framework/*.md` if applicable).
5. Apply Layer 0 matrix from `rules/applicability.md`.
6. Enforce Layer 7 rules below.
7. Prefer the simplest compliant implementation (HIG-SIM-001).
8. Cite rule IDs when declining conflicting requests.

```yaml
agent_enforcement_rules:
  scope:
    resolve_archetype_first: true
    apply_layer0_matrix: true
    prefer_simplest_compliant_implementation: true
    default_context: HIG-LITE.md
    progressive_loading:
      level_0: HIG-CORE.md
      level_1: HIG-LITE.md
      level_1_5: rules/archetypes/{archetype}.md
      level_2: rules/manifest.yaml
      level_3: HIG.md
  styling_constraints:
    - id: HIG-TOK-001
      rule: disallow_raw_hex_colors_outside_token_files
      severity: error
    - id: HIG-MOT-001
      rule: prohibit_transition_all_application_css
      severity: error
    - id: HIG-MOT-004
      rule: micro_animation_max_ms
      value: 300
      scope: micro_feedback_only
      severity: error
    - id: HIG-CQ-001
      rule: require_container_queries_for_component_layout
      severity: error
    - id: HIG-A11Y-001
      rule: require_reduced_motion_media_query
      severity: error
  server_rendering_constraints:
    - id: HIG-SSR-001
      rule: default_to_server_rendering
      severity: error
    - id: HIG-SSR-002
      rule: require_streaming_boundary_for_slow_async_regions
      severity: warning
  accessibility_constraints:
    - id: HIG-A11Y-002
      rule: target_standard
      value: "WCAG 2.2 AA"
      severity: error
    - id: HIG-A11Y-003
      rule: prefer_native_html_over_aria
      severity: error
    - id: HIG-A11Y-007
      rule: min_target_size_px
      value: 24
      severity: error
  mutation_constraints:
    - id: HIG-MUT-001
      rule: no_optimistic_destructive_confirmation
      severity: error
```

Do not paste the entire HIG into responses. Cite the relevant rule ID when declining a conflicting request.
