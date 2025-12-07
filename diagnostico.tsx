"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useEvaluacion,
  DatosAdultoMayor,
  CondicionesHogar,
} from "@/context/EvaluacionContext";

export default function DiagnosticoPage() {
  const { evaluacion, setDatosAdulto, setCondicionesHogar } = useEvaluacion();
  const router = useRouter();

  const [adulto, setAdulto] = useState<DatosAdultoMayor>(
    evaluacion.datosAdulto || { caidasUltimoAno: 0 }
  );

  const [hogar, setHogar] = useState<CondicionesHogar>(
    evaluacion.condicionesHogar || {}
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Guardamos en el contexto global
    setDatosAdulto(adulto);
    setCondicionesHogar(hogar);

    console.log("Diagnóstico inicial guardado:", { adulto, hogar });

    router.push("/checklist");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Diagnóstico inicial</h1>
      <p className="text-sm text-slate-600 mb-6">
        Completa este formulario con los datos del adulto mayor y las
        características del hogar. Esto nos ayudará a personalizar la evaluación.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2"
      >
        {/* Datos del adulto mayor */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
            Adulto mayor
          </h2>

          <div className="space-y-1">
            <label className="text-xs font-medium">Nombre (opcional)</label>
            <input
              type="text"
              className="w-full rounded-md border px-2 py-1 text-sm"
              value={adulto.nombre || ""}
              onChange={(e) =>
                setAdulto((prev) => ({ ...prev, nombre: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium">Edad</label>
            <input
              type="number"
              min={50}
              max={110}
              required
              className="w-full rounded-md border px-2 py-1 text-sm"
              value={adulto.edad || ""}
              onChange={(e) =>
                setAdulto((prev) => ({
                  ...prev,
                  edad: Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium">
              ¿Vive solo la mayor parte del tiempo?
            </label>
            <select
              required
              className="w-full rounded-md border px-2 py-1 text-sm"
              value={adulto.viveSolo || ""}
              onChange={(e) =>
                setAdulto((prev) => ({
                  ...prev,
                  viveSolo: e.target.value as "si" | "no",
                }))
              }
            >
              <option value="">Seleccionar...</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium">
              ¿Usa bastón, andador u otra ayuda?
            </label>
            <select
              required
              className="w-full rounded-md border px-2 py-1 text-sm"
              value={adulto.usaBaston || ""}
              onChange={(e) =>
                setAdulto((prev) => ({
                  ...prev,
                  usaBaston: e.target.value as "si" | "no",
                }))
              }
            >
              <option value="">Seleccionar...</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium">
              ¿Cuántas caídas tuvo en el último año?
            </label>
            <input
              type="number"
              min={0}
              className="w-full rounded-md border px-2 py-1 text-sm"
              value={adulto.caidasUltimoAno ?? 0}
              onChange={(e) =>
                setAdulto((prev) => ({
                  ...prev,
                  caidasUltimoAno: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>

        {/* Datos del hogar */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
            Hogar
          </h2>

          <div className="space-y-1">
            <label className="text-xs font-medium">Tipo de vivienda</label>
            <select
              required
              className="w-full rounded-md border px-2 py-1 text-sm"
              value={hogar.tipoVivienda || ""}
              onChange={(e) =>
                setHogar((prev) => ({
                  ...prev,
                  tipoVivienda: e.target.value as "casa" | "departamento" | "otro",
                }))
              }
            >
              <option value="">Seleccionar...</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium">Número de pisos</label>
            <input
              type="number"
              min={1}
              className="w-full rounded-md border px-2 py-1 text-sm"
              value={hogar.pisos ?? ""}
              onChange={(e) =>
                setHogar((prev) => ({
                  ...prev,
                  pisos: Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium">
              ¿Tiene escaleras dentro o fuera del hogar?
            </label>
            <select
              className="w-full rounded-md border px-2 py-1 text-sm"
              value={hogar.tieneEscaleras || ""}
              onChange={(e) =>
                setHogar((prev) => ({
                  ...prev,
                  tieneEscaleras: e.target.value as "si" | "no",
                }))
              }
            >
              <option value="">Seleccionar...</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium">Número de baños</label>
            <input
              type="number"
              min={1}
              className="w-full rounded-md border px-2 py-1 text-sm"
              value={hogar.banos ?? ""}
              onChange={(e) =>
                setHogar((prev) => ({
                  ...prev,
                  banos: Number(e.target.value),
                }))
              }
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800"
          >
            Guardar y continuar →
          </button>
        </div>
      </form>
    </div>
  );
}
