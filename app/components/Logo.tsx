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

      const section = element.closest("section[id]");
      if (!section) return;

      const sectionId = section.id;

      setUseBlackLogo(sectionId === "planos" || sectionId === "info");
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
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6 md:bottom-8">
      <a
        href="https://jdva.com.uy/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ir al sitio web de JDVA"
        className="block cursor-pointer"
      >
        <img
          src={useBlackLogo ? "/logo/Logo-negro.png" : "/logo/logo.png"}
          alt="JDVA"
          className="h-8 w-auto scale-[0.8] sm:h-10 md:h-12 lg:h-14"
          draggable={false}
        />
      </a>
    </div>
  );
}