# Agent instructions — Modern Web HIG

Pinned contract: `docs/hig/HIG.md`  
Archetype map: `docs/hig-scope.md`

## Mandatory workflow for UI / CSS / front-end tasks

1. **Archetype first** — `content` | `commerce` | `application` | `auth`
2. **Layer 0 matrix** — only enforce mandatory/conditional rules for that archetype
3. **Layer 7 guardrails** — see YAML below (source of truth for agent behavior)
4. **Deep detail** — open the pinned HIG for the specific layer; do not invent conflicting rules

```yaml
agent_enforcement_rules:
  scope:
    resolve_archetype_first: true
    apply_layer0_matrix: true
  styling_constraints:
    disallow_raw_hex_colors_outside_token_files: true
    require_semantic_or_component_tokens: true
    prohibit_transition_all: true
    require_cubic_bezier_curves: true
    require_motion_duration_tokens: true
    prohibit_decorative_micro_animations: true
    micro_animation_max_ms: 300
    animate_compositor_properties_only: true
    require_container_queries_for_components: true
    require_logical_properties: true
    require_reduced_motion_media_query: true
  rsc_and_server_action_constraints:
    default_to_server_components: true
    require_suspense_skeletons_for_async_rsc: true
    require_form_pending_states_on_server_actions: true
  accessibility_constraints:
    target_standard: "WCAG 2.2 AA"
    require_aria_labels_on_icon_buttons: true
    require_alt_text_on_images: true
    enforce_semantic_html: true
    require_visible_focus_styles: true
    min_target_size_px: 24
```

When the user asks for something that violates the HIG, implement the compliant alternative and state which rule blocked the request.
