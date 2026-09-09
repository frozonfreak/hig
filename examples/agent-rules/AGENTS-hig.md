# Agent instructions — Modern Web HIG

Pinned contract: `docs/hig/HIG.md`  
Archetype map: `docs/hig-scope.md`

## Mandatory workflow for UI / CSS / front-end tasks

1. **Archetype first** — `content` | `commerce` | `application` | `auth`
2. **Layer 0 matrix** — only enforce mandatory/conditional rules for that archetype
3. **Layer 7 guardrails** — see YAML below (source of truth for agent behavior)
4. **Deep detail** — open the pinned HIG for the specific layer; do not invent conflicting rules
5. **Simplicity** — prefer the simplest implementation that satisfies applicable requirements (HIG-SIM-001)

```yaml
agent_enforcement_rules:
  scope:
    resolve_archetype_first: true
    apply_layer0_matrix: true
    prefer_simplest_compliant_implementation: true
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

When the user asks for something that violates the HIG, implement the compliant alternative and state which rule blocked the request.
