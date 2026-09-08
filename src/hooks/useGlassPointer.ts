import { useEffect, useRef } from "react";

/**
 * Drives a pointer-tracked specular sheen on a glass surface. Returns a ref to
 * attach to the target element; on pointer move it writes `--glass-mx` /
 * `--glass-my` (0-100%) and `--glass-active` (0-1) as CSS custom properties,
 * rAF-throttled, so the CSS radial highlight + spectral rim follow the cursor
 * 1:1. No-op on touch pointers and under prefers-reduced-motion (no listeners,
 * no rAF, no writes).
 */
export function useGlassPointer<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const noHover = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (noHover || reduced) return;

    let frame = 0;
    let px = 50;
    let py = 50;
    let active = 0;

    const paint = () => {
      frame = 0;
      el.style.setProperty("--glass-mx", `${px}%`);
      el.style.setProperty("--glass-my", `${py}%`);
      el.style.setProperty("--glass-active", `${active}`);
    };

    const schedule = () => {
      if (frame) return;

      frame = requestAnimationFrame(paint);
    };

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();

      px = ((event.clientX - rect.left) / rect.width) * 100;
      py = ((event.clientY - rect.top) / rect.height) * 100;
      active = 1;
      schedule();
    };

    const handleLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }

      active = 0;
      el.style.setProperty("--glass-active", "0");
    };

    el.addEventListener("pointerenter", handleMove);
    el.addEventListener("pointerdown", handleMove);
    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", handleMove);
      el.removeEventListener("pointerdown", handleMove);
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return ref;
}
