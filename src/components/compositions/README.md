# Compositions

Page-level arrangements of approved sections belong here. Premium, Manufacturing, and Launch must compose the shared library rather than fork component implementations.

`PremiumHomepage-001`, `ManufacturingHomepage-001`, and `LaunchHomepage-001` are implemented and Approved. Each owns only its approved section order and locally scoped token mapping; content remains supplied through typed child-component props.

Phase 7 implements four inner-page compositions for Products, Capabilities, About, and Contact. They are in `Review` and own only approved section order; neutral fixture data remains outside the components.
