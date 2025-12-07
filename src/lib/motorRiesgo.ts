// ============================================================
// motorRiesgo.ts — Motor básico de cálculo de riesgo por área
// Compatible con ChecklistPage y EvaluacionContext
// ============================================================

export function calcularRiesgoArea(
  area: string,
  respuestas: Record<string, "si" | "no" | "n/a">
) {
  /**
   * Lógica simple: 
   *  - "si" = existe riesgo → suma 2 puntos
   *  - "no" = no hay riesgo → suma 0 puntos
   *  - "n/a" = no aplica → suma 1 punto
   */

  let puntaje = 0;

  for (const clave in respuestas) {
    const valor = respuestas[clave];

    if (valor === "si") puntaje += 2;
    else if (valor === "n/a") puntaje += 1;
  }

  // Escalas sugeridas:
  // 0–2 = bajo, 3–5 = medio, 6+ = alto
  let nivel: "bajo" | "medio" | "alto" = "bajo";

  if (puntaje >= 6) nivel = "alto";
  else if (puntaje >= 3) nivel = "medio";

  return {
    area,
    puntaje,
    nivel,
  };
}

// ============================================================
// (Opcional) Motor de riesgo global
// ============================================================

export function calcularRiesgoGlobal(registros: any[]) {
  /**
   * Suma los puntajes de todas las áreas
   */

  const total = registros.reduce((acc, r) => acc + (r.puntaje || 0), 0);

  let nivel: "bajo" | "medio" | "alto" = "bajo";

  if (total >= 15) nivel = "alto";
  else if (total >= 7) nivel = "medio";

  return { total, nivel };
}
