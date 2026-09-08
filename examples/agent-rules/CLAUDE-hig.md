# Modern Web HIG

This project follows the Modern Web HIG. Pin path: `docs/hig/HIG.md` (or update this path). Archetype map: `docs/hig-scope.md`.

## Before UI changes

1. Resolve archetype (`content` | `commerce` | `application` | `auth`) from the scope map.
2. Apply Layer 0 matrix from the pinned HIG.
3. Enforce Layer 7 rules below.

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

Do not paste the entire HIG into responses. Cite the relevant layer when declining a conflicting request.
