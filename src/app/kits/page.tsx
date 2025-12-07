export default function KitsPage() {
  const KITS = [
    {
      id: "kit-bano",
      nombre: "Kit Baño Seguro",
      descripcion:
        "Incluye barras de apoyo, alfombras antideslizantes, asiento de ducha y elevador de WC.",
      areas: ["baño"],
    },
    {
      id: "kit-movilidad",
      nombre: "Kit Movilidad y Apoyo",
      descripcion:
        "Andador ligero, bastón ergonómico, puntos de apoyo en pasillos y dormitorio.",
      areas: ["pasillos", "dormitorio"],
    },
    {
      id: "kit-iluminacion",
      nombre: "Kit Iluminación Continua",
      descripcion:
        "Luces nocturnas, sensores de movimiento y mejora de iluminación en escaleras.",
      areas: ["pasillos", "escaleras", "dormitorio"],
    },
    {
      id: "kit-prevencion-caidas",
      nombre: "Kit Prevención de Caídas",
      descripcion:
        "Fijadores de alfombras, organizadores de cables, protectores de esquinas y antideslizantes.",
      areas: ["cocina", "pasillos", "dormitorio"],
    },
    {
      id: "kit-barandas",
      nombre: "Kit Barandas y Accesibilidad",
      descripcion:
        "Barandas dobles para escaleras, pasamanos continuos y apoyos en zonas clave.",
      areas: ["escaleras", "pasillos", "dormitorio"],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Kits Modulares</h1>
      <p className="text-sm text-slate-600 mb-6">
        Estos kits muestran grupos de soluciones listas para intervenir el hogar
        de forma rápida y modular, alineados con las necesidades más comunes de
        seguridad y movilidad en adultos mayores.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {KITS.map((kit) => (
          <div
            key={kit.id}
            className="rounded-2xl bg-white border p-5 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-base font-semibold mb-1">{kit.nombre}</h2>
            <p className="text-xs text-slate-700 mb-3">{kit.descripcion}</p>

            <div className="flex flex-wrap gap-2 text-[11px]">
              {kit.areas.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-slate-100 px-3 py-1 uppercase tracking-wide text-slate-600"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-500">
        *En este prototipo los kits son representaciones visuales. En la versión
        SaaS final podrán conectarse a un catálogo real de productos y servicios.
      </p>
    </div>
  );
}
