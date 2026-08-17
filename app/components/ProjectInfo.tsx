export default function ProjectInfo() {
  return (
    <section
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
            <p className="text-4xl font-bold md:text-5xl">38</p>
            <p className="mt-2 text-gray-500">Unidades</p>
          </div>

          <div>
            <p className="text-4xl font-bold md:text-5xl">4.508 m²</p>
            <p className="mt-2 text-gray-500">Superficie de unidades</p>
          </div>

          <div>
            <p className="text-4xl font-bold md:text-5xl">7.416 m²</p>
            <p className="mt-2 text-gray-500">Superficie total</p>
          </div>

          <div>
            <p className="text-4xl font-bold md:text-5xl">76</p>
            <p className="mt-2 text-gray-500">Estacionamientos</p>
          </div>

        </div>

        {/* SUPERFICIES */}
        <div className="grid gap-16 md:grid-cols-2">

          <div>
            <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-gray-500">
              Superficies
            </h3>

            <div className="space-y-5 text-lg">

              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>Jardines propios</span>
                <strong>2.908 m²</strong>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>Servidumbres</span>
                <strong>402 m²</strong>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>Terrazas</span>
                <strong>894 m²</strong>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>Amenities</span>
                <strong>140 m²</strong>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>COMPAP</span>
                <strong>742 m² · 10%</strong>
              </div>

            </div>
          </div>

          {/* TIPOLOGÍAS */}
          <div>
            <h3 className="mb-8 text-sm uppercase tracking-[0.3em] text-gray-500">
              Tipologías
            </h3>

            <div className="space-y-4 text-lg">

              <div className="flex justify-between">
                <span>A1 · 139 m²</span>
                <strong>2 unidades</strong>
              </div>

              <div className="flex justify-between">
                <span>A2 · 133 m²</span>
                <strong>8 unidades</strong>
              </div>

              <div className="flex justify-between">
                <span>B1 · 121 m²</span>
                <strong>2 unidades</strong>
              </div>

              <div className="flex justify-between">
                <span>B2 · 118 m²</span>
                <strong>4 unidades</strong>
              </div>

              <div className="flex justify-between">
                <span>B3 · 117 m²</span>
                <strong>2 unidades</strong>
              </div>

              <div className="flex justify-between">
                <span>B4 · 114 m²</span>
                <strong>4 unidades</strong>
              </div>

              <div className="flex justify-between">
                <span>C1 · 111 m²</span>
                <strong>6 unidades</strong>
              </div>

              <div className="flex justify-between">
                <span>C2 · 112 m²</span>
                <strong>2 unidades</strong>
              </div>

              <div className="flex justify-between">
                <span>C3 · 109 m²</span>
                <strong>4 unidades</strong>
              </div>

              <div className="flex justify-between">
                <span>C4 · 109 m²</span>
                <strong>4 unidades</strong>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}