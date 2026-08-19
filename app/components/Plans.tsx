"use client";

import { useEffect, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

const PlanControls = ({
  isExploring,
  isDesktop,
  onExit,
}: {
  isExploring: boolean;
  isDesktop: boolean;
  onExit: () => void;
}) => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  if (!isExploring) return null;

  const handleExit = () => {
    resetTransform(300);
    onExit();
  };

  return (
    <>
      {/* BOTONES + / - SOLO EN PC */}
      {isDesktop && (
        <div className="pointer-events-auto absolute right-5 top-1/2 z-[9998] flex -translate-y-1/2 flex-col gap-2">
          <button
            type="button"
            onClick={() => zoomIn(0.4, 250)}
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-2xl font-medium text-black shadow-lg transition-transform duration-200 active:scale-95"
            aria-label="Acercar plano"
          >
            +
          </button>

          <button
            type="button"
            onClick={() => zoomOut(0.4, 250)}
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-2xl font-medium text-black shadow-lg transition-transform duration-200 active:scale-95"
            aria-label="Alejar plano"
          >
            −
          </button>
        </div>
      )}

      {/* BOTÓN SALIR */}
      <button
        type="button"
        onClick={handleExit}
        className="pointer-events-auto fixed left-1/2 top-[calc(env(safe-area-inset-top)+24px)] z-[999999] flex h-12 w-[190px] -translate-x-1/2 items-center justify-center rounded-full bg-white text-[11px] font-medium uppercase tracking-[0.16em] text-black shadow-xl transition-all duration-200 active:scale-95"
      >
        Salir del plano
      </button>
    </>
  );
};

const Plans = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isExploring, setIsExploring] = useState(false);

  const [viewport, setViewport] = useState({
    width: 1920,
    height: 1080,
  });

  useEffect(() => {
    const orientationQuery = window.matchMedia(
      "(orientation: portrait)"
    );

    const desktopQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const updateOrientation = () => {
      setIsPortrait(orientationQuery.matches);
    };

    const updateDesktop = () => {
      setIsDesktop(desktopQuery.matches);
      setIsExploring(false);
    };

    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateOrientation();
    updateDesktop();
    updateViewport();

    orientationQuery.addEventListener(
      "change",
      updateOrientation
    );

    desktopQuery.addEventListener(
      "change",
      updateDesktop
    );

    window.addEventListener(
      "resize",
      updateViewport
    );

    return () => {
      orientationQuery.removeEventListener(
        "change",
        updateOrientation
      );

      desktopQuery.removeEventListener(
        "change",
        updateDesktop
      );

      window.removeEventListener(
        "resize",
        updateViewport
      );
    };
  }, []);

  useEffect(() => {
    if (!isExploring) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isExploring]);

  /*
    LÍMITES MANUALES PARA PC

    El plano puede moverse bastante,
    pero nunca puede desaparecer completamente.

    0.75 = puede desplazarse hasta el 75%
    del ancho/alto de la pantalla.
  */
  const desktopLimitX =
    viewport.width * 0.75;

  const desktopLimitY =
    viewport.height * 0.75;

  const planWrapperClass =
    isDesktop && isExploring
      ? "plan-wrapper plan-exploring"
      : "plan-wrapper";

  return (
    <section
      id="planos"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      <TransformWrapper
        key={`${isPortrait ? "portrait" : "landscape"}-${
          isDesktop ? "desktop" : "touch"
        }`}
        initialScale={1}
        minScale={1}
        maxScale={4}
        centerOnInit={true}

        /*
          PC:
          usamos nuestros propios límites.

          TOUCH:
          mantiene los límites automáticos.
        */
        limitToBounds={!isDesktop}

        /*
          LÍMITES FINITOS EN PC.
          No puede desaparecer fuera de pantalla.
        */
        minPositionX={
          isDesktop
            ? -desktopLimitX
            : undefined
        }
        maxPositionX={
          isDesktop
            ? desktopLimitX
            : undefined
        }
        minPositionY={
          isDesktop
            ? -desktopLimitY
            : undefined
        }
        maxPositionY={
          isDesktop
            ? desktopLimitY
            : undefined
        }

        /*
          NO RECENTRAR AUTOMÁTICAMENTE.
        */
        centerZoomedOut={false}

        /*
          SIN AUTO-ALINEADO EN PC.
        */
        autoAlignment={{
          disabled: isDesktop,
          sizeX: 0,
          sizeY: 0,
        }}

        /*
          SIN ANIMACIÓN DE CORRECCIÓN EN PC.
        */
        alignmentAnimation={{
          disabled: isDesktop,
          sizeX: 0,
          sizeY: 0,
          animationTime: 0,
        }}

        /*
          SIN INERCIA.
          Cuando soltamos el mouse,
          queda exactamente en esa posición.
        */
        velocityAnimation={{
          disabled: true,
        }}

        /*
          RUEDA:
          zoom solo en PC mientras exploramos.
        */
        wheel={{
          disabled: !isDesktop || !isExploring,
          step: 0.15,
        }}

        /*
          DOBLE CLICK:
          ÚNICA FORMA DE RECENTRAR EN PC.
        */
        doubleClick={{
          disabled: !isDesktop || !isExploring,
          mode: "reset",
          animationTime: 400,
        }}

        /*
          PC:
          arrastrar con mouse.

          TOUCH:
          un dedo no mueve el plano.
        */
        panning={{
          disabled: isDesktop
            ? !isExploring
            : true,
          velocityDisabled: true,
        }}

        /*
          TABLET / CELULAR:
          dos dedos para zoom y movimiento.
        */
        pinch={{
          disabled: !isExploring,
          allowPanning: true,
        }}
      >
        <PlanControls
          isExploring={isExploring}
          isDesktop={isDesktop}
          onExit={() => setIsExploring(false)}
        />

        <TransformComponent
          wrapperClass={planWrapperClass}
          contentClass="plan-content"
        >
          <img
            src="/planos/plano.jpg"
            alt="Plano Ombues Housing"
            className="plan-image"
            draggable={false}
          />
        </TransformComponent>
      </TransformWrapper>

      {/* BOTÓN EXPLORAR */}
      {!isExploring && (
        <div className="pointer-events-none absolute inset-0 z-[9997] flex items-center justify-center">
          <button
            type="button"
            onClick={() => setIsExploring(true)}
            className="pointer-events-auto flex h-12 w-[190px] items-center justify-center rounded-full bg-white text-[11px] font-medium uppercase tracking-[0.16em] text-black shadow-xl transition-all duration-200 active:scale-95"
          >
            Explorar plano
          </button>
        </div>
      )}

      <style jsx global>{`
        .plan-wrapper {
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
        }

        .plan-content {
          display: flex !important;
          align-items: center;
          justify-content: center;
        }

        /* CURSOR PC */
        .plan-wrapper.plan-exploring {
          cursor: grab !important;
        }

        .plan-wrapper.plan-exploring:active {
          cursor: grabbing !important;
        }

        /* PANTALLA HORIZONTAL */
        @media (orientation: landscape) {
          .plan-content {
            width: 100vw !important;
            height: 100vh !important;
          }

          .plan-image {
            width: 100vw;
            height: auto;
            max-width: none;
            user-select: none;
            -webkit-user-select: none;
            -webkit-user-drag: none;
          }
        }

        /* PANTALLA VERTICAL */
        @media (orientation: portrait) {
          .plan-content {
            width: max-content !important;
            height: 100vh !important;
          }

          .plan-image {
            width: auto;
            height: 100vh;
            max-width: none;
            max-height: none;
            user-select: none;
            -webkit-user-select: none;
            -webkit-user-drag: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Plans;