# DESIGN.md

The visual language of the Observatory, written for whoever touches `web/app`
or `web/components` next — a Claude Code session most of the time.

## How to read this file

**`web/app/globals.css` owns every value. This file owns the reasons.**

That split is deliberate and it is the one rule here that must not bend. The
popular DESIGN.md format inlines the hex codes and the type scale; doing that
here would create a second source of truth that drifts from the stylesheet the
moment either one is edited, and then nobody knows which is real. So: when you
need a number, read the `:root` block at the top of `globals.css`. When you
need to know *which* token to reach for and what you are not allowed to do,
read this.

If something here contradicts the stylesheet, the stylesheet is right and this
file has a bug — fix it in the same change.

## 1. Theme and atmosphere

Paper and ink, not console and neon. A cool off-white ground, white cards, one
blue for live data, one bronze for chrome.

Every surface is opaque. This is a study tool — a learner reads a Technique's
explanation for minutes at a stretch — and translucency over a busy backdrop is
exactly what made the previous dark build hard to read. There is no glass, no
blur and no glow. Ambient movement exists only where nothing is being read —
see the exemptions in *Motion* below.

The Observatory identity lives in the *names and the structures* — the star
chart, the seven agents, the character portrait, "Origin System" — not in the
chrome. The video-game chrome that used to decorate it (matrix rain, auras,
rotating rays, embers, summoning circles, targeting reticles, notched corners)
was removed on purpose. Do not reintroduce that vocabulary.

## 2. Colour: roles, not decoration

Every colour in the app answers to one of three jobs. Picking a colour means
deciding which job it is doing, then using that token.

**Chrome is bronze. Live data is blue.** This is the app's oldest split — it
was gold-vs-cyan in the dark build and survived the theme change intact. Bronze
(`--gold*`) marks the frame: prestige states, commit actions, instrument
furniture. Blue (`--accent`) marks anything that reports real state: figures,
progress, the current selection.

**Status hues are a closed set.** `--mastered` / `--training` / `--untrained`
are the three score bands; `--locked` and `--rusty` are flags layered *over* a
status, never replacements for it. Do not invent a fourth band, and do not
reuse a status hue for decoration — a green that does not mean "mastered" makes
the scorecard unreadable.

**Filled means accent, outlined means bronze.** Every control follows it:
`.filter-btn.active`, `.view-btn.active`, `.fa-band-btn.active` and
`.fa-results-cta` are filled blue; `.btn.primary` and `.back-btn` are
outlined bronze. A solid bronze slab on white reads as mud — that was a real
bug, not a taste call.

**The `-soft` tints exist so you never hand-mix.** `--accent-soft`,
`--mastered-soft` and friends are the tinted backgrounds; use them rather than
writing your own `color-mix`.

Contrast is not optional. The status hues sit in the OKLCH 50s specifically so
each one clears 4.5:1 against a white card. A new colour has to clear the same
bar or it does not go in.

## 3. Typography

Three families, three jobs, no fourth:

- **`--font-display`** (Rajdhani) — headings and big figures only.
- **`--font-body`** (IBM Plex Sans Thai) — all prose. It carries Thai, which
  matters: the learner writes digests and exam answers in Thai.
- **`--font-mono`** (IBM Plex Mono) — labels, tags, counts, filenames, dates,
  and anything with `letter-spacing` and `text-transform: uppercase`. The
  wide-tracked uppercase mono label is the most recognisable piece of the
  app's typography; it is what makes a number read as instrumentation.

Sizes come from `--step--1` … `--step-5`, which are `clamp()`-based and already
fluid — do not add your own media query to change a font size. `--step-5` is
the display moment and belongs to one element per page at most.

Long unbroken tokens (lecture filenames, slugs, source paths) need
`overflow-wrap: anywhere`. One of them is enough to push a phone's layout wider
than its screen.

## 4. Layout and spacing

Spacing comes from `--sp-1` … `--sp-9`. Never ad-hoc px. If a gap does not fit
the rhythm, the layout is wrong, not the scale.

`.page` is the shell: a max width, centred, with the side gutter. Cards are
`.panel` (a section) or `.tile` (a stat). Radii are `--r-sm` for controls,
`--r-md` for tight containers, `--r-lg` for cards, `--r-pill` for tags and
toggles.

`.cut` and `.cut-sm` are historical names that now simply round a corner. They
used to clip a notch with `clip-path`, and that clip is what made an unstyled
card collapse to an invisible sliver — see the `.subject-card` story in
`CLAUDE.md`. The classes are kept because dozens of call sites use them; the
notch is not coming back.

## 5. Depth

Three elevations, `--e-1` … `--e-3`, and they are short, soft and nearly
neutral. On paper a shadow is depth, not glow. A blurred coloured halo is a
dark-theme effect: a hue at 5-9% over black reads as atmosphere, and the same
mix over white reads as a coffee stain. That is not a style preference — it is
why the star chart's centre had a brown smudge through it for one iteration.

## 6. Motion

Movement is product motion, not effects. Three rules it follows:

1. **Nothing loops on a reading surface.** A progress bar's shine runs once
   when the value changes, not every 2.6 seconds forever.
2. Every transition is either feedback for something you just did, or a cue
   about where content begins.
3. Effects compose. Entrances animate `translate` and `opacity` so a hover
   `transform` still works underneath them.

Rule 1 has two exemptions, and the difference between them and decoration is
the whole point:

- **A loop that carries state is information.** The loading shimmer, a lit
  synapse in the neural view, the halo on a selected node — each one stops
  when its state stops. It is not ambient; it *is* the reading.
- **The star chart and the hero wash are not reading surfaces.** An instrument
  panel and a backdrop can breathe. Their loops sit behind or beside prose,
  never inside it, and they are slow on purpose: nothing cycles faster than
  about five seconds, and most are far slower than that.

A new ambient loop has to clear both bars: not on a surface anyone reads, and
slow enough that you only notice it when you go looking. If it fails either,
it is decoration and it does not go in.

**The one rule with teeth: never hide content from CSS alone.** The
hidden-until-revealed state for scroll entrances is applied by
`web/components/Motion.tsx` via a class on `<html>`, never by the stylesheet by
itself. If the script does not run — it throws, it is blocked, the browser has
no `IntersectionObserver` — the gating class is absent and everything renders
at full opacity. Content must never wait on JavaScript to become visible.

Anything above the fold is out of the script's reach entirely (`.hero`,
`.bento .tile`) and animates with a plain CSS keyframe that starts at first
paint, because whatever the script hides stays hidden until hydration finishes.

Every animation gets an off switch in the `@media (prefers-reduced-motion)`
block, which is kept last in the file so its overrides win.

## 7. Responsive

Mobile is a first-class target, not a fallback. The real device this gets read
on is a phone.

Breakpoints in use: **560px** (the main one — tightens panels, stacks card
heads, switches pill rows to scroll strips), **640px** (the nav), **720/760px**
(hero and stat grid), **900px**. Use an existing one before inventing a new one.

Two patterns worth knowing before you write a narrow-screen rule:

- **A row of pills becomes one horizontal scroll strip**, not five wrapped
  rows. `.filter-row` and `.tabs` both do this, and both fade their right edge
  so a pill cut flat by the viewport does not read as a bug.
- **A card head that mixes a long name with fixed-width meta wraps the name
  onto its own row.** Flex will otherwise squeeze the name into a ~50px column
  and its words will print straight over the meta.

## 8. Do's and don'ts

**Do**
- Reach for an existing token, class and breakpoint before adding one.
- Give a new colour a role (chrome / live data / status) before a value.
- Put a long-token guard (`overflow-wrap: anywhere`) on anything that renders
  a filename, slug or path.
- Keep `@media (prefers-reduced-motion)` last in `globals.css`.

**Don't**
- Don't duplicate token values into this file, a component, or a second
  stylesheet. `globals.css :root` is the only place they live.
- Don't hide anything with CSS that only JavaScript can reveal.
- Don't use `clip-path` for decoration. It has already shipped a blank page.
- Don't put a coloured glow, blurred halo or low-percentage hue wash on a
  light surface.
- Don't add a status colour outside the closed set, or reuse one decoratively.
- Don't write an ad-hoc px gap or a hard-coded font size.
- Don't let an element with no `display` set become a `Link` — an inline
  anchor's box can collapse to nothing.

## 9. Prompting an agent with this file

Point at the file and the constraint, not at an adjective:

> Follow `DESIGN.md`. Values come from `web/app/globals.css :root` — read it,
> don't invent any. This is a new section on the Course page, so it should use
> `.panel` and the existing mono label treatment. Verify at 390px and 1440px
> with a screenshot before you call it done.

"Make it look good" is what produces the generic result. "Which token, which
role, which breakpoint" is what produces this app.

## 10. How a visual change is verified

Grepping the served HTML proves the *data* reached the page. It proves nothing
about whether the page is *visible* — `CLAUDE.md` has the full story of the
blank page that was verified as fixed twice by grepping. So every change to
`web/app` or `web/components` gets opened and looked at.

The bar the current theme was held to, and the one to reuse:

- Screenshot at **390px and 1440px** across the pages the change touches.
- Fail on horizontal overflow: `documentElement.scrollWidth` must not exceed
  `clientWidth` on any page.
- Fail on stuck-invisible content: walk the page a screen at a time and flag
  any element that is inside the viewport and still below full opacity.
- Check `prefers-reduced-motion` separately — every animation off, everything
  opaque.
- Check mid-load (~350ms) — above-fold content must already be readable.

Supabase is unreachable from a session container, so mock the REST responses at
the network layer (Playwright `page.route("**/rest/v1/**", …)`) rather than
concluding the page is broken.
