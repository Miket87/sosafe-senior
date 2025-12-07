"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ✅ IMPORT CORREGIDO (ya no rompe el build en Vercel)
import { useEvaluacion, RespuestasArea } from "@/EvaluacionContext";

import { calcularRiesgoArea } from "@/lib/motorRiesgo";

const AREAS: RespuestasArea["area"][] = [
  "baño",
  "dormitorio",
  "cocina",
  "pasillos",
  "escaleras",
];

type Pregunta = {
  id: string;
  texto: string;
};

const PREGUNTAS_POR_AREA: Record<RespuestasArea["area"], Pregunta[]> = {
  baño: [
    { id: "sin_barras", texto: "No hay barras de apoyo cerca del WC o ducha" },
    { id: "piso_resbaloso", texto: "El piso se vuelve muy resbaloso al mojarse" },
    { id: "sin_alfombra_antideslizante", texto: "No hay alfombra antideslizante" },
  ],
  dormitorio: [
    { id: "cables_sueltos", texto: "Hay cables u objetos sueltos en el piso" },
    { id: "iluminacion_insuficiente", texto: "La iluminación nocturna es débil" },
  ],
  cocina: [
    { id: "alfombra_suelta", texto: "Hay alfombras que se mueven o doblan" },
    { id: "sin_detector_humo", texto: "No hay detector de humo funcionando" },
  ],
  pasillos: [
    { id: "objetos_en_el_paso", texto: "Hay muebles u objetos en la ruta de paso" },
    { id: "sin_pasamanos", texto: "No hay pasamanos donde podrían necesitarse" },
  ],
  escaleras: [
    { id: "sin_baranda", texto: "La escalera no tiene baranda firme" },
    { id: "sin_iluminacion", texto: "La escalera tiene poca iluminación" },
    { id: "escalon_irregular", texto: "Hay escalones irregulares o dañados" },
  ],
};

export default function ChecklistPage() {
  const router = useRouter();
  const { setChecklistArea, recalcularRiesgoGlobal } = useEvaluacion();

  const [indiceArea, setIndiceArea] = useState(0);
  const areaActual = AREAS[indiceArea];

  const [respuestas, setRespuestas] = useState<
    Record<string, "si" | "no" | "n/a">
  >({});

  const preguntas = PREGUNTAS_POR_AREA[areaActual];
  const progreso = Math.round(((indiceArea + 1) / AREAS.length) * 100);

  const setRespuesta = (id: string, valor: "si" | "no" | "n/a") => {
    setRespuestas((prev) => ({ ...prev, [id]: valor }));
  };

  const handleGuardarArea = () => {
    const riesgo = calcularRiesgoArea(areaActual, respuestas);

    const registro: RespuestasArea = {
      area: areaActual,
      respuestas,
      riesgo,
    };

    setChecklistArea(registro);

    if (indiceArea < AREAS.length - 1) {
      setIndiceArea((prev) => prev + 1);
      setRespuestas({});
    } else {
      recalcularRiesgoGlobal();
      router.push("/plan");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">
        Checklist por áreas del hogar
      </h1>

      <p className="text-sm text-slate-600 mb-6">
        Responde según la situación actual del hogar. Con esto identificaremos
        riesgos en baño, dormitorio, cocina, pasillos y escaleras.
      </p>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-600 mb-1">
          <span>Progreso general</span>
          <span>{progreso}%</span>
        </div>

        <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-sky-600 transition-all"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-sky-700">
        Área actual: {areaActual.toUpperCase()}
      </div>

      {/* Tarjetas de preguntas */}
      <div className="space-y-3">
        {preguntas.map((p) => (
          <div
            key={p.id}
            className="flex flex-col justify-between gap-2 rounded-xl bg-white p-3 shadow-sm md:flex-row md:items-center"
          >
            <p className="text-sm text-slate-800">{p.texto}</p>

            <div className="flex gap-2 text-xs">
              {["si", "no", "n/a"].map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => setRespuesta(p.id, op as "si" | "no" | "n/a")}
                  className={`rounded-full border px-3 py-1 capitalize ${
                    respuestas[p.id] === op
                      ? "border-sky-700 bg-sky-700 text-white"
                      : "border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  {op === "si" ? "Sí" : op === "no" ? "No" : "N/A"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleGuardarArea}
          className="rounded-full bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800"
        >
          {indiceArea === AREAS.length - 1
            ? "Finalizar checklist y ver plan"
            : "Guardar área y continuar"}
        </button>
      </div>
    </div>
  );
}
