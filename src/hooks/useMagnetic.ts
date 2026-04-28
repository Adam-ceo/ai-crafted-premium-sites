import { useEffect, useRef } from "react";

/**
 * Magnetic hover effect: element gently follows the cursor when within `radius`.
 * Respects prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35, radius = 120) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - (rect.left + rect.width / 2);
      const my = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(mx, my);
      if (dist < radius + Math.max(rect.width, rect.height) / 2) {
        tx = mx * strength;
        ty = my * strength;
      } else {
        tx = 0; ty = 0;
      }
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, radius]);
  return ref;
}
