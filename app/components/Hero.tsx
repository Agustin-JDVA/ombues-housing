export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-screen w-full overflow-hidden"
    >
      <video
        src="/video/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="w-full max-w-7xl text-center">
          <h1 className="font-[family:var(--font-wix)] text-3xl font-bold uppercase tracking-[0.12em] text-white sm:text-5xl md:text-7xl md:tracking-[0.15em] lg:text-8xl xl:text-9xl xl:tracking-[0.18em]">
            Ombues Housing
          </h1>

          <p className="mt-5 text-xs uppercase tracking-[0.25em] text-white/80 sm:mt-6 sm:text-sm sm:tracking-[0.35em] md:text-lg md:tracking-[0.4em]">
            Montevideo · Uruguay
          </p>
        </div>
      </div>
    </section>
  );
}