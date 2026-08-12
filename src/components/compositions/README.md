# Compositions

Page-level arrangements of approved sections belong here. Premium, Manufacturing, and Launch must compose the shared library rather than fork component implementations.

`PremiumHomepage-001`, `ManufacturingHomepage-001`, and `LaunchHomepage-001` are implemented and Approved. Each owns only its approved section order and locally scoped token mapping; content remains supplied through typed child-component props.

Phase 7 implements four inner-page compositions for Products, Capabilities, About, and Contact. They are in `Review` and own only approved section order; neutral fixture data remains outside the components.

Phase 8 adds `ClientHomepage-001`. It accepts one `ClientSiteConfig`, resolves registered pattern IDs, applies client theme tokens, and surfaces review-mode verification warnings. It does not contain client facts or duplicate section implementations. A configuration may enter publish mode only after the validation layer finds no blocking identity, evidence, contact, or media issues.
