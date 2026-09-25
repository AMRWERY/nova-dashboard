# Nova — Universal Business Dashboard
### Design System Reference for Stitch

---

## 0. Concept

Nova is a single dashboard product that reconfigures itself for whatever
business signs up — a retail shop, a restaurant, a real-estate agency, a
services agency, or anything else. The visual language is **"control room for
your business"**: instrumentation, live numbers, signal states — calm and
dark, not decorative. The interface should feel like a cockpit panel that
happens to be beautiful, not a marketing site.

There is **no separate light theme in v1**. Every screen is designed dark by
default. Do not propose a cream/light variant unless explicitly asked.

Each business type gets its own **accent color** (see §2.2) layered on top of
one shared neutral system — this is the one place personality changes
per-tenant; everything else (spacing, type, radius, motion) stays constant so
the product still feels like one coherent system across tenants.

---

## 1. Foundations

### 1.1 Layout concept

```
┌──────────┬─────────────────────────────────────────────────┐
│          │  Topbar: search · business badge · bell · avatar │
│ Sidebar  ├─────────────────────────────────────────────────┤
│ (icon +  │  Hero stat (2/3 width)      │  Stat tile          │
│  label,  │  big number + sparkline     │  Stat tile          │
│  collap- │                             │  Stat tile          │
│  sible)  ├─────────────────────────────┴─────────────────────┤
│          │  Activity feed (hairline list)  │  Chart panel     │
│          │  no card chrome, just dividers  │  bordered, grid  │
└──────────┴─────────────────────────────────────────────────┘
```

Reject the "four identical rounded cards in a row" default. The hero metric
is always visually dominant (2/3 width); secondary stats stack narrower
beside it. Lists (activity, transactions) render as hairline-divided rows,
**not** individually-carded rows. Reserve the card/panel treatment for
things that are genuinely a distinct object: charts, forms, modals.

Grid: 12-column, 24px gutter, max content width 1440px, page margin 32px
(16px on mobile). Sidebar: 264px expanded / 72px collapsed.

### 1.2 Spacing scale
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80` (px). Component internal padding
uses the small end (8–20); section spacing uses the large end (32–80).

### 1.3 Radius — two-tier, not one flat value everywhere
- **Controls** (button, input, select, badge, chip, checkbox): `8px`
- **Panels** (card, modal, drawer, popover, table container): `14px`
- **Avatars / pills / dots**: `999px`
Never apply the panel radius to a control or vice versa — the size
difference is what creates hierarchy.

### 1.4 Elevation
Avoid the generic soft-grey `rgba(0,0,0,.1)` shadow under every card.
Elevation here comes from **background lightness + a 1px border**, not
shadow. Shadow is reserved for things that float above the page:

```
--shadow-float: 0 12px 32px -8px rgba(0,0,0,.55), 0 2px 8px -2px rgba(0,0,0,.4);
```
Used only on: modal, drawer, dropdown menu, toast, popover.

### 1.5 Iconography
Line icons, 1.5px stroke, 20px default size (24px in nav, 16px inline with
text). Use a single consistent set (Lucide/Phosphor-style). No filled icons
except for the active nav indicator and status dots.

---

## 2. Color

### 2.1 Neutral system (shared across every business type)

| Token | Hex | Usage |
|---|---|---|
| `--bg-canvas` | `#0A0C10` | App background |
| `--bg-surface` | `#12151B` | Sidebar, topbar, table header |
| `--bg-elevated` | `#191D25` | Cards, panels, inputs |
| `--bg-overlay` | `#1F2430` | Modal/drawer/dropdown surface |
| `--border-subtle` | `#242933` | Default hairline border/divider |
| `--border-strong` | `#333A48` | Focused input, active card border |
| `--text-primary` | `#EDEFF3` | Headlines, primary content |
| `--text-secondary` | `#98A1AF` | Supporting text, labels |
| `--text-muted` | `#5C6472` | Placeholder, disabled, timestamps |
| `--text-on-accent` | `#0A0C10` | Text on top of a solid accent fill |

### 2.2 Semantic + accent

| Token | Hex | Usage |
|---|---|---|
| `--signal` | `#5B7FFF` | Default/agency-neutral accent, links, focus ring |
| `--success` | `#35C48C` | Positive delta, paid, active status |
| `--warning` | `#E8A23D` | Pending, low stock, attention |
| `--danger` | `#F0556B` | Negative delta, overdue, destructive action |
| `--info` | `#35B0C4` | Informational banners |

### 2.3 Per-business-type accent
The **only** color token that changes between tenants. It drives: active nav
item, primary button fill, focus rings, chart line 1, hero stat sparkline,
onboarding illustration tint.

| Business type | Accent name | Hex | Rationale |
|---|---|---|---|
| Retail / E-commerce | Amber Signal | `#E8A23D` | Warm, tactile, "shelf & price tag" |
| Restaurant / Food service | Coral Signal | `#F0705A` | Appetite-adjacent warmth |
| Real Estate | Teal Signal | `#2FB6C4` | Trust, structure, stability |
| Professional Services / Agency | Violet Signal | `#8B7CF6` | Creative, considered |
| Health & Wellness | Mint Signal | `#3FCB8C` | Calm, clinical-but-friendly |
| Education | Sky Signal | `#4C9CF0` | Clarity, openness |
| Generic / Other (fallback) | Signal Blue | `#5B7FFF` | Neutral default |

New business types simply register a new hex in this table — nothing else
in the system changes. See `design-tokens.json` for the machine-readable
version.

### 2.4 Data-viz palette (charts)
Categorical series in order: `accent → #98A1AF → #35B0C4 → #E8A23D → #8B7CF6
→ #F0556B`. Always pair a color with a label or legend — never rely on hue
alone (accessibility).

---

## 3. Typography

| Role | Family | Notes |
|---|---|---|
| Display / headings | **Sora** | Geometric, confident. h1–h4 only. |
| UI / body | **Plus Jakarta Sans** | All body copy, nav, buttons, forms. |
| Data / numeric | **IBM Plex Mono** | Stat figures, currency, IDs, timestamps, table numeric columns. Functional, not decorative — ties to the "instrumentation" concept. |

Load via Google Fonts (weights: Sora 600/700, Plus Jakarta Sans 400/500/600,
IBM Plex Mono 400/500).

### Type scale (desktop)
| Style | Size / Line | Weight | Family |
|---|---|---|---|
| Display (hero stat number) | 48px / 52px | 700 | IBM Plex Mono |
| H1 (page title) | 28px / 34px | 600 | Sora |
| H2 (section title) | 20px / 28px | 600 | Sora |
| H3 (card title) | 16px / 22px | 600 | Sora |
| Body | 14px / 21px | 400 | Plus Jakarta Sans |
| Body small | 13px / 19px | 400 | Plus Jakarta Sans |
| Label / caption | 12px / 16px | 500 | Plus Jakarta Sans |
| Data figure (in-table) | 13px / 19px | 500 | IBM Plex Mono |

Rules: sentence case everywhere (no ALL-CAPS eyebrow labels). No tracked-out
labels above headings. Max line length for body copy ~72ch.

---

## 4. Motion

One orchestrated moment on load, purposeful motion on state change — never
scattered hover-lift-everything.

| Moment | Behavior | Duration / easing |
|---|---|---|
| Dashboard first load | Stat tiles + hero fade+rise in sequence, 60ms stagger | 280ms `cubic-bezier(.16,1,.3,1)` |
| Route change | Outgoing fades/slides out 8px, incoming fades/slides in 8px | 180ms ease-out |
| Sidebar collapse/expand | Width + label opacity animate together | 220ms ease-in-out |
| Modal / drawer open | Scale .97→1 + fade, backdrop fade | 200ms `cubic-bezier(.16,1,.3,1)` |
| Dropdown / popover | Fade + 4px rise from trigger | 140ms ease-out |
| Toast | Slide in from top-right + fade | 220ms ease-out, auto-dismiss 4s |
| Stat number on data load | Count up from 0, not a hard swap | 600ms ease-out |
| Skeleton loading | Subtle shimmer sweep | 1.4s linear loop |
| Button/interactive press | Scale .98 on active | 100ms |

Respect `prefers-reduced-motion`: disable stagger/slide, keep opacity fades
only.

---

## 5. Components (state + spec reference)

### Button
- Variants: `primary` (solid accent, `--text-on-accent` label), `secondary`
  (bg-elevated + border-subtle), `ghost` (transparent, text only), `danger`
  (solid `--danger`).
- Sizes: sm 32px / md 40px / lg 48px height. Radius 8px. Padding 12–20px
  horizontal.
- States: default, hover (bg lightens ~6%), active (scale .98), focus
  (2px ring `--signal`/accent at 40% opacity, 2px offset), disabled (40%
  opacity, no pointer).
- Label = exact action, active voice ("Save changes", not "Submit").

### Input / Select / Textarea
- Height 40px (44px touch targets on mobile). bg-elevated, border-subtle,
  radius 8px, 12px horizontal padding.
- Focus: border → `--border-strong` + 2px accent ring.
- Error: border/ring → `--danger`, helper text below in `--danger`.
- Label above field, 12px/500 Plus Jakarta Sans, `--text-secondary`.

### Badge / Status chip
- Radius 999px, 4–10px padding, 12px label.
- Status colors map to semantic tokens: active=success, pending=warning,
  overdue/failed=danger, draft=text-muted bg.

### Card / Panel
- bg-elevated, border-subtle 1px, radius 14px, padding 20–24px.
- Title: H3, optional trailing action (icon button or link) top-right.

### Data table
- Header row: bg-surface, `--text-secondary`, 12px/500, sentence case (not
  caps).
- Rows: hairline `--border-subtle` divider, no zebra striping, no per-row
  card. Row hover: bg-elevated. Numeric columns right-aligned, IBM Plex Mono.
- Empty state: see §Empty states below.

### Sidebar nav
- Item: icon 20px + label, 40px height, radius 8px on hover/active.
- Active item: bg = accent at 12% opacity, left 2px accent bar, icon+label
  in accent color.
- Section label above groups: 11px/500 `--text-muted`, sentence case.

### Modal / Drawer
- Overlay: `rgba(6,7,10,.7)`. Surface: bg-overlay, radius 14px (modal) /
  0 on the hinge edge (drawer), `--shadow-float`.
- Modal max-width 480–640px depending on content; drawer fixed 420px.

### Toast
- bg-overlay, radius 8px, left 3px status-color bar, `--shadow-float`.

### Empty states
Voice = interface, not a person. Explain what's missing and the one action
to fix it. Example: "No products yet. Add your first product to start
selling." + primary button. Never "Oops!" or filler.

### Stat tile
- Label (12px secondary) → figure (IBM Plex Mono, 28–32px, primary) → delta
  chip (success/danger, ▲/▼ + %) → optional 40px-tall inline sparkline in
  accent color at 60% opacity fill.

---

## 6. Business-type theming mechanism (for Stitch to respect)

Every business type supplies, on top of the shared system:
1. **Accent hex** (§2.3)
2. **Vocabulary map** — the same page means different words per tenant:

| Generic slot | Retail | Restaurant | Real Estate | Agency |
|---|---|---|---|---|
| "Items" | Products | Menu items | Listings | Services |
| "Orders" | Orders | Orders | Deals | Projects |
| "Customers" | Customers | Guests | Leads/Clients | Clients |
| "Hero metric" | Revenue today | Covers today | Active listings | Billable hours |

3. **Enabled nav modules** (a subset of the full module list — e.g.
   Restaurant enables "Tables/Reservations", Retail enables "Inventory",
   Real Estate enables "Listings map view").

Design every generic page (dashboard home, items, orders, customers,
analytics, settings) so its copy is driven by the vocabulary map, not
hardcoded — Stitch should treat labels in `{braces}` throughout the prompts
in `PROMPTS.md` as tenant-variable slots.

---

## 7. Accessibility floor
- Text contrast ≥ 4.5:1 on `--bg-canvas`/`--bg-elevated` (all tokens above
  were picked to clear this against primary/secondary text).
- Visible focus ring on every interactive element, never removed.
- Color never the sole carrier of meaning (pair with icon/label).
- Respect `prefers-reduced-motion` (see §4).
- Minimum touch target 40px (44px on mobile).

---

## 8. What to avoid
- No cream/terracotta light-mode aesthetic.
- No single acid-green/vermilion accent on near-black with nothing else
  considered — the per-tenant accent system is the intentional choice here.
- No identical-rounded-card-with-soft-shadow kit for every piece of content.
- No ALL-CAPS eyebrow labels, no `WORD — fragment` em-dash labels, no
  middle-dot meta strings, no arrows appended to button text.
- No numbered `01 / 02 / 03` markers unless content is truly sequential
  (e.g. onboarding steps — that's the one legitimate use in this product).
