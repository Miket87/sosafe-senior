import type { RespuestasArea, RiesgoNivel } from "@/context/EvaluacionContext";

export function calcularRiesgoArea(
  area: RespuestasArea["area"],
  respuestas: Record<string, "si" | "no" | "n/a">
): RiesgoNivel {
  // Reglas sencillas por área.
  const respuestasSi = Object.entries(respuestas).filter(
    ([, v]) => v === "si"
  ).map(([k]) => k);

  // Ejemplos de factores críticos por área
  const criticos: Record<string, string[]> = {
    baño: ["sin_barras", "piso_resbaloso", "sin_alfombra_antideslizante"],
    dormitorio: ["cables_sueltos", "iluminacion_insuficiente"],
    cocina: ["alfombra_suelta", "sin_detector_humo"],
    pasillos: ["objetos_en_el_paso", "sin_pasamanos"],
    escaleras: ["sin_baranda", "sin_iluminacion", "escalon_irregular"],
  };

  const lista = criticos[area] || [];
  const tieneCritico = respuestasSi.some((k) => lista.includes(k));
  if (tieneCritico) return "alto";

  // 2+ riesgos menores → riesgo medio
  if (respuestasSi.length >= 2) return "medio";
  if (respuestasSi.length === 1) return "bajo";

  return "bajo";
}

export function obtenerRecomendacionesArea(
  area: RespuestasArea["area"],
  riesgo: RiesgoNivel
): string[] {
  // Recomendaciones súper simples, luego se pueden enriquecer según el PDF.
  if (area === "baño") {
    if (riesgo === "alto") {
      return [
        "Instalar barras de apoyo junto al WC y dentro de la ducha.",
        "Colocar alfombras antideslizantes en piso de ducha y zona de salida.",
        "Reemplazar pisos muy lisos por superficies antideslizantes.",
      ];
    }
    if (riesgo === "medio") {
      return [
        "Revisar estado de alfombras y fijarlas para evitar tropiezos.",
        "Mejorar iluminación general y de noche (luces de guía).",
      ];
    }
    return [
      "Mantener revisión mensual del baño y secar de inmediato superficies mojadas.",
    ];
  }

  if (area === "escaleras") {
    if (riesgo === "alto") {
      return [
        "Instalar barandas firmes a ambos lados de la escalera.",
        "Mejorar la iluminación con luces continuas o sensores de movimiento.",
        "Marcar bordes de escalones con cinta antideslizante de alto contraste.",
      ];
    }
    if (riesgo === "medio") {
      return [
        "Fijar bien las alfombras cercanas a la escalera.",
        "Retirar objetos sueltos en peldaños o descansos.",
      ];
    }
    return ["Revisar regularmente la firmeza de barandas y peldaños."];
  }

  // Default genérico
  if (riesgo === "alto") {
    return [
      "Ordenar el área, liberar zonas de paso y eliminar obstáculos.",
      "Reforzar iluminación y puntos de apoyo (barandas, pasamanos).",
    ];
  }
  if (riesgo === "medio") {
    return ["Revisar y corregir pequeños riesgos antes de que se vuelvan críticos."];
  }
  return ["Mantener las buenas prácticas actuales en esta área."];
}
