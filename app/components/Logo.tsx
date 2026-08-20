"use client";

import { useEffect, useState } from "react";

type LogoProps = {
  projectMode?: boolean;
};

export default function Logo({
  projectMode = false,
}: LogoProps) {
  const [useBlackLogo, setUseBlackLogo] = useState(false);

  useEffect(() => {
    const updateLogo = () => {
      const x = projectMode
        ? 25
        : window.innerWidth / 2;

      const y = projectMode
        ? 25
        : window.innerHeight - 40;

      const elements = document.elementsFromPoint(x, y);

      const section = elements
        .map((element) => element.closest("section[id]"))
        .find((element) => element !== null);

      if (!section) {
        setUseBlackLogo(false);
        return;
      }

      const sectionId = section.id;

      setUseBlackLogo(
        sectionId === "planos" || sectionId === "info"
      );
    };

    updateLogo();

    window.addEventListener("scroll", updateLogo);
    window.addEventListener("resize", updateLogo);

    return () => {
      window.removeEventListener("scroll", updateLogo);
      window.removeEventListener("resize", updateLogo);
    };
  }, [projectMode]);

  return (
    <div
      className={
        projectMode
          ? "fixed left-3 top-3 z-[999999] sm:left-4 sm:top-4 md:left-7 md:top-[22px]"
          : "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6 md:bottom-8"
      }
    >
      <a
        href="https://jdva.com.uy/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ir al sitio web de JDVA"
        className="flex cursor-pointer flex-col items-start"
      >
        {/* TEXTO PROYECTA */}
        <span
          className={`mb-1 font-[family:var(--font-wix)] font-medium tracking-[0.08em] transition-colors duration-300 ${
            projectMode
              ? "text-[7px] sm:text-[8px] md:text-[9px]"
              : "relative -top-1 text-[9px] sm:text-[10px] md:text-[11px]"
          } ${
            useBlackLogo ? "text-black" : "text-white"
          }`}
        >
          Proyecta
        </span>

        {/* LOGO JDVA */}
        <img
          src={
            useBlackLogo
              ? "/logo/Logo-negro.png"
              : "/logo/logo.png"
          }
          alt="JDVA"
          className={
            projectMode
              ? "h-[17px] w-auto sm:h-[21px] md:h-[26px] lg:h-[30px]"
              : "h-[23px] w-auto sm:h-[29px] md:h-[35px] lg:h-10"
          }
          draggable={false}
        />
      </a>
    </div>
  );
}