"use client";

import React, { createContext, useContext, useState } from "react";

export type RespuestasArea = {
  area: "baño" | "dormitorio" | "cocina" | "pasillos" | "escaleras";
  respuestas: Record<string, "si" | "no" | "n/a">;
  riesgo: number;
};

type EvaluacionContextType = {
  checklist: RespuestasArea[];
  setChecklistArea: (area: RespuestasArea) => void;
  recalcularRiesgoGlobal: () => void;
  riesgoGlobal: number;
};

const EvaluacionContext = createContext<EvaluacionContextType | undefined>(
  undefined
);

export function EvaluacionProvider({ children }: { children: React.ReactNode }) {
  const [checklist, setChecklist] = useState<RespuestasArea[]>([]);
  const [riesgoGlobal, setRiesgoGlobal] = useState(0);

  const setChecklistArea = (nuevo: RespuestasArea) => {
    setChecklist((prev) => {
      const filtrado = prev.filter((a) => a.area !== nuevo.area);
      return [...filtrado, nuevo];
    });
  };

  const recalcularRiesgoGlobal = () => {
    if (checklist.length === 0) return setRiesgoGlobal(0);
    const promedio =
      checklist.reduce((acc, a) => acc + a.riesgo, 0) / checklist.length;
    setRiesgoGlobal(Math.round(promedio));
  };

  return (
    <EvaluacionContext.Provider
      value={{ checklist, setChecklistArea, riesgoGlobal, recalcularRiesgoGlobal }}
    >
      {children}
    </EvaluacionContext.Provider>
  );
}

export function useEvaluacion() {
  const ctx = useContext(EvaluacionContext);
  if (!ctx)
    throw new Error(
      "useEvaluacion debe usarse dentro de <EvaluacionProvider>"
    );
  return ctx;
}
