type HeroProps = {
  introMode?: boolean;
  onEnter?: () => void;
};

export default function Hero({
  introMode = false,
  onEnter,
}: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <video
        src="/video/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/25" />

      {introMode ? (
        <>
          {/* LOGO DEL PROYECTO */}
          <div className="absolute left-1/2 -top-16 z-10 -translate-x-1/2 sm:-top-20 md:-top-24">
            <img
              src="/logo/ombues.png"
              alt="Ombues Housing"
              className="h-64 w-auto sm:h-80 md:h-96 lg:h-[28rem]"
              draggable={false}
            />
          </div>

          {/* BOTÓN INGRESAR */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
            <button
              type="button"
              onClick={onEnter}
              className="flex h-14 w-[250px] items-center justify-center rounded-full bg-white text-xs font-medium uppercase tracking-[0.18em] text-black shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-95 sm:h-16 sm:w-[280px] sm:text-sm"
            >
              Ingresar al proyecto
            </button>
          </div>
        </>
      ) : (
        <>
          {/* INVITACIÓN A RECORRER */}
          <a
            href="#renders"
            className="scroll-invitation absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-white sm:bottom-12 md:bottom-14"
            aria-label="Ir a renders"
          >
            {/* TEXTO SIN FONDO */}
            <span className="whitespace-nowrap font-[family:var(--font-wix)] text-[10px] font-medium uppercase tracking-[0.24em] text-white drop-shadow-md sm:text-[11px] md:text-[13px]">
              Desliza para recorrer
            </span>

            {/* FLECHA */}
            <div className="scroll-arrow mt-4 flex flex-col items-center">
              <div className="mb-1 h-1.5 w-1.5 rounded-full bg-white" />

              <div className="h-10 w-px bg-white/90 md:h-12" />

              <div className="-mt-[6px] h-3 w-3 rotate-45 border-b-2 border-r-2 border-white" />
            </div>
          </a>
        </>
      )}

      <style jsx global>{`
        .scroll-invitation {
          animation: scrollInvitationFade 2.4s ease-in-out infinite;
        }

        .scroll-arrow {
          animation: scrollInvitationMove 1.7s ease-in-out infinite;
          filter: drop-shadow(
            0 2px 4px rgba(0, 0, 0, 0.45)
          );
        }

        @keyframes scrollInvitationMove {
          0% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(12px);
          }

          100% {
            transform: translateY(0);
          }
        }

        @keyframes scrollInvitationFade {
          0% {
            opacity: 0.72;
          }

          50% {
            opacity: 1;
          }

          100% {
            opacity: 0.72;
          }
        }
      `}</style>
    </section>
  );
}