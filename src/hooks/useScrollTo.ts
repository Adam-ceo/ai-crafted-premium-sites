export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const NAV_OFFSET = 64;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}
