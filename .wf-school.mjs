export const meta = {
  name: 'school-section-mockups',
  description: 'Build 5 neo-brutalist (red/white/black) interactive mockups for the education/school section, each adversarially reviewed and auto-fixed',
  phases: [
    { title: 'Build', detail: 'one agent per mockup treatment writes a standalone HTML file' },
    { title: 'Review', detail: 'adversarial brutalist-fidelity + correctness review per file' },
    { title: 'Fix', detail: 'apply review findings to each file' },
  ],
}

const OUTDIR = 'C:/Users/carbo/OneDrive/Documents/portfolio/mockups/school'

// ---- Shared design spec given verbatim to every builder ----
const SPEC = [
'You are building ONE standalone, self-contained .html mockup for the EDUCATION / SCHOOL section of a developer portfolio.',
'It must open directly in a browser (file:// or static server) and look + behave correctly with NO build step. All CSS in one inline <style>, all JS in one inline <script>. External resources allowed ONLY via CDN: Google Fonts and (if needed) GSAP.',
'',
'=== HOUSE STYLE: NEO-BRUTALISM, RED / WHITE / BLACK ===',
'Copy these CSS vars verbatim into :root —',
'  --red:#ed1c24; --red-deep:#b3001b; --red-dark:#7a0014; --ink:#ffffff; --black:#0a0a0a;',
'  --line:rgba(255,255,255,0.26); --muted:rgba(255,255,255,0.72);',
'Background = var(--red). Text = var(--ink) white. Hard offset shadows = var(--black). Accent = white inversion blocks.',
'RULES: NO soft gradients, NO blur, NO drop-shadow blur (only hard 0-blur offset box-shadows). NO soft opacity cross-fades for reveals — everything STAMPS/SNAPS in (use steps() timing or short snappy cubic-bezier(.2,.9,.2,1), ~110-180ms). Borders are 2px solid white on structural blocks. Chips are 100px-radius pills (the only rounded thing). Square, heavy, mono, loud.',
'',
'=== FONTS (Google CDN, include preconnect) ===',
'<link rel="preconnect" href="https://fonts.googleapis.com" />',
'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
'<link href="https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />',
'  --font-display:"Anton",sans-serif;  --font-mono:"JetBrains Mono",monospace;',
'Body text = mono. Big headings/numerals = Anton, UPPERCASE.',
'',
'=== REQUIRED CHROME (every file, to match the sibling stack/ mockups) ===',
'1) Fixed top bar: a left link <a class="index-btn" href="index.html">&larr; INDEX</a> and a caption block <div class="caption"><div class="c-style">STYLE 0N / NAME</div><div class="c-hint">short interaction hint</div></div>. (Use the correct N + NAME for this mockup.)',
'2) Section header: <p class="kicker">education &middot; school</p> where .kicker::before{content:"// ";} ; then a big Anton heading reading exactly SCHOOL ; then a one-line mono sub describing the treatment.',
'3) Footer note: <div class="foot"> with spans: palette <b>#ED1C24 &middot; #FFFFFF &middot; #0A0A0A</b> / type <b>Anton + JetBrains Mono</b> / style <b>neo-brutalism</b> / technique <b>(this mockup\'s technique)</b>.',
'',
'=== CARD LANGUAGE (use for the main education card) ===',
'background:var(--red); border:2px solid var(--ink); box-shadow:8px 8px 0 var(--black);',
'hover -> transform:translate(-4px,-4px); box-shadow:14px 14px 0 var(--black);',
'active -> transform:translate(2px,2px); box-shadow:4px 4px 0 var(--black);',
'transition:transform .12s cubic-bezier(.2,.9,.2,1), box-shadow .12s cubic-bezier(.2,.9,.2,1);',
'',
'=== COURSEWORK CHIP LANGUAGE (must RHYME with the stack section) ===',
'Pill: border:1.5px solid var(--ink); border-radius:100px; padding:5px 11px; font-family mono; font-size:10px; text-transform:uppercase; letter-spacing:.12em; color:#fff; background:transparent; position:relative; overflow:hidden; cursor:pointer.',
'- DECODE-IN entrance: when the chip reveals, its label scrambles through random glyphs from charset "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*<>" and resolves left-to-right to the real text over ~450ms, staggered across chips (~45ms apart). Hard, mono, no fade.',
'- PRESS-TO-INVERT: clicking a chip toggles class .inv. Implement with a <span class="wipe"> absolutely covering the chip (background:var(--ink); clip-path:inset(0 100% 0 0); transition:clip-path 180ms steps(6,end); z-index:0) sitting BEHIND the label (label z-index:1). .inv .wipe -> clip-path:inset(0 0 0 0); .inv label -> color:var(--red). Click again to revert. This is a left->right hard wipe, not a fade.',
'',
'=== CONTENT DATA (use EXACTLY; do not invent extra facts) ===',
'School: PES UNIVERSITY  |  Bengaluru, India',
'Degree: B.Tech in Computer Science Engineering',
'Dates: Sep 2024 - May 2028 (8 semesters)',
'CGPA: 7.95 / 10',
'Honors (render with a star glyph): "CNR Merit Scholarship" -> Semester 1 ; "Academic Distinction - SGPA 7.75+" -> Semester 2 AND Semester 4.',
'Coursework chips (exactly these 8): DSA, Design & Analysis of Algorithms, Operating Systems, Computer Networks, DBMS, Linear Algebra, Math for ML, Data Science',
'Per-semester SGPA — PLACEHOLDER values (you MUST visibly label them illustrative/placeholder somewhere small): S1=7.55, S2=8.30, S3=7.62, S4=8.33 (avg ~=7.95; S2 & S4 are the 7.75+ distinction sems; S1 & S3 are below 7.75; S5-S8 are not yet graded -> show as upcoming/empty).',
'',
'=== LIVE DATE MATH (compute from the REAL current date - instantiate a fresh Date object at runtime; it must advance over real time) ===',
'DEGREE_START -> a Date for Sep 1 2024 (year 2024, JS month index 8, day 1).',
'DEGREE_END   -> a Date for May 31 2028 (year 2028, JS month index 4, day 31).',
'Semester windows (start inclusive): S1 2024-09..2024-12, S2 2025-01..2025-05, S3 2025-09..2025-12, S4 2026-01..2026-05, S5 2026-09..2026-12, S6 2027-01..2027-05, S7 2027-09..2027-12, S8 2028-01..2028-05.',
'completionPct = clamp((now - START)/(END - START)*100, 0, 100).',
'completedSemesters = number of semesters whose END is before now.',
'currentSemester = the semester now falls in; if now is in a between-terms break, use the most recently COMPLETED semester.',
'Block readout string = ("\\u25A0" repeated completedSemesters) + ("\\u25A1" repeated 8-completedSemesters) + "  " + round(completionPct) + "% \\u00B7 SEMESTER " + currentSemester.',
'SANITY CHECK: on todays date (~mid 2026) this yields completed=4, current=4, pct~=47%, readout "\\u25A0\\u25A0\\u25A0\\u25A0\\u25A1\\u25A1\\u25A1\\u25A1  47% \\u00B7 SEMESTER 4". Do NOT hardcode 48%/Sem4 — COMPUTE it so it stays honest as years pass. (The ~47% live value is intended.)',
'Include a live pulsing dot readout: "\\u25CF CURRENTLY: SEMESTER " + currentSemester (computed). The today-marker on any track sits at completionPct and pulses.',
'',
'=== ACCESSIBILITY / REDUCED MOTION ===',
'Honor @media (prefers-reduced-motion: reduce): no scrambles, no scroll-scrub autorun, no infinite pulses, no stamp punches — render the final resolved state directly (marker at today, counters at final value, chips/stars shown). Interactive controls still work.',
'Keep it keyboard-reachable where it makes sense (buttons are <button>, the index link is a real <a>).',
'',
'=== OUTPUT ===',
'Write the COMPLETE file with the Write tool to the exact path given in the task. Do not leave TODOs or placeholders in the code (other than the labelled illustrative SGPA values). Make it polished and demo-ready. Prefer vanilla JS unless GSAP ScrollTrigger is explicitly called for.',
].join('\n')

const MOCKUPS = [
  {
    n: '01', slug: '01-timeline', name: 'LIVE DEGREE TIMELINE',
    hint: 'hover a semester to see what happened there \\u00B7 marker is computed from today',
    brief: [
      'THIS MOCKUP = #1 THE LIVE DEGREE TIMELINE (the hero treatment).',
      'Centerpiece: a horizontal track spanning Sep 2024 -> May 2028 with 8 evenly spaced SEMESTER TICKS (label each S1..S8 with its term + date range in tiny mono). A solid BLOCK MARKER sits at completionPct (computed from the real date) and PULSES. Above/beside the track, a big mono READOUT shows the block string (\\u25A0\\u25A0\\u25A0\\u25A0\\u25A1\\u25A1\\u25A1\\u25A1  47% \\u00B7 SEMESTER 4) and the live "\\u25CF CURRENTLY: SEMESTER 4" pulsing dot.',
      'Completed semesters (left of marker) read as filled/active; upcoming ones (right) read as ghosted outline.',
      'PIN ACHIEVEMENTS to ticks: a star sits above S1 (CNR Merit Scholarship), S2 (Academic Distinction), S4 (Academic Distinction). HOVERING any semester tick surfaces a small hard popover panel: term + date range, that sem\'s SGPA (or "—" if upcoming/ungraded), and the achievement if any. Hover the marker too.',
      'Below the track, the main EDUCATION CARD: PES UNIVERSITY wordmark (Anton, large) + degree + a CGPA badge (7.95/10) + the 8 coursework chips (decode-in on load, press-to-invert).',
      'LIGHTNING-ROUND micro-interactions to include here: (a) PES UNIVERSITY wordmark GLITCH/DECODE scramble on hover. (b) CARD TILT-PRESS: the card leans a few degrees toward the cursor (snappy, capped ~6deg) and its hard shadow shifts to match; presses in (scale down slightly) on mousedown. (c) "SCHOOL" heading SQUASHES on scroll velocity — fake the font width axis with transform:scaleX (squash toward ~0.8 on fast scroll, spring back to 1).',
      'Reveal on LOAD (this one is not scroll-driven). Everything snaps in. Vanilla JS, no GSAP needed.',
    ].join('\n'),
  },
  {
    n: '02', slug: '02-scrollytelling', name: 'TIMELINE AS SCROLL',
    hint: 'scroll to scrub your degree \\u00B7 chips stamp in, stars punch in',
    brief: [
      'THIS MOCKUP = #2 TIMELINE AS SCROLL (scrollytelling, the hardest one).',
      'Make a TALL section that PINS while you scroll through it. Use GSAP + ScrollTrigger via CDN:',
      '  https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
      '  https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
      'As the user scrolls the pinned section, SCRUB the timeline marker from Sep 2024 toward TODAY (it stops at the live completionPct — you cannot scroll past today, because the future has not happened). The mono readout %/blocks tick up in lockstep with scroll progress (driven by scrub, clamped so it never exceeds the real today value).',
      'At the scroll point matching each semester, that semester\'s COURSEWORK CHIPS STAMP IN (scale 1.25 -> 1 + hard shadow snap, steps timing) and its ACHIEVEMENT STAR PUNCHES IN (scale 2 -> 1 with a few degrees rotation). HARD, SNAPPY reveals only — absolutely no soft opacity fades. Group the 8 coursework chips across the semesters sensibly (e.g. foundational courses early, advanced later) so the reveal feels like progressing through the degree.',
      'Include a scroll-progress indicator and the live "\\u25CF CURRENTLY: SEMESTER 4" dot. The marker pulses once it reaches today.',
      'Chips still use decode-in (trigger their decode AS they stamp in) and press-to-invert.',
      'REDUCED MOTION: skip the pin/scrub entirely; lay everything out static and resolved (marker at today, all chips + stars shown).',
      'Make sure ScrollTrigger.refresh() is called after fonts/layout settle, and the page actually has enough scroll height to drive the pin.',
    ].join('\n'),
  },
  {
    n: '03', slug: '03-cgpa-meter', name: 'CGPA HARD METER + COUNT-UP',
    hint: 'the 7.95 earns itself \\u00B7 segments stamp in, SGPA bars draw',
    brief: [
      'THIS MOCKUP = #3 CGPA AS A HARD METER + COUNT-UP.',
      'Hero element: the CGPA. When the section enters view (IntersectionObserver), a big Anton/mono numeral COUNTS UP 0.00 -> 7.95 (two decimals, monospaced so it does not jitter), over ~1.1s with a slight ease-out, ending on 7.95 / 10.',
      'Beside/under it, a 10-SEGMENT discrete block bar: ten separate hard rectangles with 2px white borders. As the count rises, segments STAMP filled left-to-right; ~8 of 10 end filled (7.95/10 -> 7.95 segments; fill 8, and make the 8th segment a partial/half fill to be honest, or fill 7 full + 1 ~95% — your call but keep it DISCRETE, no smooth gradient).',
      'Next to that, a tiny HARD BAR CHART of per-semester SGPA that DRAWS IN (bars grow from 0 with a stamp on landing, staggered). Bars: S1=7.55, S2=8.30, S3=7.62, S4=8.33 graded; S5-S8 shown as empty dashed "upcoming" outlines at zero. Y-axis roughly 6-9 so differences read. Mark S2 & S4 bars with a star (distinction). Label each bar S1..S8 + its value. Add a small "* illustrative SGPAs" note.',
      'Wrap it in the education card (PES UNIVERSITY + degree). Include the coursework chips (decode-in, press-to-invert) somewhere below.',
      'Add a "RE-RUN" button that replays the count-up + segment stamp + bar draw.',
      'LIGHTNING-ROUND: include the PES UNIVERSITY wordmark decode-on-hover and the card tilt-press. Vanilla JS, no GSAP needed.',
      'REDUCED MOTION: show 7.95, all segments at final fill, bars at final height immediately; RE-RUN just re-sets values (no animation).',
    ].join('\n'),
  },
  {
    n: '04', slug: '04-stamps', name: 'ACHIEVEMENT STAMPS',
    hint: 'awards hit the page like rubber stamps \\u00B7 click RE-STAMP',
    brief: [
      'THIS MOCKUP = #4 ACHIEVEMENT STAMPS.',
      'Render the honors as actual INK STAMPS hitting paper ("APPROVED" energy). Each honor is a bordered stamp block, slightly rotated (-4deg / +3deg / -2deg), containing a big star, the award title, and a semester tag:',
      '  - CNR MERIT SCHOLARSHIP  \\u2014 SEM 1',
      '  - ACADEMIC DISTINCTION (SGPA 7.75+)  \\u2014 SEM 2',
      '  - ACADEMIC DISTINCTION (SGPA 7.75+)  \\u2014 SEM 4',
      'STAMP MOTION on reveal (IntersectionObserver, staggered): each stamp PUNCHES in from scale ~2.2 + extra rotation + 0 -> full, slamming to its resting scale/rotation with a hard overshoot settle (the "thunk") — fast, ~220ms, steps-ish, NO fade. Add a subtle screen-shake or a tiny shadow pop on impact to sell the thunk.',
      'Give the stamps a faint INK TEXTURE / distress look using only CSS (e.g. layered hard color, a mix-blend or mask, slightly irregular double border, a faint "INK" / date overprint). Stamp ink can be white or red-on-white block — keep palette red/white/black.',
      'A "RE-STAMP" button replays the whole sequence. Hovering a stamp can nudge it (slight rotate/lift with shadow shift).',
      'Wrap in the education card with PES UNIVERSITY + degree + CGPA badge; include the coursework chips (decode-in, press-to-invert) below.',
      'LIGHTNING-ROUND: PES UNIVERSITY wordmark decode-on-hover; card tilt-press. Vanilla JS (GSAP optional but not required).',
      'REDUCED MOTION: stamps appear already placed at rest (no punch/shake); RE-STAMP just re-places them.',
    ].join('\n'),
  },
  {
    n: '05', slug: '05-transcript', name: 'DOT-MATRIX TRANSCRIPT',
    hint: 'the card prints like a receipt \\u00B7 [ VIEW TRANSCRIPT ] hard-expands',
    brief: [
      'THIS MOCKUP = #5 DOT-MATRIX / TRANSCRIPT REVEAL.',
      'The education card prints itself line-by-line like a dot-matrix / receipt printer instead of fading in. On view (IntersectionObserver), each line types/reveals in sequence (mono), with a visible PRINT-HEAD SWEEP bar moving across the current line and a blinking cursor. Lines to print in order: a header band (PES UNIVERSITY / OFFICE OF THE REGISTRAR vibe), degree, dates, CGPA 7.95/10, the honors (with stars), then the coursework as chips.',
      'Give it receipt/printer texture: a faint perforated edge or feed-hole strip down the sides, monospaced everything, slight paper grain via CSS (hard, no blur). A small status line like "PRINTING..." -> "READY".',
      'Add a [ VIEW TRANSCRIPT ] toggle button. Clicking it HARD-EXPANDS the card downward (height grows with a snappy steps/cubic transition and the BOX-SHADOW GROWS as it pushes open, like the card is physically opening) to reveal a raw data TABLE: columns SEM | TERM | SGPA | STATUS | ACHIEVEMENT, rows S1..S8 (S1-S4 graded with the SGPA placeholders + COMPLETE; S5-S8 = UPCOMING, SGPA "--"). Distinction rows flag the star. Registrar-office-meets-brutalism: monospaced table, 2px rules, hard header row. Toggle again to collapse (shadow shrinks back). Mark SGPAs as illustrative.',
      'Coursework chips keep decode-in + press-to-invert.',
      'LIGHTNING-ROUND: PES UNIVERSITY wordmark decode-on-hover; the live "\\u25CF CURRENTLY: SEMESTER 4" dot in the header band. Vanilla JS, no GSAP needed.',
      'REDUCED MOTION: print everything instantly (no per-line typing/sweep); the VIEW TRANSCRIPT toggle still expands but without the long animation.',
    ].join('\n'),
  },
]

const BUILD_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['file', 'techniques', 'usesGsap', 'lineCount', 'notes'],
  properties: {
    file: { type: 'string', description: 'absolute path written' },
    techniques: { type: 'array', items: { type: 'string' }, description: 'the interactions actually implemented' },
    usesGsap: { type: 'boolean' },
    lineCount: { type: 'number', description: 'approx total lines in the file' },
    notes: { type: 'string', description: 'anything notable, assumptions, or known gaps' },
  },
}

const REVIEW_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdict', 'aestheticScore', 'findings'],
  properties: {
    verdict: { type: 'string', enum: ['pass', 'issues'] },
    aestheticScore: { type: 'number', description: '1-10 brutalist-fidelity + polish' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['severity', 'area', 'problem', 'fix'],
        properties: {
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          area: { type: 'string' },
          problem: { type: 'string' },
          fix: { type: 'string', description: 'concrete, actionable fix' },
        },
      },
    },
  },
}

const FIX_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['file', 'applied', 'skipped'],
  properties: {
    file: { type: 'string' },
    applied: { type: 'array', items: { type: 'string' } },
    skipped: { type: 'array', items: { type: 'string' } },
  },
}

phase('Build')

const results = await pipeline(
  MOCKUPS,
  // STAGE 1 — build
  (m) => agent(
    SPEC +
    '\n\n=== THIS FILE ===\n' +
    'Write to EXACTLY this path: ' + OUTDIR + '/' + m.slug + '.html\n' +
    'STYLE number = ' + m.n + ' / NAME = ' + m.name + ' ; top-bar c-hint = "' + m.hint + '".\n\n' +
    m.brief,
    { label: 'build:' + m.slug, phase: 'Build', schema: BUILD_SCHEMA }
  ).then((build) => ({ m, build })),

  // STAGE 2 — adversarial review
  (prev, m) => agent(
    'You are an exacting design-engineer reviewing a single self-contained neo-brutalist HTML mockup for a portfolio EDUCATION section.\n' +
    'Read the file: ' + OUTDIR + '/' + m.slug + '.html\n' +
    'This mockup is STYLE ' + m.n + ' (' + m.name + '). Its intended behavior:\n' + m.brief + '\n\n' +
    'Review HARD against this rubric and report concrete findings (with the exact fix). Be adversarial; assume bugs exist.\n' +
    '1. CORRECTNESS: read the JS for errors. Does the live date math compute completed=4, current=4, pct~47% for mid-2026 (NOT hardcoded 48)? Are there undefined vars, unclosed tags, missing CDN scripts, or handlers wired to nonexistent elements? For STYLE 02, is GSAP+ScrollTrigger actually loaded and does the pin have real scroll height + a clamp so the marker never scrubs past today?\n' +
    '2. BRUTALIST FIDELITY: strictly red(#ed1c24)/white/black only? Hard 0-blur offset shadows only (no blurred/soft shadows)? Any soft opacity cross-fades used for reveals (FORBIDDEN — must be steps/snap stamps)? Any stray gradients, border-radius on structural blocks, or off-palette colors?\n' +
    '3. SPEC COVERAGE: every required element present — INDEX top bar + caption, "// education \\u00B7 school" kicker, big Anton "SCHOOL" heading, footer note; coursework chips with decode-in AND press-to-invert (clip-path wipe, not fade); the mockup-specific feature fully working; the listed lightning-round micro-interactions for THIS mockup.\n' +
    '4. CONTENT ACCURACY: PES University, B.Tech CSE, Sep 2024-May 2028, CGPA 7.95/10, CNR scholarship=Sem1, distinction=Sem2&4, the 8 exact coursework names, SGPA placeholders labelled illustrative.\n' +
    '5. REDUCED MOTION: a real prefers-reduced-motion branch that shows the resolved state.\n' +
    '6. RESPONSIVE: does it survive a ~390px mobile width without overflow/overlap?\n' +
    'Set verdict=pass only if there are no high/medium findings. List EVERY issue with a precise, directly-applicable fix.',
    { label: 'review:' + m.slug, phase: 'Review', schema: REVIEW_SCHEMA }
  ).then((review) => ({ ...prev, review })),

  // STAGE 3 — apply fixes (only if needed)
  (prev, m) => {
    const actionable = (prev.review.findings || []).filter(f => f.severity === 'high' || f.severity === 'medium')
    if (prev.review.verdict === 'pass' || actionable.length === 0) {
      return { m: m.slug, build: prev.build, review: prev.review, fix: { file: OUTDIR + '/' + m.slug + '.html', applied: [], skipped: ['no high/medium findings'] } }
    }
    return agent(
      'Apply these review fixes to the file ' + OUTDIR + '/' + m.slug + '.html (STYLE ' + m.n + ' / ' + m.name + ').\n' +
      'Read the file, then make precise edits. Preserve the working parts; only change what the findings call for. Keep it a single self-contained file, keep the red/white/black brutalist house style (hard shadows, snap/steps reveals, no soft fades), and do not break the live date math.\n\n' +
      'FINDINGS TO FIX:\n' +
      actionable.map((f, i) => (i + 1) + '. [' + f.severity + '] (' + f.area + ') ' + f.problem + '\n   FIX: ' + f.fix).join('\n') +
      '\n\nAfter editing, report what you applied vs. deliberately skipped (with reason).',
      { label: 'fix:' + m.slug, phase: 'Fix', schema: FIX_SCHEMA }
    ).then((fix) => ({ m: m.slug, build: prev.build, review: prev.review, fix }))
  }
)

log('All 5 mockups built, reviewed, and fixed.')

return results.filter(Boolean).map(r => ({
  file: r.m,
  techniques: r.build && r.build.techniques,
  aestheticScore: r.review && r.review.aestheticScore,
  verdict: r.review && r.review.verdict,
  fixesApplied: r.fix && r.fix.applied,
  highMedFindings: r.review && (r.review.findings || []).filter(f => f.severity !== 'low').length,
}))
