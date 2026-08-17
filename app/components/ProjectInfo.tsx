"use client";

import { useEffect, useRef, useState } from "react";

function CountUp({
  end,
  active,
  suffix = "",
  duration = 1600,
}: {
  end: number;
  active: boolean;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(end * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [active, end, duration]);

  return (
    <>
      {new Intl.NumberFormat("es-UY").format(value)}
      {suffix}
    </>
  );
}

export default function ProjectInfo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animateNumbers, setAnimateNumbers] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimateNumbers(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="info"
      className="min-h-screen bg-white flex items-center justify-center px-6 py-20 md:px-12"
    >
      <div className="w-full max-w-6xl">

        {/* TÍTULO */}
        <h2 className="font-[family:var(--font-wix)] text-4xl font-bold uppercase tracking-[0.06em] mb-3 md:text-6xl">
          Ombues Housing
        </h2>

        <p className="text-lg text-gray-500 mb-16 md:text-xl">
          Información general del proyecto
        </p>

        {/* DATOS PRINCIPALES */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-4 md:gap-x-16 mb-20">

          <div>
            <p className="text-4xl font-bold md:text-5xl">
              <CountUp end={38} active={animateNumbers} />
            </p>
            <p className="mt-2 text-gray-500">Unidades</p>
          </div>

          <div>
            <p className="text-4xl font-bold md:text-5xl">
              <CountUp end={4508} active={animateNumbers} suffix=" m²" />
            </p>
            <p className="mt-2 text-gray-500">Superficie de unidades</p>
          </div>

          <div>
            <p className="text-4xl font-bold md:text-5xl">
              <CountUp end={7416} active={animateNumbers} suffix=" m²" />
            </p>
            <p className="mt-2 text-gray-500">Superficie total</p>
          </div>

          <div>
            <p className="text-4xl font-bold md:text-5xl">
              <CountUp end={76} active={animateNumbers} />
            </p>
            <p className="mt-2 text-gray-500">Estacionamientos</p>
          </div>

        </div>

        {/* SUPERFICIES Y TIPOLOGÍAS */}
        <div className="grid gap-16 md:grid-cols-2">

          <div>
            <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-gray-500">
              Superficies
            </h3>

            <div className="space-y-5 text-lg">

              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>Jardines propios</span>
                <strong>
                  <CountUp
                    end={2908}
                    active={animateNumbers}
                    suffix=" m²"
                  />
                </strong>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>Servidumbres</span>
                <strong>
                  <CountUp
                    end={402}
                    active={animateNumbers}
                    suffix=" m²"
                  />
                </strong>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>Terrazas</span>
                <strong>
                  <CountUp
                    end={894}
                    active={animateNumbers}
                    suffix=" m²"
                  />
                </strong>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>Amenities</span>
                <strong>
                  <CountUp
                    end={140}
                    active={animateNumbers}
                    suffix=" m²"
                  />
                </strong>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>COMPAP</span>
                <strong>
                  <CountUp
                    end={742}
                    active={animateNumbers}
                    suffix=" m²"
                  />{" "}
                  ·{" "}
                  <CountUp
                    end={10}
                    active={animateNumbers}
                    suffix="%"
                  />
                </strong>
              </div>

            </div>
          </div>

          <div>
            <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-gray-500">
              Tipologías
            </h3>

            <div className="space-y-4 text-lg">

              <div className="flex justify-between">
                <span>
                  A1 · <CountUp end={139} active={animateNumbers} suffix=" m²" />
                </span>
                <strong>
                  <CountUp end={2} active={animateNumbers} /> unidades
                </strong>
              </div>

              <div className="flex justify-between">
                <span>
                  A2 · <CountUp end={133} active={animateNumbers} suffix=" m²" />
                </span>
                <strong>
                  <CountUp end={8} active={animateNumbers} /> unidades
                </strong>
              </div>

              <div className="flex justify-between">
                <span>
                  B1 · <CountUp end={121} active={animateNumbers} suffix=" m²" />
                </span>
                <strong>
                  <CountUp end={2} active={animateNumbers} /> unidades
                </strong>
              </div>

              <div className="flex justify-between">
                <span>
                  B2 · <CountUp end={118} active={animateNumbers} suffix=" m²" />
                </span>
                <strong>
                  <CountUp end={4} active={animateNumbers} /> unidades
                </strong>
              </div>

              <div className="flex justify-between">
                <span>
                  B3 · <CountUp end={117} active={animateNumbers} suffix=" m²" />
                </span>
                <strong>
                  <CountUp end={2} active={animateNumbers} /> unidades
                </strong>
              </div>

              <div className="flex justify-between">
                <span>
                  B4 · <CountUp end={114} active={animateNumbers} suffix=" m²" />
                </span>
                <strong>
                  <CountUp end={4} active={animateNumbers} /> unidades
                </strong>
              </div>

              <div className="flex justify-between">
                <span>
                  C1 · <CountUp end={111} active={animateNumbers} suffix=" m²" />
                </span>
                <strong>
                  <CountUp end={6} active={animateNumbers} /> unidades
                </strong>
              </div>

              <div className="flex justify-between">
                <span>
                  C2 · <CountUp end={112} active={animateNumbers} suffix=" m²" />
                </span>
                <strong>
                  <CountUp end={2} active={animateNumbers} /> unidades
                </strong>
              </div>

              <div className="flex justify-between">
                <span>
                  C3 · <CountUp end={109} active={animateNumbers} suffix=" m²" />
                </span>
                <strong>
                  <CountUp end={4} active={animateNumbers} /> unidades
                </strong>
              </div>

              <div className="flex justify-between">
                <span>
                  C4 · <CountUp end={109} active={animateNumbers} suffix=" m²" />
                </span>
                <strong>
                  <CountUp end={4} active={animateNumbers} /> unidades
                </strong>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}