import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureRegistered() {
  if (registered) return;
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/** Reveals lines wrapped in `.lx-reveal-inner` (children of `.lx-reveal-line`). */
export function useLineReveal<T extends HTMLElement>(opts?: {
  delay?: number;
  stagger?: number;
}): RefObject<T> {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const items = ref.current.querySelectorAll<HTMLElement>(".lx-reveal-inner");
      items.forEach((el) => (el.style.transform = "translateY(0)"));
      return;
    }
    ensureRegistered();
    const ctx = gsap.context(() => {
      gsap.to(".lx-reveal-inner", {
        yPercent: 0,
        duration: 1.05,
        ease: "expo.out",
        delay: opts?.delay ?? 0.1,
        stagger: opts?.stagger ?? 0.08,
      });
    }, ref);
    return () => ctx.revert();
  }, [opts?.delay, opts?.stagger]);
  return ref;
}

export { gsap, ScrollTrigger };
