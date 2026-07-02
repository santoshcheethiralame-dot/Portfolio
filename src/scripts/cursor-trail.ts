/** Per-folio cursor trails — the cursor picks up a different press instrument at
 *  each desk. One full-bleed canvas (pointer-events:none) sits over the acts and
 *  switches mode based on which folio the cursor is over; the canvas blend-mode is
 *  set per mode so ink multiplies into paper, glow screens onto dark, etc. The
 *  Stack is intentionally left out — its UV-lamp reveal already owns the cursor. */

type Mode = 'front' | 'work' | 'board' | 'record' | 'closer';

interface TrailMode {
  blend: string;
  spawn(m: Cursor): void;
  draw(ctx: CanvasRenderingContext2D, dt: number, m: Cursor): void;
  reset(): void;
}

interface Cursor {
  x: number; y: number; px: number; py: number; has: boolean; down: boolean; W: number; H: number; t: number; el: Element | null;
}

export function initCursorTrail() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return; // mouse only — no trail on touch

  const cv = document.createElement('canvas');
  cv.id = 'cursor-trail';
  cv.setAttribute('aria-hidden', 'true');
  const s = cv.style;
  s.position = 'fixed';
  s.left = '0';
  s.top = '0';
  s.width = '100%';
  s.height = '100%';
  s.pointerEvents = 'none';
  s.zIndex = '1200'; // over the acts (z 2-6), under the nav (1300) and modals
  document.body.appendChild(cv);
  document.documentElement.classList.add('ctrail'); // acts may now swap in their instrument cursors
  const ctx = cv.getContext('2d')!;

  const m: Cursor = { x: -99, y: -99, px: -99, py: -99, has: false, down: false, W: 0, H: 0, t: 0, el: null };
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  const fit = () => {
    m.W = window.innerWidth;
    m.H = window.innerHeight;
    cv.width = Math.round(m.W * DPR);
    cv.height = Math.round(m.H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  };
  fit();
  window.addEventListener('resize', fit);

  window.addEventListener('mousemove', (e) => { m.x = e.clientX; m.y = e.clientY; m.has = true; }, { passive: true });
  window.addEventListener('mousedown', () => { m.down = true; }, { passive: true });
  window.addEventListener('mouseup', () => { m.down = false; }, { passive: true });

  // ── FRONT — wet ink: a nib drags a smear that pools when slow, thins when fast,
  //    and sheds blots that bleed outward and dry away on the newsprint ──────────
  const inkPts: Array<{ x: number; y: number; t: number; w: number }> = [];
  const pools: Array<{ x: number; y: number; r: number; t: number; seed: number }> = []; // ink soaking into the grain
  const spex: Array<{ x: number; y: number; r: number; t: number }> = [];                 // fine splatter off the nib
  const front: TrailMode = {
    blend: 'multiply', // ink soaks into the paper instead of sitting on top
    reset() { inkPts.length = 0; pools.length = 0; spex.length = 0; },
    spawn(c) {
      const dx = c.x - c.px, dy = c.y - c.py, sp = Math.hypot(dx, dy);
      if (sp < 0.5 && inkPts.length) return;
      const w = Math.max(5.5, 13 - sp * 0.16); // slow drag lays a fat wet line; fast keeps some body
      // densify the move so a fast streak stays a smooth curve, not an angular jump
      const steps = Math.min(26, Math.max(1, Math.round(sp / 5)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        inkPts.push({ x: c.px + dx * t, y: c.py + dy * t, t: c.t, w: w * (0.85 + Math.random() * 0.3) });
      }
      if (inkPts.length > 70) inkPts.splice(0, inkPts.length - 70);
      // where the nib lingers, ink pools and soaks into the grain (an irregular stain, not a clean disc)
      if (sp < 7 && Math.random() < 0.5) {
        pools.push({ x: c.x + (Math.random() - 0.5) * 6, y: c.y + (Math.random() - 0.5) * 6, r: 4 + Math.random() * 6, t: c.t, seed: Math.random() * 6.28 });
        if (pools.length > 40) pools.shift();
      }
      // racing the nib flicks fine splatter ahead of the stroke
      if (sp > 13 && Math.random() < 0.55) {
        const a = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.5, d = 6 + Math.random() * 18;
        spex.push({ x: c.x + Math.cos(a) * d, y: c.y + Math.sin(a) * d, r: 0.6 + Math.random() * 1.7, t: c.t });
        if (spex.length > 60) spex.shift();
      }
    },
    draw(c2, _dt, c) {
      c2.lineCap = 'round';
      c2.lineJoin = 'round';
      // the wet smear — a body pass, then a darker glossy core where the ink runs thickest
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 1; i < inkPts.length - 1; i++) {
          const prv = inkPts[i - 1], p = inkPts[i], nxt = inkPts[i + 1];
          const age = 1 - (c.t - p.t) / 950;
          if (age <= 0) continue;
          if (pass === 0) { c2.strokeStyle = 'rgba(20,18,14,' + (age * 0.55).toFixed(3) + ')'; c2.lineWidth = p.w * Math.max(0.4, age); }
          else { c2.strokeStyle = 'rgba(7,6,4,' + (age * 0.42).toFixed(3) + ')'; c2.lineWidth = p.w * Math.max(0.3, age) * 0.5; }
          c2.beginPath();
          c2.moveTo((prv.x + p.x) / 2, (prv.y + p.y) / 2);
          c2.quadraticCurveTo(p.x, p.y, (p.x + nxt.x) / 2, (p.y + nxt.y) / 2); // smooth curve through each point
          c2.stroke();
        }
      }
      while (inkPts.length && c.t - inkPts[0].t > 950) inkPts.shift();
      // pools: an irregular soak (overlapping offset ellipses) that dries inward — never balloons
      for (let i = pools.length - 1; i >= 0; i--) {
        const b = pools[i], age = (c.t - b.t) / 1500;
        if (age >= 1) { pools.splice(i, 1); continue; }
        const r = b.r * (1 - age * 0.16);
        c2.fillStyle = 'rgba(18,16,12,' + ((1 - age) * 0.4).toFixed(3) + ')';
        for (let k = 0; k < 3; k++) {
          const ang = b.seed + k * 2.1, ox = Math.cos(ang) * r * 0.4, oy = Math.sin(ang) * r * 0.4;
          c2.beginPath(); c2.ellipse(b.x + ox, b.y + oy, r * (0.72 - k * 0.13), r * (0.64 - k * 0.11), ang, 0, 7); c2.fill();
        }
      }
      // splatter: sharp little specks that just dry in place
      for (let i = spex.length - 1; i >= 0; i--) {
        const s = spex[i], age = (c.t - s.t) / 1100;
        if (age >= 1) { spex.splice(i, 1); continue; }
        c2.fillStyle = 'rgba(16,14,10,' + ((1 - age) * 0.62).toFixed(3) + ')';
        c2.beginPath(); c2.arc(s.x, s.y, s.r, 0, 7); c2.fill();
      }
    },
  };

  // ── WORK — plotter trace: a live red signal draws your path on the bench and
  //    decays like scope phosphor, glowing where the instruments run ─────────────
  const trace: Array<{ x: number; y: number; t: number }> = [];
  const work: TrailMode = {
    blend: 'screen', // the signal glows on the dark bench instead of sitting flat
    reset() { trace.length = 0; },
    spawn(c) {
      const dx = c.x - c.px, dy = c.y - c.py, sp = Math.hypot(dx, dy);
      if (sp < 0.4 && trace.length) return;
      const steps = Math.min(20, Math.max(1, Math.round(sp / 7)));
      for (let i = 1; i <= steps; i++) { const t = i / steps; trace.push({ x: c.px + dx * t, y: c.py + dy * t, t: c.t }); }
      if (trace.length > 90) trace.splice(0, trace.length - 90);
    },
    draw(c2, dt, c) {
      const LIFE = 680;
      c2.lineCap = 'round';
      c2.lineJoin = 'round';
      // two passes: a wide faint halo then a bright core, for a phosphor glow
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 1; i < trace.length - 1; i++) {
          const prv = trace[i - 1], p = trace[i], nxt = trace[i + 1];
          const age = 1 - (c.t - p.t) / LIFE;
          if (age <= 0) continue;
          if (pass === 0) { c2.strokeStyle = 'rgba(237,28,36,' + (age * 0.28).toFixed(3) + ')'; c2.lineWidth = 7 * age; }
          else { c2.strokeStyle = 'rgba(255,92,98,' + age.toFixed(3) + ')'; c2.lineWidth = 0.8 + age * 1.8; }
          c2.beginPath();
          c2.moveTo((prv.x + p.x) / 2, (prv.y + p.y) / 2);
          c2.quadraticCurveTo(p.x, p.y, (p.x + nxt.x) / 2, (p.y + nxt.y) / 2);
          c2.stroke();
        }
      }
      while (trace.length && c.t - trace[0].t > LIFE) trace.shift();
      if (c.has) { // the plotter head — a reticle that reads as an instrument, not a pen
        const hx = c.x, hy = c.y;
        c2.strokeStyle = 'rgba(255,120,124,0.9)'; c2.lineWidth = 1;
        c2.beginPath(); // crosshair with a center gap
        c2.moveTo(hx - 12, hy); c2.lineTo(hx - 4, hy);
        c2.moveTo(hx + 4, hy); c2.lineTo(hx + 12, hy);
        c2.moveTo(hx, hy - 12); c2.lineTo(hx, hy - 4);
        c2.moveTo(hx, hy + 4); c2.lineTo(hx, hy + 12);
        c2.stroke();
        c2.strokeStyle = 'rgba(237,28,36,0.65)'; // a thin ranging ring
        c2.beginPath(); c2.arc(hx, hy, 7.5, 0, 7); c2.stroke();
        c2.fillStyle = '#ffd2d4'; // the bright sample point
        c2.beginPath(); c2.arc(hx, hy, 1.7, 0, 7); c2.fill();
      }
    },
  };

  // ── SWITCHBOARD — patch cord. The cable trails the cursor; hover any clickable
  //    control and a jack socket pops out of its bottom edge; click and the plug
  //    attaches up into it (flash + sparks), holding while you hold. Click empty
  //    board and it just throws sparks. ─────────────────────────────────────────
  const cord = { x: 0, y: 0, vx: 0, sway: 0, init: false };
  const sparks: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = [];
  const sockPos = { x: 0, y: 0 };    // jack point on the hovered control's edge
  const attachSock = { x: 0, y: 0 }; // the jack the plug is currently in
  let wasDown = false, attached = false, sockOut = 0, sockVel = 0, seat = 0, flash = 0;
  let hoverBtn: Element | null = null, lastEl: Element | null = null;
  const spark = (x: number, y: number, n: number) => { for (let k = 0; k < n; k++) sparks.push({ x, y, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5 - 1.2, life: 0 }); };
  const findBtn = (el: Element | null): Element | null => {
    let n: Element | null = el, hops = 0;
    while (n && hops < 7 && (n as HTMLElement).id !== 'experience') {
      if (getComputedStyle(n as HTMLElement).cursor === 'pointer') {
        const r = n.getBoundingClientRect();
        if (r.width > 8 && r.width < window.innerWidth * 0.72 && r.height > 8 && r.height < 230) return n;
      }
      n = n.parentElement; hops++;
    }
    return null;
  };
  const board: TrailMode = {
    blend: 'normal', // a solid physical cable, not a blended ghost
    reset() { cord.init = false; sparks.length = 0; wasDown = false; attached = false; sockOut = 0; sockVel = 0; seat = 0; flash = 0; hoverBtn = null; lastEl = null; },
    spawn() { /* the cord is computed in draw() each frame */ },
    draw(c2, dt, c) {
      if (!c.has) return;
      const W = c.W, H = c.H;
      if (!cord.init) { cord.x = c.x; cord.y = c.y; cord.vx = 0; cord.sway = 0; cord.init = true; }
      // which clickable control is the cursor over? (only recompute on hover change)
      if (!attached && c.el !== lastEl) { lastEl = c.el; hoverBtn = findBtn(c.el); }
      if (hoverBtn && !attached) { const r = hoverBtn.getBoundingClientRect(); sockPos.x = r.left + r.width / 2; sockPos.y = r.bottom; }
      // click edges — attach into a hovered jack, spark on empty, unplug on release
      if (c.down && !wasDown) {
        if (hoverBtn) { attached = true; attachSock.x = sockPos.x; attachSock.y = sockPos.y; flash = 1; seat = 1; spark(attachSock.x, attachSock.y, 9); }
        else spark(c.x, c.y, 7);
      } else if (!c.down && wasDown && attached) { attached = false; }
      wasDown = c.down;
      const sx = attached ? attachSock.x : sockPos.x, sy = attached ? attachSock.y : sockPos.y;
      sockVel += (((hoverBtn || attached) ? 1 : 0) - sockOut) * 0.3; sockVel *= 0.7; sockOut += sockVel;
      if (sockOut < 0.002 && !hoverBtn && !attached) sockOut = 0;
      // plug target: up into the jack while attached, else trailing the cursor
      const tx = attached ? sx : c.x, ty = attached ? sy + 30 : c.y, ez = attached ? 0.45 : 0.2;
      cord.vx = (tx - cord.x) * ez; cord.x += cord.vx; cord.y += (ty - cord.y) * ez;
      cord.sway += (cord.vx - cord.sway) * 0.18;
      const jx = W * 0.5, jy = H + 16, mx = cord.x, my = cord.y;
      const dist = Math.hypot(mx - jx, my - jy), sag = Math.min(180, Math.max(36, dist * 0.3));
      const cx = (jx + mx) / 2 - cord.sway * 4.5, cy = (jy + my) / 2 + sag; // catenary droop + sway
      c2.fillStyle = '#0e0b08'; c2.fillRect(W / 2 - 46, H - 12, 92, 16); // jack panel
      c2.fillStyle = '#3a2c20'; c2.beginPath(); c2.arc(W / 2, H - 4, 6, 0, 7); c2.fill();
      c2.lineCap = 'round';
      c2.strokeStyle = '#1c130d'; c2.lineWidth = 9; // cable
      c2.beginPath(); c2.moveTo(jx, jy); c2.quadraticCurveTo(cx, cy, mx, my); c2.stroke();
      c2.strokeStyle = '#5a4029'; c2.lineWidth = 3.4; // braided sheen
      c2.beginPath(); c2.moveTo(jx, jy); c2.quadraticCurveTo(cx, cy, mx, my); c2.stroke();
      // the jack socket that pops out of the control's edge — a barrel the plug seats into
      if (sockOut > 0.01) {
        const o = Math.min(1.15, sockOut), ext = 13 * o, hw = 12;
        c2.fillStyle = '#2c2620'; c2.fillRect(sx - hw, sy - 2, hw * 2, ext + 3);        // gunmetal barrel
        c2.fillStyle = '#473d30'; c2.fillRect(sx - hw, sy - 2, 3, ext + 3);             // left highlight
        c2.fillStyle = '#15110c'; c2.fillRect(sx + hw - 3, sy - 2, 3, ext + 3);         // right shade
        c2.fillStyle = '#9a7a3e'; c2.fillRect(sx - hw, sy - 3, hw * 2, 3);              // brass faceplate on the edge
        c2.fillStyle = '#000'; c2.fillRect(sx - 5, sy + 1, 10, ext);                    // the bore the plug enters
        c2.strokeStyle = '#b89048'; c2.lineWidth = 1.4; c2.strokeRect(sx - 5, sy + 1, 10, ext); // brass-lined mouth
      }
      // plug — points up into the jack when attached, else along the cord
      seat *= 0.82;
      const ang = attached ? -Math.PI / 2 : Math.atan2(my - cy, mx - cx), ps = 1 + seat * 0.4;
      c2.save(); c2.translate(mx, my); c2.rotate(ang); c2.scale(ps, ps);
      c2.fillStyle = '#caa24c'; c2.fillRect(-6, -6, 20, 12);
      c2.fillStyle = '#e9d9a6'; c2.fillRect(10, -4, 9, 8);
      c2.fillStyle = '#241a12'; c2.fillRect(-6, -6, 5, 12);
      c2.restore();
      // connection flash ring + sparks
      flash *= 0.84;
      if (flash > 0.02) { c2.strokeStyle = 'rgba(255,224,135,' + flash.toFixed(2) + ')'; c2.lineWidth = 2.2; c2.beginPath(); c2.arc(attachSock.x, attachSock.y, 9 + (1 - flash) * 26, 0, 7); c2.stroke(); }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]; s.life += dt; const a = 1 - s.life / 380;
        if (a <= 0) { sparks.splice(i, 1); continue; }
        s.x += s.vx; s.y += s.vy; s.vy += 0.16;
        c2.fillStyle = 'rgba(255,214,95,' + a.toFixed(2) + ')'; c2.fillRect(s.x, s.y, 2, 2);
      }
    },
  };

  // mode registry — entries are added here as each folio's trail is built
  // ── THE PERMANENT RECORD — rubber stamps: crossing the dossier thunks inked
  //    impressions (REC, a live date, ✓, ★) onto the manila, each rotated, punched
  //    in, then drying away. Multiply so overlapping ink darkens the sheet. ───────
  const MON3 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const stampNow = new Date();
  const DATE_STAMP = MON3[stampNow.getMonth()] + ' ' + stampNow.getFullYear();
  const INK_A = '#b3001b', INK_B = '#7a0014'; // deep rubber-stamp reds, matching the record's honors
  const recFont = (px: number) => `700 ${px}px 'JetBrains Mono', monospace`;
  const boxStamp = (c2: CanvasRenderingContext2D, label: string, px: number) => {
    c2.font = recFont(px);
    const bw = c2.measureText(label).width + px * 1.3, bh = px * 2.05;
    c2.lineWidth = Math.max(2, px * 0.13); c2.strokeStyle = INK_A;
    c2.strokeRect(-bw / 2, -bh / 2, bw, bh);
    c2.lineWidth = 1; c2.strokeStyle = INK_B;
    c2.strokeRect(-bw / 2 + 3.5, -bh / 2 + 3.5, bw - 7, bh - 7); // registration inner line
    c2.fillStyle = INK_A; c2.textAlign = 'center'; c2.textBaseline = 'middle';
    c2.fillText(label, 0, px * 0.06);
  };
  const drawCheck = (c2: CanvasRenderingContext2D, px: number) => {
    c2.lineWidth = Math.max(2.4, px * 0.34); c2.lineCap = 'round'; c2.lineJoin = 'round'; c2.strokeStyle = INK_A;
    c2.beginPath(); c2.moveTo(-px * 0.55, 0); c2.lineTo(-px * 0.12, px * 0.48); c2.lineTo(px * 0.6, -px * 0.55); c2.stroke();
  };
  const drawStar = (c2: CanvasRenderingContext2D, px: number) => {
    c2.fillStyle = INK_A; c2.beginPath();
    for (let i = 0; i < 10; i++) {
      const ang = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 === 0 ? px : px * 0.42;
      const x = Math.cos(ang) * rad, y = Math.sin(ang) * rad;
      if (i === 0) c2.moveTo(x, y); else c2.lineTo(x, y);
    }
    c2.closePath(); c2.fill();
  };
  const ringStamp = (c2: CanvasRenderingContext2D, px: number, inner: (c: CanvasRenderingContext2D, r: number) => void) => {
    c2.lineWidth = Math.max(2, px * 0.13); c2.strokeStyle = INK_A;
    c2.beginPath(); c2.arc(0, 0, px, 0, 7); c2.stroke();
    c2.lineWidth = 1.1; c2.strokeStyle = INK_B;
    c2.beginPath(); c2.arc(0, 0, px - px * 0.16, 0, 7); c2.stroke();
    inner(c2, px * 0.6);
  };
  const drawStamp = (c2: CanvasRenderingContext2D, kind: number, big: boolean) => {
    const k = big ? 1.5 : 1;
    if (kind === 0) boxStamp(c2, 'REC', 17 * k);
    else if (kind === 1) boxStamp(c2, DATE_STAMP, 12 * k);
    else if (kind === 2) ringStamp(c2, 16 * k, drawCheck);
    else if (kind === 3) ringStamp(c2, 15 * k, drawStar);
    else if (kind === 4) boxStamp(c2, 'FILED', 15 * k);
    else if (kind === 5) boxStamp(c2, 'ON RECORD', 11 * k);
    else boxStamp(c2, 'NOTED', 14 * k);
  };
  const KIND_BAG = [0, 0, 1, 2, 2, 3, 4, 5, 6, 1, 2, 3];
  type Stamp = { x: number; y: number; rot: number; t: number; kind: number; a: number; big: boolean };
  const stamps: Stamp[] = [];
  const rec = { travel: 0, last: -1e9 };
  let recDown = false;
  const RLIFE = 1700;
  const record: TrailMode = {
    blend: 'multiply', // stamp ink soaks into the manila; overlaps darken
    reset() { stamps.length = 0; rec.travel = 0; rec.last = -1e9; recDown = false; },
    spawn(c) {
      const dx = c.x - c.px, dy = c.y - c.py, sp = Math.hypot(dx, dy);
      // a deliberate press slams a big emphatic stamp (a struck ✓ or FILED) on the spot
      if (c.down && !recDown) {
        stamps.push({ x: c.x, y: c.y, rot: (Math.random() * 16 - 8) * Math.PI / 180, t: c.t, kind: Math.random() < 0.5 ? 2 : 4, a: 0.96, big: true });
        if (stamps.length > 16) stamps.shift();
        rec.last = c.t; rec.travel = 0;
      }
      recDown = c.down;
      // each stretch of travel thunks another impression onto the file
      rec.travel += sp;
      if (rec.travel > 90 && c.t - rec.last > 130) {
        rec.travel = 0; rec.last = c.t;
        const kind = KIND_BAG[(Math.random() * KIND_BAG.length) | 0];
        stamps.push({ x: c.x + (Math.random() * 22 - 11), y: c.y + (Math.random() * 18 - 9), rot: (Math.random() * 28 - 14) * Math.PI / 180, t: c.t, kind, a: 0.72 + Math.random() * 0.2, big: false });
        if (stamps.length > 16) stamps.shift();
      }
    },
    draw(c2, _dt, c) {
      for (let i = stamps.length - 1; i >= 0; i--) {
        const s = stamps[i];
        const age = (c.t - s.t) / RLIFE;
        if (age >= 1) { stamps.splice(i, 1); continue; }
        const pin = Math.min(1, age / 0.09);                           // punch-in over ~150ms
        const sc = (s.big ? 1.34 : 1.18) - (s.big ? 0.34 : 0.18) * pin; // slams down to its rest scale
        const fade = age < 0.55 ? 1 : 1 - (age - 0.55) / 0.45;
        const alpha = s.a * pin * fade;
        if (alpha <= 0.01) continue;
        c2.save();
        c2.translate(s.x, s.y); c2.rotate(s.rot); c2.scale(sc, sc); c2.globalAlpha = alpha;
        drawStamp(c2, s.kind, s.big);
        c2.restore();
      }
    },
  };

  // ── THE CLOSER — signature: a cream nib lays a pressure-varied line across the
  //    red field — swelling where the hand slows, tapering where it races — then
  //    the ink dries off the page. The sign-off. ────────────────────────────────
  const sig: Array<{ x: number; y: number; t: number; w: number }> = [];
  let sigW = 3;
  const closer: TrailMode = {
    blend: 'normal', // cream ink laid onto the red field, not a blended ghost
    reset() { sig.length = 0; sigW = 3; },
    spawn(c) {
      const dx = c.x - c.px, dy = c.y - c.py, sp = Math.hypot(dx, dy);
      if (sp < 0.4 && sig.length) return;
      const target = Math.max(1.5, 7 - sp * 0.14); // slow strokes swell, fast ones taper — nib pressure
      sigW += (target - sigW) * 0.3;               // ease the width so the line flows, not steps
      const steps = Math.min(22, Math.max(1, Math.round(sp / 6)));
      for (let i = 1; i <= steps; i++) { const t = i / steps; sig.push({ x: c.px + dx * t, y: c.py + dy * t, t: c.t, w: sigW }); }
      if (sig.length > 80) sig.splice(0, sig.length - 80);
    },
    draw(c2, _dt, c) {
      const LIFE = 1600;
      c2.lineCap = 'round'; c2.lineJoin = 'round';
      // two passes: a cream ink body, then a brighter wet core for a fountain-pen sheen
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 1; i < sig.length - 1; i++) {
          const prv = sig[i - 1], p = sig[i], nxt = sig[i + 1];
          const age = 1 - (c.t - p.t) / LIFE;
          if (age <= 0) continue;
          if (pass === 0) { c2.strokeStyle = 'rgba(247,245,241,' + (age * 0.92).toFixed(3) + ')'; c2.lineWidth = p.w * Math.max(0.32, age); }
          else { c2.strokeStyle = 'rgba(255,255,253,' + (age * 0.5).toFixed(3) + ')'; c2.lineWidth = p.w * Math.max(0.3, age) * 0.4; }
          c2.beginPath();
          c2.moveTo((prv.x + p.x) / 2, (prv.y + p.y) / 2);
          c2.quadraticCurveTo(p.x, p.y, (p.x + nxt.x) / 2, (p.y + nxt.y) / 2);
          c2.stroke();
        }
      }
      while (sig.length && c.t - sig[0].t > LIFE) sig.shift();
      // (the pen itself is the custom cursor for this act — the trail is only its ink)
    },
  };

  const MODES: Partial<Record<Mode, TrailMode>> = { front, work, board, record, closer };
  const ACT_MODE: Array<[string, Mode]> = [
    ['[data-flow-wrap]', 'front'],
    ['#projects', 'work'],
    ['#experience', 'board'],
    ['#education', 'record'],
    ['#contact', 'closer'],
    // (#stack omitted — UV reveal owns it)
  ];
  const SUSPEND = '[aria-modal="true"], .li-cs-panel.li-cs-expand';

  let cur: Mode | null = null;
  let active: TrailMode | null = null;
  const setMode = (mo: Mode | null) => {
    if (mo === cur) return;
    if (active) active.reset();
    cur = mo;
    active = mo && MODES[mo] ? MODES[mo]! : null;
    cv.style.mixBlendMode = active ? active.blend : 'normal';
  };
  const detect = () => {
    if (!m.has) return;
    const el = document.elementFromPoint(m.x, m.y) as HTMLElement | null; // canvas is pointer-events:none, so this is the act
    m.el = el;
    if (!el || el.closest(SUSPEND)) { setMode(null); return; }
    for (const [sel, mo] of ACT_MODE) {
      if (MODES[mo] && el.closest(sel)) { setMode(mo); return; }
    }
    setMode(null);
  };

  let last = performance.now();
  let lastDetect = 0;
  let clock = 0; // internal trail clock — drives every age-based fade
  const loop = (t: number) => {
    let dt = t - last;
    last = t;
    if (dt > 60) dt = 60;
    clock += dt;
    m.t = clock;
    if (t - lastDetect > 90) { detect(); lastDetect = t; }
    ctx.clearRect(0, 0, m.W, m.H);
    if (active) {
      if (m.has) active.spawn(m);
      active.draw(ctx, dt, m);
    }
    m.px = m.x;
    m.py = m.y;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
