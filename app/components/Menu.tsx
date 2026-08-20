"use client";

import { useEffect, useState } from "react";

type MenuProps = {
  onExitProject: () => void;
};

export default function Menu({
  onExitProject,
}: MenuProps) {
  const [darkText, setDarkText] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateColor = () => {
      const elements = document.elementsFromPoint(
        window.innerWidth / 2,
        40
      );

      const section = elements
        .map((element) => element.closest("section[id]"))
        .find((element) => element !== null);

      if (!section) return;

      const sectionId = section.id;

      setDarkText(
        sectionId === "planos" || sectionId === "info"
      );
    };

    const handleScroll = () => {
      updateColor();
      setIsOpen(false);
    };

    updateColor();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateColor);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateColor);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleExit = () => {
    setIsOpen(false);
    onExitProject();
  };

  const portraitLinkClass =
    "py-4 text-sm font-medium uppercase tracking-[0.14em] transition-opacity duration-200 hover:opacity-55 sm:text-base sm:tracking-[0.16em]";

  return (
    <>
      {/* =========================================
          FORMATO HORIZONTAL
          ========================================= */}
      <nav className="project-menu-landscape pointer-events-none fixed left-1/2 top-4 z-[99999] w-full -translate-x-1/2 px-3 sm:top-5 sm:px-5 md:top-7">
        <div
          className={`mx-auto flex w-full items-center justify-center gap-3 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 sm:gap-5 sm:text-[11px] sm:tracking-[0.12em] md:gap-8 md:text-sm md:tracking-[0.14em] lg:gap-12 lg:text-base lg:tracking-[0.16em] xl:gap-14 ${
            darkText ? "text-black" : "text-white"
          }`}
        >
          <a
            className="pointer-events-auto"
            href="#inicio"
          >
            Inicio
          </a>

          <a
            className="pointer-events-auto"
            href="#renders"
          >
            Renders
          </a>

          <a
            className="pointer-events-auto"
            href="#tours"
          >
            Tours
          </a>

          <a
            className="pointer-events-auto"
            href="#planos"
          >
            Planos
          </a>

          <a
            className="pointer-events-auto"
            href="#info"
          >
            Información General
          </a>
        </div>
      </nav>

      {/* SALIR DEL PROYECTO - HORIZONTAL */}
      <button
        type="button"
        onClick={handleExit}
        className={`project-exit-landscape fixed right-3 top-3 z-[9999999] whitespace-nowrap font-medium uppercase text-[7px] tracking-[0.04em] transition-all duration-300 hover:opacity-60 min-[380px]:text-[8px] min-[380px]:tracking-[0.06em] sm:right-4 sm:top-4 sm:text-[9px] sm:tracking-[0.08em] md:right-7 md:top-7 md:text-sm md:tracking-[0.14em] lg:text-base lg:tracking-[0.16em] ${
          darkText ? "text-black" : "text-white"
        }`}
      >
        Salir del proyecto
      </button>

      {/* =========================================
          FORMATO VERTICAL
          ========================================= */}

      {/* CAPA OSCURA */}
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={closeMenu}
        className={`project-menu-portrait fixed inset-0 z-[999997] bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* BOTÓN HAMBURGUESA */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        className="project-menu-portrait fixed right-4 top-4 z-[9999999] flex h-8 w-8 items-center justify-center sm:right-5 sm:top-5"
      >
        <div className="relative h-[18px] w-7">
          <span
            className={`absolute left-0 top-0 h-[1.5px] w-full transition-all duration-300 ${
              isOpen
                ? "top-[8px] rotate-45 bg-white"
                : darkText
                  ? "bg-black"
                  : "bg-white"
            }`}
          />

          <span
            className={`absolute left-0 top-[8px] h-[1.5px] w-full transition-all duration-300 ${
              isOpen
                ? "bg-white opacity-0"
                : darkText
                  ? "bg-black opacity-100"
                  : "bg-white opacity-100"
            }`}
          />

          <span
            className={`absolute bottom-0 left-0 h-[1.5px] w-full transition-all duration-300 ${
              isOpen
                ? "bottom-[8px] -rotate-45 bg-white"
                : darkText
                  ? "bg-black"
                  : "bg-white"
            }`}
          />
        </div>
      </button>

      {/* MENÚ DESPLEGABLE */}
      <div
        className={`project-menu-portrait fixed right-4 top-14 z-[9999998] w-[280px] text-white transition-all duration-300 sm:right-5 sm:top-16 sm:w-[320px] ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="flex flex-col items-end px-2 py-3 text-right">
          {/* LISTADO DE SECCIONES */}
          <div className="flex flex-col items-end">
            <a
              href="#inicio"
              onClick={closeMenu}
              className={portraitLinkClass}
            >
              Inicio
            </a>

            <a
              href="#renders"
              onClick={closeMenu}
              className={portraitLinkClass}
            >
              Renders
            </a>

            <a
              href="#tours"
              onClick={closeMenu}
              className={portraitLinkClass}
            >
              Tours
            </a>

            <a
              href="#planos"
              onClick={closeMenu}
              className={portraitLinkClass}
            >
              Planos
            </a>

            <a
              href="#info"
              onClick={closeMenu}
              className={portraitLinkClass}
            >
              Información General
            </a>
          </div>

          {/* ESPACIO DE SEPARACIÓN CON LA LÍNEA CENTRADA */}
          <div className="flex h-6 w-full items-center justify-end">
            <div className="h-px w-20 bg-white/30" />
          </div>

          {/* SALIR DEL PROYECTO */}
          <button
            type="button"
            onClick={handleExit}
            className={`${portraitLinkClass} text-right`}
          >
            Salir del proyecto
          </button>
        </div>
      </div>

      <style jsx global>{`
        .project-menu-portrait {
          display: none;
        }

        .project-menu-landscape,
        .project-exit-landscape {
          display: block;
        }

        @media (orientation: portrait) {
          .project-menu-portrait {
            display: block;
          }

          .project-menu-landscape,
          .project-exit-landscape {
            display: none;
          }
        }
      `}</style>
    </>
  );
}