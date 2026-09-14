# demo-0xclpm — בינה מלאכותית וסוכני AI (static demo)

**Founder ask (verbatim):** «יאללה תעשה על נושא האייאי והאייגנטים» (Linear project
`b91680b1-8b7e-487e-9e93-fce2bc7ceae7`, EMET-182..185).

**Built by:** 32-delivery-lead (קשת) — direct build this turn, no separate
`14-frontend-engineer` Cloud run was active this WIP=1 slot (same convention as
`react-todo-list`/`shana-tova-greeting`/`kids-math-quiz`).

## What this is

A static, single-page, Hebrew-RTL explainer + interactive demo on the topic of
**AI vs. AI Agents**:

- Hero + one-line framing of "chatbot answers" vs. "agent acts until the goal is done"
- Side-by-side comparison card: AI/chatbot vs. AI Agent
- Visual walkthrough of the **Plan → Act → Observe → Repeat** agent loop
- **Live interactive demo**: type (or pick a quick-chip) goal, click "הפעילו את
  הסוכן" — a console-style panel animates a simulated Plan/Act/Observe/Done log for
  that goal. 100% client-side `setTimeout`/`async` animation — **no network calls,
  no real LLM, no backend** (safe for static GitHub Pages hosting).
- Use-case grid: coding agent, support agent, research agent, ops agent
- Footer: `EaseToDev` only (brand mark, no sponsor block) — matches
  `shana-tova-greeting` convention

## Stack

Plain HTML/CSS/JS, zero build step, zero dependencies (Google Fonts loaded via
`<link>`, no npm/bundler). Chosen over React+Vite (like `react-todo-list`) because
this bet is a content/explainer demo, not a CRUD data app — a build step adds risk
without adding value here.

## Files

- `index.html` — page structure + all copy (Hebrew RTL)
- `styles.css` — dark theme, gradient accents, responsive (4 → 2 → 1 column grids)
- `script.js` — chip-fill behavior + the simulated agent-loop console animation
- `favicon.svg` — small AZToDev-style mark

## Local verification (done before publish)

- Opened `index.html` directly in a headless browser check (see outbox report for
  full checklist): RTL renders correctly, all 4 demo chips fill the input, submit
  runs the animated log to completion and re-enables the button, zero console
  errors, no horizontal scroll on a 390px-wide viewport.
