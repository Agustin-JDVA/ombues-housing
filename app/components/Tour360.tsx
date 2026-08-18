"use client";

import { useEffect, useState } from "react";

export default function Tour360() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isExploring, setIsExploring] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    );

    setIsTouchDevice(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsTouchDevice(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Bloquea el scroll de la web mientras se explora el 360
  // en tablet o celular.
  useEffect(() => {
    if (!isTouchDevice || !isExploring) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isTouchDevice, isExploring]);

  const iframeInteractive = !isTouchDevice || isExploring;

  const buttonStyle = `
    flex
    h-16
    w-[240px]
    items-center
    justify-center
    rounded-full
    bg-white
    text-sm
    font-medium
    uppercase
    tracking-[0.18em]
    text-black
    shadow-xl
    transition-all
    duration-200
    active:scale-95
  `;

  return (
    <section
      id="tours"
      className="relative h-screen w-full bg-black"
    >
      <iframe
        src="https://kuula.co/share/collection/7TwZL?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1&zoom=1"
        className={`h-full w-full border-0 ${
          iframeInteractive
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
        allowFullScreen
        allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
        title="Tour 360°"
      />

      {/* BOTÓN PARA ENTRAR */}
      {isTouchDevice && !isExploring && (
        <div className="pointer-events-none absolute inset-0 z-[9999] flex items-center justify-center">
          <button
            onClick={() => setIsExploring(true)}
            className={`pointer-events-auto ${buttonStyle}`}
          >
            Explorar 360°
          </button>
        </div>
      )}

      {/* BOTÓN PARA SALIR - SIEMPRE FIJO EN PANTALLA */}
      {isTouchDevice && isExploring && (
        <button
          onClick={() => setIsExploring(false)}
          className={`
            pointer-events-auto
            fixed
            left-1/2
            top-[calc(env(safe-area-inset-top)+24px)]
            z-[999999]
            -translate-x-1/2
            ${buttonStyle}
          `}
        >
          Salir del 360°
        </button>
      )}
    </section>
  );
}