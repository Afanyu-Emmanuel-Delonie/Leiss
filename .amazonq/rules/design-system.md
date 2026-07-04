# Leiss — Design System Rules

## Project
Birthday website for **Leiss Uwase**. The aesthetic is luxury editorial dark — think high-end fashion magazine meets digital birthday card.

---

## Color Palette
| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0a0a0a` | Page background |
| `--color-surface` | `#111111` | Cards, panels |
| `--color-border` | `#1e1e1e` | Dividers, borders |
| `--color-accent` | `#8E1B1B` | Key actions ONLY — buttons, active states, CTA |
| `--color-accent-light` | `#b52a2a` | Hover state of accent |
| `--color-muted` | `#555555` | Labels, captions, secondary text |
| `--color-text` | `#e8e0d5` | Primary body text |
| `--color-text-soft` | `#7a6e64` | Subdued text, nav links |

> **Rule:** Red (`--color-accent`) is reserved strictly for interactive/key action elements. Never use it for decorative text or backgrounds.

---

## Typography
| Token | Font | Usage |
|---|---|---|
| `--font-title` | `Syne` (700, 800) | Headings, wordmark, section titles |
| `--font-body` | `Inter` (300, 400, 500) | Body copy, nav links, labels, badges |

### Font Size Scale
- Use `clamp(min, preferred-vw, max)` for all headings so they scale fluidly
- Hero heading: `clamp(2.8rem, 8vw, 8rem)`
- Section headings: `clamp(1.8rem, 4vw, 3.5rem)`
- Sub-headings: `clamp(1rem, 1.8vw, 1.5rem)`
- Body: `clamp(0.85rem, 1vw, 1rem)`
- Labels/caps: `0.72rem – 0.8rem` with `letter-spacing: 0.2em`

---

## Spacing
- Base unit: `4px` (`0.25rem`)
- Scale tokens defined in `@theme`:
  - `--sp-1`: 4px — micro gaps (icon + label)
  - `--sp-2`: 8px — tight internal padding
  - `--sp-3`: 12px — label bottom margin, list item padding
  - `--sp-4`: 16px — standard gap, paragraph margin
  - `--sp-5`: 20px — badge padding horizontal
  - `--sp-6`: 24px — section horizontal padding mobile, nav padding
  - `--sp-8`: 32px — column padding, paragraph-to-button gap
  - `--sp-10`: 40px — nav link gap, container horizontal padding
  - `--sp-12`: 48px — heading top padding
  - `--sp-16`: 64px — column bottom padding desktop
  - `--sp-20`: 80px — section top padding (nav height offset), ticker fade width
  - `--sp-24`: 96px — section vertical padding desktop
- **Rule:** Never use raw `px` values in inline styles or CSS. Always reference a `--sp-*` token.

---

## Layout
- Desktop: 3-column grid `[1fr auto 1fr]` for hero, portrait centered
- Mobile (`< 768px`): single column, portrait first, content below
- Nav: fixed, glassmorphism, transparent background with blur

---

## Component Styles

### Navigation
- `backdrop-filter: blur(20px)`
- `background: rgba(10,10,10,0.75)`
- `border-bottom: 1px solid rgba(255,255,255,0.06)`
- Links hidden on mobile, hamburger or icon only

### Buttons (CTA)
- Background: `--color-accent`
- Border-radius: `100px` (pill)
- Font: Inter 500, `0.8rem`, `letter-spacing: 0.12em`, uppercase
- Hover: spring scale `cubic-bezier(0.34, 1.56, 0.64, 1)` + lift shadow

### Cards / Surfaces
- Background: `rgba(255,255,255,0.03)` or `--color-surface`
- Border: `1px solid rgba(255,255,255,0.07)`
- Border-radius: `16px` or `24px`
- Glassmorphism where layered: `backdrop-filter: blur(12px)`

### Badges / Pills
- Background: `rgba(255,255,255,0.04)`
- Border: `1px solid rgba(255,255,255,0.1)`
- Border-radius: `100px`
- Hover: lift + accent border glow

### Dividers
- `1px solid rgba(255,255,255,0.06)` for subtle
- Gradient line: `linear-gradient(90deg, transparent, --color-accent, transparent)` for decorative

---

## Animations
- Page load: GSAP timeline — nav drops in → heading fades up → portrait slides up → side content slides in
- Float: `translateY(0 → -14px)` 5s ease-in-out infinite on portrait
- Sparkle: scale + rotate, 3s ease-in-out infinite
- Scrolling ticker: CSS `translateX(-50%)` 18s linear infinite, pauses on hover
- Hover transitions: `0.3s` with spring cubic-bezier for interactive elements
- Mouse parallax: subtle `x` shift on heading via GSAP mousemove

---

## Responsive Rules
- **Always** use `clamp()` for font sizes — never fixed `px` for headings
- **Always** test layout at 375px, 768px, 1280px, 1920px
- Mobile-first stacking: portrait → left content → right content
- Hide decorative elements (sparkles, dot patterns) on mobile if they cause overflow
- Nav links collapse on `< md`, status text collapses on `< sm`
- Portrait image: `width: 100%` with `maxWidth` cap, never fixed height on mobile

---

## Image Treatment
- Portrait: `filter: grayscale(1)` always
- Bottom fade: `linear-gradient(to top, #0a0a0a, transparent)` over bottom 35–40% of portrait
- No hard borders on portrait — use fade/gradient edges only

---

## Tone & Copy
- Warm, celebratory, premium
- Short sentences, elegant phrasing
- No exclamation spam — one `✨` or emoji max per line
- Labels in `UPPERCASE` with wide tracking
- Headings in Title Case or ALL CAPS (never sentence case for display text)
