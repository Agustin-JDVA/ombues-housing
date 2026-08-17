"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";

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

export default function RenderGallery() {
  return (
    <section id="renders" className="relative h-screen w-full">
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
        className="h-full w-full"
      >
        {renders.map((render) => (
          <SwiperSlide key={render}>
            <img
              src={`/renders/${render}`}
              alt={render}
              className="h-screen w-full object-cover"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
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