"use client";

import { useEffect, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

export default function Plans() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");

    const updateOrientation = () => {
      setIsPortrait(mediaQuery.matches);
    };

    updateOrientation();

    mediaQuery.addEventListener("change", updateOrientation);

    return () => {
      mediaQuery.removeEventListener("change", updateOrientation);
    };
  }, []);

  return (
    <section
      id="planos"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      <TransformWrapper
        key={isPortrait ? "portrait" : "landscape"}
        initialScale={1}
        minScale={1}
        maxScale={4}
        centerOnInit
        limitToBounds={true}
        wheel={{
          disabled: true,
        }}
        doubleClick={{
          disabled: true,
        }}

        // Impide que UN dedo capture la navegación
        panning={{
          disabled: false,
          velocityDisabled: true,
          excluded: ["plan-content"],
        }}

        // DOS dedos pueden hacer zoom y mover el plano
        pinch={{
          disabled: false,
          allowPanning: true,
        }}
      >
        <TransformComponent
          wrapperClass="plan-wrapper"
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
          }
        }
      `}</style>
    </section>
  );
}