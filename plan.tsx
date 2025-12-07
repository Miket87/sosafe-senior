"use client";

import { useEvaluacion } from "@/context/EvaluacionContext";
import { obtenerRecomendacionesArea } from "@/lib/motorRiesgo";
import { generarPlanPdf } from "@/lib/generarPlanPdf";

export default function PlanPage() {
  const { evaluacion } = useEvaluacion();

  const handleDescargar = () => {
    generarPlanPdf(evaluacion);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Plan Senior Ready</h1>
      <p className="text-sm text-slate-600 mb-6">
        Este plan organiza las acciones recomendadas en tres fases: ajustes urgentes,
        adaptaciones del hogar y prevención continua. Se genera a partir del diagnóstico
        inicial y del checklist realizado en cada área del hogar.
      </p>

      {/* Fases */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-red-100">
          <h2 className="text-sm font-semibold text-red-700 mb-2">
            Fase 1 · Ajustes urgentes
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            Corregir los riesgos altos detectados, priorizando baño, escaleras y
            pasillos. Es la fase más importante para prevenir caídas graves.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm border border-amber-100">
          <h2 className="text-sm font-semibold text-amber-700 mb-2">
            Fase 2 · Adaptaciones del hogar
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            Incluir apoyo adicional: barras, pasamanos, iluminación continua,
            reorganización del mobiliario y reforzamiento de rutas de paso.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm border border-emerald-100">
          <h2 className="text-sm font-semibold text-emerald-700 mb-2">
            Fase 3 · Autonomía y prevención
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            Revisión regular del hogar, monitoreo de movilidad, educación familiar y
            mantenimiento de las mejoras realizadas para asegurar autonomía continua.
          </p>
        </div>
      </div>

      {/* Recomendaciones por área */}
      <div className="space-y-4 mb-8">
        {evaluacion.checklist.length === 0 ? (
          <p className="text-sm text-slate-600">
            Aún no se han evaluado áreas del hogar. Completa primero el checklist para
            generar recomendaciones personalizadas.
          </p>
        ) : (
          evaluacion.checklist.map((area) => {
            const recs = obtenerRecomendacionesArea(area.area, area.riesgo);
            return (
              <div
                key={area.area}
                className="rounded-2xl bg-white p-4 shadow-sm border"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {area.area.toUpperCase()}
                  </h3>
                  <span
                    className={`text-xs rounded-full px-3 py-1 font-medium capitalize ${
                      area.riesgo === "alto"
                        ? "bg-red-100 text-red-700"
                        : area.riesgo === "medio"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    Riesgo {area.riesgo}
                  </span>
                </div>

                <ul className="text-xs text-slate-700 list-disc pl-4 space-y-1">
                  {recs.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={handleDescargar}
        disabled={evaluacion.checklist.length === 0}
        className="rounded-full bg-sky-700 px-5 py-2 text-sm font-medium text-white hover:bg-sky-800 disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        Descargar Plan Senior Ready (PDF)
      </button>
    </div>
  );
}

