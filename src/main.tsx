import { createRoot } from "react-dom/client";

// Self-hosted fonts (eliminates Google Fonts CDN render-blocking)
import "@fontsource-variable/newsreader/wght.css";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
