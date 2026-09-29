# Emerald Enchanted — Design Spec
Date: 2026-09-29
Status: approved (A Minimal Enchanted + A Clean Inline, shader killed)

## Goal
Kill black notepad look. Deep emerald + subtle whimsy on laptop, same palette tidied on phone. Zero new deps.

## 1. Laptop theme (A Minimal Enchanted)
- `src/App.tsx`: `bg-black` → `bg-[#022c22]`
- `index.html`: body `background:#000` → `#022c22`, `theme-color` → `#022c22`
- `src/pages/Home.tsx` spotlight: `rgba(29,78,216,0.15)` → `rgba(110,231,183,0.10)`. Disable on coarse pointers via `matchMedia('(pointer:coarse)')`.
- Fireflies: 12 dots, fixed, `transform/opacity` only, drift + twinkle keyframes in `src/index.css`. Guard with `@media (prefers-reduced-motion: reduce)`.
- Grain: SVG feTurbulence data-uri overlay, 4-5% opacity, `pointer-events-none`.
- Accents: `teal-300` → `emerald-300 #6ee7b7` (links, hovers, selection). Body `slate-400` → `slate-300` for contrast on emerald.
- No layout change. No GSAP/Spline/Shader/Tremor.

## 2. Phone tidy (A Clean Inline)
- `src/components/RightPanel.tsx`: delete sticky tab blocks (`w-screen bg-slate-900/75 backdrop-blur`). Replace with inline label: `EXPERIENCE ———` mint 11px + `bg-emerald-900` hairline, `lg:hidden`.
- `RightPanel` root: `pt-24` → `pt-8`, keep `lg:py-24`. `mb-12` gaps tightened.
- Type: keep Inter. Headings 17-19px semibold `slate-100`, body 15-16px `slate-300 leading-relaxed`. Fixes washed-out phone look.
- `LeftPanel.tsx` socials: add `p-2 -m-2` to hit 44px taps. `max-w-xs` stays.
- Overflow: removing `w-screen -mx-6` kills horizontal scroll.
- Nav: keep `hidden lg:block` for now (step 2 later if wanted).

## 3. Guards
- `prefers-reduced-motion`: fireflies + spotlight off, static emerald.
- No-WebGL needed (CSS only). Contrast: mint on #022c22 passes AA for 14px+ bold/labels; body slate-300 on emerald passes.
- Perf: no JS loop, no scroll listener added (reuse existing mousemove, skipped on touch).

## Skipped / later
- Skipped: ShaderGradient/WebGL (~450KB, thermal throttle), Spline, GSAP, new fonts, card-ify (B), editorial type (C).
- Add when: user asks for hero-only landing or card look. Firefly count tunable 8-16.

## Verify
- `npm run build` passes, no overflow at 390px, spotlight off on touch emulate, reduced-motion static.
