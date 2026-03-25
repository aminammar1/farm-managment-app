# UI decision for Tunisian farming desktop app

## Primary recommendation

Use **Mantine** as the main UI system for this Electron app.

Why it fits this product:

- Strong dashboard and form primitives without forcing a heavy enterprise visual style.
- Official RTL support that is simple to toggle for Arabic layouts.
- Excellent shell components for a desktop navigation model.
- Easy theming, which lets us build a culturally familiar palette around olive, earth, wheat, and irrigation blues instead of generic SaaS colors.
- Lower styling friction than MUI for a small team that wants to move fast.

## Best alternatives

### Material UI

Best when you expect:

- very large admin surfaces,
- advanced accessibility requirements,
- or you later want enterprise table tooling from MUI X.

Tradeoff:

- more setup friction for RTL styling,
- and it can feel more corporate than agricultural unless themed carefully.

### Ant Design

Best when you want:

- dense data-entry workflows,
- accounting-style tables,
- and lots of built-in admin components quickly.

Tradeoff:

- the visual language is more back-office than farmer-friendly,
- so it would need more design work to feel local and approachable.

## Components to use first

- `AppShell` for desktop navigation
- `NavLink` for module switching
- `Card`, `Paper`, `SimpleGrid` for dashboard summaries
- `TextInput`, `Select`, `Textarea`, `DateInput`, `Modal` for data entry
- `Table` for livestock, tasks, and operations lists
- `Badge`, `Progress`, `RingProgress` for health, urgency, and completion cues
- `Notifications` for save feedback

## Scale path

If the data grids become much larger later:

- keep Mantine for the design system,
- add `TanStack Table` for flexible table state,
- or adopt `AG Grid` only for the few screens that truly need heavy desktop-grade tables, bulk edit, or virtualization.

## Cultural UI direction

- Default to Arabic-friendly spacing and typography support even when French or English is active.
- Use `Cairo` as the base font family for a more natural Arabic reading experience across the app.
- Prefer farm-language labels like herd, feed, watering, harvest, health, and sales instead of generic ERP terms.
- Keep iconography direct and practical rather than abstract.
