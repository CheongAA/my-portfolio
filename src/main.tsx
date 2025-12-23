import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import smoothscroll from "smoothscroll-polyfill";
import App from "./App";
import "./index.css";
import "./i18n/config";

// Polyfills
smoothscroll.polyfill();

// Viewport height calculation for mobile browsers
function setVh() {
  const vh = window.visualViewport?.height
    ? window.visualViewport.height * 0.01
    : window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setVh();
window.addEventListener("resize", setVh);
window.addEventListener("orientationchange", setVh);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", setVh);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
