/** The house cipher — one decode for every scramble→resolve text reveal.
 *  Same glyph family as the background wake canvas, so every decode on the
 *  page speaks the same language. Reduced-motion resolves instantly.
 *  (The hero wordmark keeps its span-cell system, and Education/Skills keep
 *  their seeded/scheduled variants — this module covers the plain
 *  textContent rewriters that used to be copy-pasted per component.) */

const CIPHER = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#/<>[]{}*+=·'.split('');

/** punctuation that anchors a word — revealed as-is from frame one */
const KEEP_DEFAULT = /[ ·.,'’–—×↗()[\]]/;

export interface DecodeOptions {
  /** total duration in ms (default 460) */
  dur?: number;
  /** override which characters never scramble */
  keep?: RegExp;
}

export function decode(el: HTMLElement, text?: string | null, opts: DecodeOptions = {}): void {
  const fin = text ?? el.getAttribute('data-decode') ?? el.textContent ?? '';
  if (!fin) return;
  if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = fin;
    return;
  }
  const dur = opts.dur ?? 460;
  const keep = opts.keep ?? KEEP_DEFAULT;
  const t0 = performance.now();
  const tick = (now: number) => {
    const k = Math.min(1, (now - t0) / dur);
    const reveal = Math.floor(k * fin.length);
    let out = '';
    for (let i = 0; i < fin.length; i++) {
      const ch = fin[i];
      out += i < reveal || keep.test(ch) ? ch : CIPHER[(Math.random() * CIPHER.length) | 0];
    }
    el.textContent = out;
    if (k < 1) requestAnimationFrame(tick);
    else el.textContent = fin;
  };
  requestAnimationFrame(tick);
}

/** decode every [data-decode] under a root; duration scales with text length */
export function decodeAll(root: ParentNode, opts: DecodeOptions = {}): void {
  root.querySelectorAll<HTMLElement>('[data-decode]').forEach((el) => {
    const fin = el.getAttribute('data-decode') || '';
    decode(el, fin, { dur: opts.dur ?? 360 + fin.length * 22, keep: opts.keep });
  });
}
