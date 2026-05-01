import { createRoot } from "react-dom/client";

// Self-hosted fonts (eliminates Google Fonts CDN render-blocking)
// Critical fonts loaded eagerly (used above-the-fold)
import "@fontsource-variable/newsreader/wght.css";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";

// Italic only used in a few testimonial / blockquote sections — load async, post-paint
if (typeof window !== "undefined") {
  requestIdleCallback?.(() => {
    import("@fontsource-variable/newsreader/wght-italic.css");
  }) ?? setTimeout(() => {
    import("@fontsource-variable/newsreader/wght-italic.css");
  }, 1500);
}

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
