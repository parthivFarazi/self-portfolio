// Shows a "scroll for more" affordance for panel overlays. When the
// readability floor makes a panel taller than the viewport, the clipped
// bottom edge alone reads as a rendering bug — this hook says "scrollable,
// and the user hasn't scrolled yet" so the dialog can show a cue.

import { useEffect, useState, type RefObject } from 'react';

export function useOverlayScrollHint(ref: RefObject<HTMLElement>, active = true) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!active) {
      setShow(false);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const scrollable = el.scrollHeight - el.clientHeight > 60;
      setShow(scrollable && el.scrollTop < 60);
    };
    update();

    // Panels are lazy-loaded, so the scroll height changes after mount —
    // watch the content wrapper instead of polling.
    const observed = el.firstElementChild ?? el;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    ro?.observe(observed);

    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ref, active]);

  return show;
}
