"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

import "swiper/css";
import "swiper/css/navigation";

const renders = [
  "render-01.jpg",
  "render-02.jpg",
  "render-03.jpg",
  "render-04.jpg",
  "render-05.jpg",
  "render-06.jpg",
  "render-07.jpg",
  "render-08.jpg",
  "render-09.jpg",
];

function ZoomableRender({ render }: { render: string }) {
  return (
    <TransformWrapper
      initialScale={1}
      minScale={1}
      maxScale={4}
      centerOnInit
      wheel={{
        disabled: true,
      }}
      doubleClick={{
        disabled: true,
      }}

      // Un dedo NO mueve la imagen
      panning={{
        disabled: true,
      }}

      // Dos dedos SÍ hacen zoom y permiten moverla
      pinch={{
        disabled: false,
        allowPanning: true,
      }}
    >
      <TransformComponent
        wrapperClass="render-zoom-wrapper"
        contentClass="render-zoom-content"
      >
        <img
          src={`/renders/${render}`}
          alt={render}
          className="h-screen w-full object-cover"
          draggable={false}
        />
      </TransformComponent>
    </TransformWrapper>
  );
}

export default function RenderGallery() {
  return (
    <section
      id="renders"
      className="relative h-screen w-full overflow-hidden"
    >
      <Swiper
        modules={[Navigation, Keyboard]}
        slidesPerView={1}
        speed={900}
        loop={true}
        navigation={true}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        grabCursor={true}

        // Un dedo horizontal cambia de render
        allowTouchMove={true}

        // Permite diferenciar gesto horizontal y vertical
        touchAngle={45}

        // No bloquea el movimiento vertical de la página
        touchMoveStopPropagation={false}

        // Evita capturar innecesariamente el inicio del toque
        touchStartPreventDefault={false}

        className="h-full w-full"
      >
        {renders.map((render) => (
          <SwiperSlide key={render}>
            <ZoomableRender render={render} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /*
          IMPORTANTE:
          Un dedo vertical pertenece a la navegación de la web.
          Un dedo horizontal queda disponible para Swiper.
          Dos dedos quedan disponibles para el pinch.
        */
        .render-zoom-wrapper {
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
          touch-action: pan-y !important;
        }

        .render-zoom-content {
          width: 100% !important;
          height: 100% !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
        }

        .render-zoom-content img {
          width: 100%;
          height: 100vh;
          max-width: none;
          user-select: none;
          -webkit-user-select: none;
          -webkit-user-drag: none;
        }

        .swiper-button-prev,
        .swiper-button-next {
          color: white;
          width: 54px;
          height: 54px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.65));
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 38px;
          font-weight: 700;
        }

        .swiper-button-prev {
          left: 24px;
        }

        .swiper-button-next {
          right: 24px;
        }

        @media (max-width: 640px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 42px;
            height: 42px;
          }

          .swiper-button-prev::after,
          .swiper-button-next::after {
            font-size: 30px;
            font-weight: 700;
          }

          .swiper-button-prev {
            left: 10px;
          }

          .swiper-button-next {
            right: 10px;
          }
        }
      `}</style>
    </section>
  );
}