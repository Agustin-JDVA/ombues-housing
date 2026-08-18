"use client";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

export default function Plans() {
  return (
    <section
      id="planos"
      className="h-screen w-full overflow-hidden bg-white"
    >
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={4}
        centerOnInit
        wheel={{ disabled: true }}
        doubleClick={{ disabled: true }}

        // Un dedo NO mueve el plano
        panning={{
          disabled: true,
        }}

        // Dos dedos SÍ permiten hacer zoom
        pinch={{
          disabled: false,
        }}
      >
        <TransformComponent
          wrapperClass="!h-full !w-full"
          contentClass="!h-full !w-full"
        >
          <img
            src="/planos/plano.jpg"
            alt="Plano Ombues Housing"
            className="h-screen w-screen object-cover"
            draggable={false}
          />
        </TransformComponent>
      </TransformWrapper>
    </section>
  );
}