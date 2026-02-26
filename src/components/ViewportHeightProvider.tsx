"use client";

import { useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";

export default function ViewportHeightProvider() {
  useEffect(() => {
    smoothscroll.polyfill();

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

    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", setVh);
      }
    };
  }, []);

  return null;
}
