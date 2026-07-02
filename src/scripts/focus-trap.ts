// Keyboard focus containment for modal overlays.
//
// Trap Tab / Shift+Tab inside a container until release() is called, and move
// initial focus into it. Focusables are re-queried on every Tab so the trap
// survives innerHTML swaps (the call overlay rebuilds its screen mid-flight).
// Escape handling and focus restoration stay with the caller — the modals here
// already own those — so this helper does exactly one thing.

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export interface FocusTrap {
  release(): void;
}

export function trapFocus(
  container: HTMLElement,
  opts: { initialFocus?: HTMLElement | null } = {}
): FocusTrap {
  const visibleFocusables = () =>
    Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement
    );

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const f = visibleFocusables();
    if (!f.length) {
      e.preventDefault();
      return;
    }
    const first = f[0];
    const last = f[f.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey) {
      if (active === first || !container.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last || !container.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  };

  document.addEventListener('keydown', onKey, true);

  const initial = opts.initialFocus ?? visibleFocusables()[0];
  if (initial) {
    try {
      initial.focus({ preventScroll: true });
    } catch {
      /* ignore */
    }
  }

  return {
    release() {
      document.removeEventListener('keydown', onKey, true);
    },
  };
}
