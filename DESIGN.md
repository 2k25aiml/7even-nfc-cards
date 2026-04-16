# Design Brief

## Direction

**7EVEN** — Premium NFC business card ordering platform with dark modern confidence.

## Tone

High-energy, trustworthy tech product. Dark base signals sophistication; vivid violet primary conveys confidence; cyan accent evokes wireless connectivity and digital innovation.

## Differentiation

Teal/cyan accent as a "tech connectivity" metaphor reinforces NFC narrative — cards aren't just physical, they're smart and wireless.

## Color Palette

| Token      | OKLCH          | Role                          |
| ---------- | -------------- | ----------------------------- |
| background | 0.16 0.02 280  | Deep charcoal, dark base      |
| foreground | 0.95 0.01 280  | Near-white, maximum contrast  |
| card       | 0.2 0.025 280  | Elevated surface containers   |
| primary    | 0.65 0.25 300  | Vivid violet, CTAs & accents  |
| accent     | 0.72 0.18 185  | Teal/cyan, tech & highlights  |
| muted      | 0.25 0.03 280  | Muted backgrounds & borders   |

## Typography

- Display: Space Grotesk — geometric, tech-forward, confident headings & hero text
- Body: Satoshi — modern, accessible, friendly UI labels & paragraphs
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl font-bold tracking-tight`, label `text-sm font-semibold uppercase tracking-widest`, body `text-base`

## Elevation & Depth

Layered card surfaces with soft elevated shadows. Primary actions feature card-hover shadow with violet tint. No harsh shadows; depth through background tone variation.

## Structural Zones

| Zone        | Background          | Border            | Notes                           |
| ----------- | ------------------- | ----------------- | ------------------------------- |
| Header      | card (0.2)          | border muted      | Clear branding & navigation     |
| Content     | background (0.16)   | —                 | Alternating section backgrounds |
| Card Gallery| card (0.2)          | border muted      | Grid layout with hover lift     |
| Form Area   | secondary (0.25)    | border muted      | Slightly elevated form sections |
| Footer      | card (0.2)          | border-t muted    | Links & legal alignment         |

## Spacing & Rhythm

Balanced density with 24px section gaps (`gap-6`), 16px component gaps (`gap-4`), 8px micro-spacing. Form sections grouped in contained cards; template gallery uses loose grid.

## Component Patterns

- Buttons: rounded-lg, violet primary with hover shadow elevation, teal accent for secondary actions
- Cards: rounded-lg with `bg-card`, border subtle, hover: `shadow-card-hover` with Y translate
- Badges: inline `rounded-full` with accent/primary, small text
- Form inputs: `bg-input` border-muted, focus: ring-primary, smooth transition

## Motion

- Entrance: fade-in 0.3s on page load, staggered 0.05s per card in gallery
- Hover: slide-up 2px + shadow-card-hover for cards, color-shift for buttons
- Loading: pulse opacity on checkout button

## Constraints

- Dark mode only (platform default, no light toggle for this app)
- Maximum 3 accent colors total (violet, cyan, red for destructive)
- Tight spacing hierarchy; no arbitrary gaps
- All text must meet WCAG AA contrast (0.16 text on 0.2 bg = valid; monitor on dark cards)

## Signature Detail

Cyan glow text-shadow on accent elements and certain headings — a subtle nod to wireless/NFC technology without overemphasis.
