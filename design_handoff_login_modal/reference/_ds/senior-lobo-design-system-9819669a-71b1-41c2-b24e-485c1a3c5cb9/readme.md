# Señor Lobo — Design System

The brand system for **Señor Lobo**, a studio that writes **personalized
storybooks for children aged 6–12**. Each book casts the child as the
protagonist (their name on the cover and on every page), turns family members
into secondary characters, and lets families add a custom antagonist to give the
plot its special twist. Books are printed in hardcover and shipped home.

Visually the system is a hand-drawn, **neo-skeuomorphic "inked on parchment"**
language: every control draws its outline with a filtered `.bg` layer
(turbulence + displacement) so borders wobble like a real pen stroke, while the
content stays crisp on top. The whole thing runs on a six-pigment palette and
flips to a full **NOCHE** (night) theme via the signature día/noche switch — a
nod to the bedtime-story ritual.

> **Origin / sources.**
> - **Foundation** (tokens, base, components) was distilled from an existing
>   self-contained styleguide, `Line Art UI Kit.html` (+ `line-art.css`), kept at the
>   project root for reference. The CSS was reorganized into tokens + base +
>   components; the visual language is the same.
> - **Brand logos** were provided by the user as two SVGs (a vintage woodcut wolf
>   reading a book): `assets/senorlobo-dia.svg` (for light grounds) and
>   `assets/senorlobo-noche.svg` (for dark grounds). Original uploads in `uploads/`.
> - **Source codebase** mounted read-only at `linea-design-system/` (the foundation
>   styleguide above). No Figma was provided.

---

## How to consume

Link the one entry stylesheet, then include the runtime once per page (it injects
the SVG filter `<defs>` the CSS references, and auto-adds the `.bg` stroke layer to
plain-HTML hosts):

```html
<link rel="stylesheet" href="styles.css">
<script src="assets/linea-runtime.js"></script>
```

In React, import components from `/components/**` — they emit their own `.bg`
layers, so you still need the filters in the document (the runtime, or paste the
`<defs>` yourself). Toggle night mode by setting
`document.documentElement.dataset.theme = 'noche'` (the `DayNightSwitch` does this
for you). In `@dsCard` / UI-kit HTML, read components off the compiled bundle:
`const { Button } = window.SeOrLoboDesignSystem_981966` (after loading `_ds_bundle.js`).

---

## CONTENT FUNDAMENTALS

- **Language.** **Spanish-first**, warm and family-facing (`Catálogo`,
  `Personalizar`, `Biblioteca`, `Crear un cuento`). Token/machine labels stay in
  English mono (`--teal-deep`, `STROKE 1.8`).
- **Voice.** Tender but unfussy — it speaks to a *parent* about their *child*.
  Addresses the buyer warmly ("tu peque", "tu hijo o hija") and the child by name
  inside the story. Storybook prose is gentle, third-person, a little lyrical
  ("los árboles aprendían tu nombre"). Never babyish, never saccharine.
- **Address.** Product UI uses friendly imperatives (`Crear un cuento`,
  `Personalizar`, `Añadir al pedido`). The marketing voice is "you"-led toward the
  parent; the *narrative* voice is third-person about the child.
- **Casing.** UI labels, buttons, eyebrows and section heads are **UPPERCASE**
  with generous tracking (`.06–.13em`). Body prose and storybook text are natural
  sentence case. Values/meta are mono.
- **Examples.**
  - Hero: *"El protagonista de la historia **es tu peque.**"*
  - Step lede: *"Toda buena historia necesita un giro. Elige quién pondrá a prueba
    a {nombre}."*
  - Dedication: *"Para {nombre}: que nunca dejes de ser valiente. Con cariño, de
    toda tu familia."*
- **Emoji.** None. Iconography is hand-stroked SVG only.
- **Numbers.** Always mono (`28 págs`, `6–9 años`, `+40.000 cuentos`, `4,9 / 5`).
  Note Spanish decimal comma.

## VISUAL FOUNDATIONS

- **Palette.** Six pigments only — Bosque `#4F7860` (principal), Ámbar `#C9A035`
  (warm accent), Pergamino `#F5EDD8` (paper), Castaño `#8C5F3A` (dark accent),
  Niebla `#9BA89C` (neutral), Tinta `#38362C` (text). Every other color is a
  `color-mix()` of these, so nothing drifts off-palette. NOCHE re-points the same
  tokens to Medianoche `#1B2744` / Noche `#253560` / Crema `#F0E6C8` / Bruma
  `#6B7A9A` / Ámbar — and in night, **borders go cream**. The wolf logo has a
  matching día/noche variant.
- **Type.** Four roles:
  - **Wakerobin Compressed** — display voice (UPPERCASE, tracked) for headings &
    labels, and the heavy compressed serif for big section heads & tab labels.
    *(Commercial Monotype font, not webfont-licensed; self-host required.)*
  - **Cormorant Upright** — body prose & storybook text; an upright serif with a
    bookish, slightly literary feel. Also carries every value, caption, token,
    and meta line (the former mono role now shares the body serif).
  - **Mick Caster** — heavy slab for section heads & tab labels (self-hosted).
- **Backgrounds.** A warm kraft ground with a faint 5px radial paper-grain dot
  pattern. No gradients, no photos as chrome. Containers read as **torn paper
  chips**: cream fill, a ragged displaced edge, and a hard offset shadow.
- **The stroke.** Borders are never plain CSS borders on "chip" surfaces — they're
  a `.bg` layer run through `#rough` (controls) or `#torn-paper` (cards/panels).
- **Shadows.** ALWAYS hard offset — `X+3 / Y+4`, **blur 0** — to read as stacked
  paper, never soft glow. Pressed states use a hard *inset* offset. No blurred
  shadows anywhere.
- **Radii.** Soft but modest: 6 / 9 / 11 / 13 / 16 px; pills at 26px; circles for
  dots, avatars, plain pagination.
- **Borders.** Default stroke weight `--bw: 2px`; thin 1.5px, thick 7px specimens.
- **Animation.** Restrained. Theme cross-fade `.45s ease`; switch knobs slide
  `.16s`; the day/night knob slides with a gentle overshoot
  `cubic-bezier(.5,1.4,.5,1)`. Spinner & skeleton are the only loops. No parallax,
  no entrance choreography.
- **Hover / press.** Links/nav brighten ink toward `--line` on hover; tactile chips
  (pagination, stepper nodes, icon buttons, choice chips) **depress** on `:active`.
- **Imagery.** Story illustration placeholders are 45° diagonal hatch in accent
  tints with a dashed stroke — never a photo. Real art comes in via `<img>` /
  `image-slot`.
- **Transparency / blur.** Essentially none — an opaque, papery system. No backdrop
  blur, no glassmorphism.
- **Cards.** Torn-paper chip: cream fill + grain, ragged edge (`#torn-paper`), hard
  drop shadow, ~11–13px radius, no visible 1px border.

## ICONOGRAPHY

- **Approach.** Inline **stroked SVG** only — `stroke-width` ≈1.8 (2 at small
  sizes), round caps/joins, `fill:none`, run through the `#rough` filter so the
  line wobbles like the rest of the system. Sizes: S 16 / M 20 / L 24.
- **No icon font, no sprite, no PNGs, no emoji, no unicode glyphs.** Icons are
  hand-authored paths. The UI kit ships a small storybook-themed set in
  `ui_kits/senorlobo/data.jsx` (book, star, sparkle, paw, moon, tree, castle,
  anchor, crown, feather, mask, shield, plus search/bell/chevron/check/etc.).
- **Brand mark.** The **wolf reading a book** woodcut logo (`assets/senorlobo-*.svg`),
  used día on light grounds and noche on dark.
- When you need a glyph that isn't in the set, draw it in the same vocabulary
  (1.8 stroke, round joins) rather than importing a different icon family.

---

## Index / manifest

**Root**
- `styles.css` — the single entry stylesheet (import-only).
- `assets/` — `linea-runtime.js` (SVG filters + `.bg` layer) and the wolf logos
  `senorlobo-dia.svg` / `senorlobo-noche.svg`.
- `Line Art UI Kit.html`, `line-art.css` — original source styleguide (reference).

**tokens/** — `colors.css` (pigments + semantic + NOCHE), `typography.css`,
`surfaces.css` (radii, hard-shadow ladder, spacing), `fonts.css` (Google webfonts).

**base/** — `base.css`: reset, paper ground, the `.bg` system, torn-paper surfaces,
layout scaffolding, foundation-specimen helpers.

**components/** — `components.css` + React primitives:
- `forms/` — Button, IconButton, TextField, Checkbox, Radio (+RadioGroup), Switch, **DayNightSwitch**
- `feedback/` — Badge, Toast (+ToastStack), Alert, Dialog, Spinner, ProgressBar, Tooltip
- `navigation/` — Tabs, Breadcrumbs, Pagination, Stepper, Navbar
- `display/` — Card, Avatar (+AvatarGroup), List (+ListItem), **BookPage** (storybook prose page: chapter plate + floating illustration slot + justified serif paragraphs with drop cap / highlights / small-caps / ornament dividers — the layout to reach for whenever you set text with paragraphs)

**guidelines/** — foundation specimen cards (Colors, Type, Spacing, Brand, Logo)
shown in the Design System tab.

**ui_kits/senorlobo/** — the flagship product: a personalized-storybook web app.
`index.html` runs the full flow — **Catálogo** (browse story templates) →
**Personalizar** (4-step wizard: protagonista → familia → antagonista → resumen) →
**Libro** (paged book preview with the child's name woven in) → **Biblioteca**
(the family's shelf). Live día/noche theming throughout.

**ui_kits/taller/** — reference workspace screen from the source styleguide.

---

## Caveats

- **Slab font is commercial.** `--font-slab` names **Mick Caster**. It is **not**
  available as a free webfont, so it is **self-hosted** from `/fonts` via
  `@font-face` in `tokens/fonts.css` (normal + italic, `.otf`/`.ttf`). It falls
  back to a generic serif. All slab heads/tabs now render Mick Caster.
- **Body prose** uses **Cormorant Upright**, an upright *display* serif — at small
  body sizes it reads lighter than a true text serif. Loaded from Google Fonts.
  Flag if you'd prefer it scoped to storybook prose only.
- Webfonts are loaded from **Google Fonts** (Cormorant Upright); Wakerobin
  Compressed and Mick Caster are **self-hosted** from `/fonts`. Swap
  `tokens/fonts.css` for `@font-face` if you need offline use of the Google face.
- The hand-drawn look depends on the SVG filters being present — always include
  `assets/linea-runtime.js` (or the `<defs>` block) or strokes render as plain
  rectangles.
- The wolf logos are **detailed woodcut SVGs** (~1MB each). For small UI use
  consider a simplified mark; flagged for the user to provide one if needed.
- UI-kit storybook prose is generated illustratively from the user's inputs — it's
  representative sample copy, not the studio's real manuscripts.
