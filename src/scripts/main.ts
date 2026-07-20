import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { site } from '../data/site';

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll(sel)) as T[];

/** A front page for whoever opens the console — the audience that opens
 *  devtools is exactly the one this site is courting. "Nothing is opaque
 *  once you look": look here too, and the paper is printing. */
function initConsole() {
  const w = window as unknown as { __pressConsole?: boolean; hire?: () => string; stderr?: unknown };
  if (w.__pressConsole) return;
  w.__pressConsole = true;
  try {
    const red = 'background:#ed1c24;color:#f7f5f1;font:700 20px/1.7 "JetBrains Mono",monospace;padding:6px 16px;';
    const lime = 'color:#7bbf00;font:700 11px "JetBrains Mono",monospace;letter-spacing:0.22em;';
    const paper = 'background:#f7f5f1;color:#141414;font:13px "JetBrains Mono",monospace;padding:3px 8px;';
    const dim = 'color:#928b80;font:12px "JetBrains Mono",monospace;';
    const cta = 'color:#555;font:12px "JetBrains Mono",monospace;';
    const ctaHi = 'background:#b4ff2e;color:#0a0a0a;font:700 12px "JetBrains Mono",monospace;padding:2px 6px;';

    console.log('%c THE DAILY CHEETHIRALA ', red);
    console.log('%cALL THE BUGS FIT TO PRINT', lime);
    console.log('%cYou opened the source. The editor noted it.', paper);
    console.log('%c> reviews commits. remains unimpressed.   — stderr', dim);
    console.log('%cWant the offer? Type %chire()%c and hit enter.', cta, ctaHi, cta);

    w.hire = function hire() {
      console.log('%c NOW HIRING (you, ideally) ', red);
      console.log('%c' + site.availability, paper);
      console.log('%c✉  ' + site.email, cta);
      console.log('%c⌥  ' + site.socials.github, cta);
      console.log('%c↗  resume: ' + location.origin + site.resume, cta);
      return site.email;
    };
    w.stderr = {
      review() {
        const q = [
          "it compiles. doesn't mean it's good.",
          'approved. reluctantly.',
          'saw your TODO list. bold of you.',
          'i was asleep for the tests. they still passed.',
          "ship it. i'm not reviewing this again.",
        ];
        console.log('%c> ' + q[(Math.random() * q.length) | 0], lime);
      },
      toString() {
        return '> unimpressed, as ever.';
      },
    };
  } catch {
    /* console styling unsupported — skip the greeting */
  }
}

/** Live clock in a fixed timezone (Asia/Kolkata). */
function startClock() {
  const tz = 'Asia/Kolkata';
  const dateEl = document.getElementById('clock-date');
  const timeEl = document.getElementById('clock-time');

  const fmtDate = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // folio strips print today's date once (static furniture, not a ticking clock)
  const folioDate = fmtDate.format(new Date()).toUpperCase();
  $$('[data-folio-date]').forEach((el) => (el.textContent = folioDate));

  const nightEl = document.getElementById('night-time');
  if (!dateEl && !timeEl && !nightEl) return;
  const fmtTime = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const tick = () => {
    const now = new Date();
    if (dateEl) dateEl.textContent = fmtDate.format(now);
    if (timeEl) timeEl.textContent = fmtTime.format(now).toLowerCase();
    if (nightEl) nightEl.textContent = fmtTime.format(now) + ' IST';
  };
  tick();
  setInterval(tick, 1000);
}

/** Copy-to-clipboard for any [data-copy-email] element. */
function initEmailCopy() {
  $$('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email') ?? '';
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        /* clipboard blocked — ignore */
      }
      const label = btn.querySelector<HTMLElement>('.copy-label');
      if (!label) return;
      const original = label.textContent;
      label.textContent = 'Copied ✓';
      window.setTimeout(() => {
        label.textContent = original;
      }, 1600);
    });
  });
}

/** Decode Wake (site-wide, on the red grid): the page sits in ciphertext; the
 *  cursor decodes the real message in its wake, then it scrambles back. Rendered
 *  into #reactive-grid (fixed, z-index:-1) so it shows only on the red gridded
 *  sections and stays behind every component. Native white/lime-on-red. */
function initGridWake() {
  const grid = document.getElementById('reactive-grid');
  if (!grid) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cipherCv = document.createElement('canvas');
  const wakeCv = document.createElement('canvas');
  cipherCv.className = 'wk-cv';
  wakeCv.className = 'wk-cv';
  grid.replaceChildren(cipherCv, wakeCv);
  const cg = cipherCv.getContext('2d');
  const wg = wakeCv.getContext('2d');
  if (!cg || !wg) return;
  const c2 = cg, g2 = wg;
  const dpr = Math.min(2, window.devicePixelRatio || 1);

  const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#/<>[]{}*+=·.@%&'.split('');
  // ONE MESSAGE, THREE VOICES — identical to the hero marquee + the edition's themes
  const MESSAGE =
    'LOCAL-FIRST TOOLS · TRANSPARENT ML · GPU KERNELS IN THE BROWSER · THE INTERNALS OF GPT-2 · GIT REBUILT IN C · NOTHING IS OPAQUE ONCE YOU LOOK · ';
  const LIFE = 1300, SCRAMBLE = 260, HOLD = 500;

  interface Cell { c: number; r: number; t0: number; seed: number; }
  const cells = new Map<string, Cell>();

  let CELL = 70, cols = 0, rows = 0, W = 1, H = 1;
  const COL = { cipher: '', resolved: '', scramble: '' };

  const wrap = (i: number, n: number) => ((i % n) + n) % n;
  const target = (r: number, c: number) => { const ch = MESSAGE[wrap(r * cols + c, MESSAGE.length)]; return ch === ' ' ? '' : ch; };
  const baseGlyph = (r: number, c: number) => (target(r, c) === '' ? '' : GLYPHS[wrap(r * 7 + c * 29 + 13, GLYPHS.length)]);
  const fontStr = () => '700 ' + Math.round(CELL * 0.4) + 'px "JetBrains Mono", monospace';
  // CSS grid lines sit at -1 + k*CELL, so cell centres land at k*CELL + CELL/2 - 1
  const cellX = (c: number) => c * CELL + CELL / 2 - 1;
  const cellY = (r: number) => r * CELL + CELL / 2 - 1;
  const cellOf = (x: number, y: number): [number, number] => [Math.floor((x + 1) / CELL), Math.floor((y + 1) / CELL)];

  const readCellPx = () => {
    const n = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--grid-size'), 10);
    return Number.isNaN(n) ? 70 : n; // match the grid lines exactly
  };
  function readColors() {
    const cs = getComputedStyle(grid as HTMLElement);
    COL.cipher = cs.getPropertyValue('--wk-cipher').trim() || 'rgba(255,255,255,0.06)';
    COL.resolved = cs.getPropertyValue('--wk-resolved').trim() || 'rgba(255,255,255,0.9)';
    COL.scramble = cs.getPropertyValue('--wk-scramble').trim() || '#b4ff2e';
  }

  const build = () => {
    W = window.innerWidth; H = window.innerHeight;
    for (const cv of [cipherCv, wakeCv]) {
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
    }
    c2.setTransform(dpr, 0, 0, dpr, 0, 0);
    g2.setTransform(dpr, 0, 0, dpr, 0, 0);
    CELL = readCellPx();
    cols = Math.ceil(W / CELL) + 1;
    rows = Math.ceil(H / CELL) + 1;
    readColors();
    drawCipher();
  };
  function drawCipher() {
    c2.clearRect(0, 0, W, H);
    c2.font = fontStr(); c2.textAlign = 'center'; c2.textBaseline = 'middle'; c2.fillStyle = COL.cipher;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const g = baseGlyph(r, c); if (g) c2.fillText(g, cellX(c), cellY(r) + 1); }
  }
  /* STOP THE PRESS: while the press is held, the whole sheet confesses —
     the static layer redraws as the resolved message instead of ciphertext */
  function drawReveal() {
    c2.clearRect(0, 0, W, H);
    c2.font = fontStr(); c2.textAlign = 'center'; c2.textBaseline = 'middle';
    c2.fillStyle = 'rgba(255,255,255,0.34)';
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const g = target(r, c); if (g) c2.fillText(g, cellX(c), cellY(r) + 1); }
  }
  (window as unknown as { __wakeReveal?: (on: boolean) => void }).__wakeReveal = (on) => {
    cells.clear();
    g2.clearRect(0, 0, W, H);
    if (on) drawReveal(); else drawCipher();
  };

  let running = false, lastC: number | null = null, lastR: number | null = null, now = 0;
  function touch(c: number, r: number) {
    if (c < 0 || r < 0 || c >= cols || r >= rows) return;
    if (target(r, c) === '') return; // skip word-gaps
    cells.set(r + ',' + c, { c, r, t0: now, seed: r * 131 + c * 17 });
  }
  function march(c0: number, r0: number, c1: number, r1: number) {
    const dc = c1 - c0, dr = r1 - r0, steps = Math.max(Math.abs(dc), Math.abs(dr));
    if (steps === 0) { touch(c1, r1); return; }
    for (let i = 0; i <= steps; i++) touch(Math.round(c0 + (dc * i) / steps), Math.round(r0 + (dr * i) / steps));
  }
  function frame(t: number) {
    now = t;
    g2.clearRect(0, 0, W, H); g2.font = fontStr(); g2.textAlign = 'center'; g2.textBaseline = 'middle';
    cells.forEach((cell, key) => {
      const age = t - cell.t0;
      if (age / LIFE >= 1) { cells.delete(key); return; }
      const x = cellX(cell.c), y = cellY(cell.r) + 1;
      if (age < SCRAMBLE) {
        const g = GLYPHS[wrap(((age / 45) | 0) + cell.seed, GLYPHS.length)];
        g2.fillStyle = COL.scramble; g2.fillText(g, x, y); // lime reads vividly on red — no outline needed
      } else {
        const g = target(cell.r, cell.c);
        if (!g) return;
        const fade = age < SCRAMBLE + HOLD ? 1 : 1 - (age - SCRAMBLE - HOLD) / (LIFE - SCRAMBLE - HOLD);
        g2.globalAlpha = Math.max(0, fade); g2.fillStyle = COL.resolved; g2.fillText(g, x, y); g2.globalAlpha = 1;
      }
    });
    if (cells.size > 0) requestAnimationFrame(frame); else running = false;
  }
  function start() { if (!running) { running = true; requestAnimationFrame(frame); } }

  build();
  let rt: number | undefined;
  window.addEventListener('resize', () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(() => { build(); cells.clear(); g2.clearRect(0, 0, W, H); }, 180);
  });
  if (reduced) return; // ciphertext drawn statically; skip the decode trail

  let queued = false, mx = -9999, my = -9999;
  window.addEventListener(
    'pointermove',
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      if ((window as unknown as { __pressFreeze?: boolean }).__pressFreeze) return;
      if (!queued) {
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          const [c, r] = cellOf(mx, my);
          if (c === lastC && r === lastR) return;
          now = performance.now();
          if (lastC === null || lastR === null) touch(c, r);
          else march(lastC, lastR, c, r);
          lastC = c; lastR = r;
          start();
        });
      }
    },
    { passive: true }
  );
  window.addEventListener('pointerleave', () => { lastC = null; lastR = null; });
}

/** STOP THE PRESS — the signature hold. While held: Lenis stops, the GSAP
 *  global timeline pauses, every CSS animation pauses (html.press-held), the
 *  canvas loops freeze via window.__pressFreeze, the background grid redraws
 *  as its resolved plaintext, and a red stamp slams in. Release spools it all
 *  back up. Inputs: hold Space (outside fields/modals) or press-and-hold the
 *  hero marquee strip. */
function initStopThePress(lenis: { stop: () => void; start: () => void }) {
  const root = document.documentElement;
  const w = window as unknown as { __pressFreeze?: boolean; __wakeReveal?: (on: boolean) => void };

  const stamp = document.createElement('div');
  stamp.id = 'press-stamp';
  stamp.setAttribute('aria-hidden', 'true');
  stamp.innerHTML =
    '<span class="ps-big">STOP&nbsp;THE&nbsp;PRESS</span>' +
    '<span class="ps-sub">the edition waits — release to print</span>';
  document.body.appendChild(stamp);

  let held = false;
  const modalOpen = () => document.body.style.overflow === 'hidden';
  // the cover-stack pins are scroll-driven (ScrollTrigger.update), which neither
  // lenis.stop() nor globalTimeline.pause() halts — so a wheel/touch/key during a
  // hold could still scrub a cover open. Block raw scroll input while frozen.
  const blockScroll = (e: Event) => e.preventDefault();
  const blockKeys = (e: KeyboardEvent) => {
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].indexOf(e.code) >= 0) e.preventDefault();
  };
  function hold() {
    if (held || modalOpen()) return;
    held = true;
    w.__pressFreeze = true;
    root.classList.add('press-held');
    lenis.stop();
    gsap.globalTimeline.pause();
    window.addEventListener('wheel', blockScroll, { passive: false });
    window.addEventListener('touchmove', blockScroll, { passive: false });
    window.addEventListener('keydown', blockKeys, { passive: false });
    if (w.__wakeReveal) w.__wakeReveal(true);
  }
  function release() {
    if (!held) return;
    held = false;
    w.__pressFreeze = false;
    root.classList.remove('press-held');
    lenis.start();
    gsap.globalTimeline.play();
    window.removeEventListener('wheel', blockScroll);
    window.removeEventListener('touchmove', blockScroll);
    window.removeEventListener('keydown', blockKeys);
    if (w.__wakeReveal) w.__wakeReveal(false);
  }

  const typing = () => {
    const el = document.activeElement as HTMLElement | null;
    return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
  };
  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || typing() || modalOpen()) return;
    e.preventDefault(); // space must not scroll the stopped press
    if (!e.repeat) hold();
  });
  document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') release();
  });

  const mq = document.querySelector<HTMLElement>('.hp-marquee');
  if (mq) {
    mq.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      try { mq.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      hold();
    });
    ['pointerup', 'pointercancel'].forEach((t) => mq.addEventListener(t, release));
  }

  // never stay frozen if focus or visibility is lost mid-hold
  window.addEventListener('blur', release);
  document.addEventListener('visibilitychange', () => { if (document.hidden) release(); });
}

/** Pause the CSS marquees/tickers while their section is off-screen — the
 *  compositor otherwise animates them for the whole session. The class (not an
 *  inline style) keeps the stylesheet hover-pause rules working on-screen.
 *  (The hero's .mq-track is owned by the hero engine, which can also see the
 *  edition occluding the sticky hero — something a plain IO can't.) */
function pauseOffscreenMarquees() {
  if (!('IntersectionObserver' in window)) return;
  const tracks = $$('.edition .ticker-track, .ph-ticker-track');
  if (!tracks.length) return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => en.target.classList.toggle('mq-offstage', !en.isIntersecting)),
    { rootMargin: '60px 0px' }
  );
  tracks.forEach((t) => io.observe(t));
}

export function initAnimations() {
  initConsole();
  startClock();
  initEmailCopy();
  initGridWake();
  pauseOffscreenMarquees();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    $$('[data-fade]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // --- press-start: run the platen feed (html.boot was staged pre-paint) ---
  const rootEl = document.documentElement;
  if (rootEl.classList.contains('boot')) {
    requestAnimationFrame(() => requestAnimationFrame(() => rootEl.classList.add('boot-go')));
    window.setTimeout(() => rootEl.classList.add('boot-go'), 300); // rAF-stall safety
    window.setTimeout(() => rootEl.classList.add('boot-done'), 1600); // never stay clipped
  }

  gsap.registerPlugin(ScrollTrigger);
  // mobile URL-bar show/hide fires resize mid-scroll; don't re-measure the pins
  // under the user's thumb (it would jump all five seams at once)
  ScrollTrigger.config({ ignoreMobileResize: true });

  // --- Smooth scroll (Lenis) wired into ScrollTrigger ---
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // share the instance so the orbital nav travels through Lenis too
  (window as unknown as { __lenis?: unknown }).__lenis = lenis;

  // --- --press-vel: one normalized scroll-velocity signal (-1..1) ---
  // Print-physics consumers read it from CSS (headline plates slip apart under
  // fast scroll and snap back into register at rest). The rAF is self-stopping:
  // it only runs while the signal is decaying toward zero.
  let pv = 0;
  let pvTarget = 0;
  let pvRaf = 0;
  const docStyle = document.documentElement.style;
  const pvTick = () => {
    pv += (pvTarget - pv) * 0.16;
    pvTarget *= 0.84; // the press settles
    if (Math.abs(pv) < 0.004 && Math.abs(pvTarget) < 0.004) {
      pv = 0;
      docStyle.setProperty('--press-vel', '0');
      pvRaf = 0;
      return;
    }
    docStyle.setProperty('--press-vel', pv.toFixed(3));
    pvRaf = requestAnimationFrame(pvTick);
  };
  lenis.on('scroll', (l: { velocity: number }) => {
    pvTarget = Math.max(-1, Math.min(1, (l.velocity || 0) / 60));
    if (!pvRaf) pvRaf = requestAnimationFrame(pvTick);
  });

  initStopThePress(lenis);

  // genuine resize / rotation needs a settle-then-refresh so the pins recompute
  // their cover distance ('+=100%') and the -100vh covers stay flush. (URL-bar
  // churn is already ignored via ScrollTrigger.config above.)
  let resizeT = 0;
  const onResize = () => {
    window.clearTimeout(resizeT);
    resizeT = window.setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 200);
  };
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  // smooth in-page anchor jumps (the orbital nav handles its own links via [data-onav])
  $$('a[href*="#"]:not([data-onav])').forEach((a) => {
    const href = a.getAttribute('href') ?? '';
    const hash = href.includes('#') ? '#' + href.split('#')[1] : '';
    if (hash.length <= 1) return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: 0 });
      }
    });
  });

  const build = () => {
    // generic fade-up
    $$('[data-fade]').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    // (the standalone seam dividers were removed — the cover-stack's lay-on top
    //  edge leads each act over the one below, so it owns the seam now)

    $$('[data-count]').forEach((el) => {
      const raw = el.getAttribute('data-count') ?? '';
      const m = raw.match(/^(\d+)(.*)$/);
      if (!m) return;
      const target = parseInt(m[1], 10);
      const suffix = m[2];
      const obj = { n: 0 };
      el.textContent = '0' + suffix;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () =>
          gsap.to(obj, {
            n: target,
            duration: 1.1,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.n) + suffix;
            },
          }),
      });
    });

    // (the Switchboard's 3D tilt-in went with it — the Research desk is a flat
    //  sheet like the about edition, and its console is event-driven, not scrubbed)

    // ── cover-stack: each act pins at its tail (its bottom reaches the viewport
    //    bottom) while the next act — pulled up -100vh and painted above (CSS,
    //    gated by html.cover-on) — slides over the frozen act. pinSpacing keeps
    //    the layout so there's no jump. The class lands HERE, inside build(), so
    //    the destructive -100vh/z-index geometry only applies once the pins that
    //    compensate it exist; reduced-motion / no-JS get a clean sequential
    //    stack with no overlap. Pins are created BEFORE the seats below, with a
    //    descending refreshPriority, so each pin's spacer is reconciled before
    //    the next pin (and the seats) measure position. end:'+=100%' is viewport
    //    -relative and refresh-safe, staying locked to the -100vh cover pull.
    document.documentElement.classList.add('cover-on');
    const PINS = ['[data-flow-wrap]', '#projects', '#research', '#education', '#stack'];
    PINS.forEach((sel, i) => {
      const el = document.querySelector<HTMLElement>(sel);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'bottom bottom',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        refreshPriority: PINS.length - i,
      });
    });

    // ── lay-on seat: each act's printed top edge (::before cut + ::after ticks)
    //    seats — slides down, lift shadow blooms — as the act lays itself on the
    //    stack. The act's OWN top rises through the viewport DURING its cover
    //    slide (it covers the act below while the predecessor is pinned and this
    //    act is not yet pinned), so anchoring to the act's own top fires the seat
    //    right as the sheet leads on. (Anchoring to the predecessor is wrong — a
    //    pinned predecessor is frozen at its band start, so the scrub never
    //    advances.) A fractional scrub lets the printed edge trail a beat, like a
    //    real sheet catching up. Drives CSS vars only, never the section
    //    transform, so each act's position:fixed children stay put.
    // Each seam seats with its own "press action": the per-act ease is the
    // character. The Black Proof and the Run Finishes land with a heavy
    // overshoot thunk (black onto white; the run shipping back out), the Staple
    // bites with a small one, the Alarm warms in on a glide, the blackout dims.
    // Scrub-tied, so the overshoot is the reader's to control.
    const SEAT_EASE: Record<string, string> = {
      projects: 'back.out(2.4)', // The Black Proof — black slams onto white
      research: 'power3.out', // Alarm Raise — a clean warming glide
      education: 'back.out(1.1)', // The Staple — a short hard bite
      stack: 'power1.inOut', // Lights Out — a slow dim
      contact: 'back.out(2.8)', // The Run Finishes — the heaviest landing
    };
    ['projects', 'research', 'education', 'stack', 'contact'].forEach((id) => {
      const act = document.getElementById(id);
      if (!act) return;
      gsap.fromTo(
        act,
        { '--lay-y': '-46px', '--lay-o': 0 },
        {
          '--lay-y': '0px',
          '--lay-o': 1,
          ease: SEAT_EASE[id] || 'none',
          scrollTrigger: { trigger: act, start: 'top 92%', end: 'top 54%', scrub: true },
        }
      );
    });

    ScrollTrigger.refresh();
    document.documentElement.classList.remove('staging'); // stack collapsed — reveal the page
  };

  // wait for webfonts so ScrollTrigger measures settled layout — but never leave
  // the page un-built if fonts.ready stalls (build() installs the cover-stack and
  // sets html.cover-on; without it the gated geometry simply never applies, a
  // clean sequential fallback). Race fonts.ready against load and a timeout, once.
  let built = false;
  const startBuild = () => {
    if (built) return;
    built = true;
    build();
  };
  // Reveal the hero on the NEXT frame — it sits at the top before the stack collapses,
  // so the first paint is already correct without waiting on the build. Then build the
  // cover-stack a frame LATER, off the critical path: its synchronous pinning + refresh
  // was blocking the main thread for seconds, freezing every JS animation on landing
  // (only the CSS marquee kept moving). This way the hero paints and its rain + fade-in
  // play first, then the stack builds. fonts/images re-measure after.
  const reveal = () => document.documentElement.classList.remove('staging');
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
  // reveal now (hero is at the top), then build the cover-stack in IDLE time so the
  // hero's load-in cypher + rain play on a free main thread first — the synchronous
  // pinning + refresh was the multi-second landing freeze.
  requestAnimationFrame(() => { reveal(); ric ? ric(startBuild, { timeout: 1200 }) : window.setTimeout(startBuild, 300); });
  window.setTimeout(startBuild, 1500);
  const resettle = () => { try { ScrollTrigger.refresh(); } catch (e) { /* noop */ } };
  if (document.fonts && 'ready' in document.fonts) document.fonts.ready.then(resettle);
  window.addEventListener('load', resettle);
}
