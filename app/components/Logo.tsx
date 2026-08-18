"use client";

import { useEffect, useState } from "react";

export default function Logo() {
  const [useBlackLogo, setUseBlackLogo] = useState(false);

  useEffect(() => {
    const updateLogo = () => {
      const x = window.innerWidth / 2;
      const y = window.innerHeight - 40;

      const element = document.elementFromPoint(x, y);

      if (!element) return;

      const background = window.getComputedStyle(element).backgroundColor;

      const rgb = background.match(/\d+/g);

      if (!rgb || rgb.length < 3) {
        setUseBlackLogo(false);
        return;
      }

      const [r, g, b] = rgb.map(Number);

      const luminance =
        0.299 * r +
        0.587 * g +
        0.114 * b;

      setUseBlackLogo(luminance > 160);
    };

    updateLogo();

    window.addEventListener("scroll", updateLogo);
    window.addEventListener("resize", updateLogo);

    return () => {
      window.removeEventListener("scroll", updateLogo);
      window.removeEventListener("resize", updateLogo);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6 md:bottom-8">
      <img
        src={
          useBlackLogo
            ? "/logo/Logo-negro.png"
            : "/logo/logo.png"
        }
        alt="Logo"
        className="h-8 w-auto scale-[0.8] sm:h-10 md:h-12 lg:h-14"
      />
    </div>
  );
}