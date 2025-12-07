import jsPDF from "jspdf";
import type { EvaluacionState } from "@/context/EvaluacionContext";
import { obtenerRecomendacionesArea } from "./motorRiesgo";

/**
 * Genera el PDF del Plan Senior Ready basado en la evaluación actual.
 */
export function generarPlanPdf(evaluacion: EvaluacionState) {
  const doc = new jsPDF();

  // ======== ENCABEZADO ========
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Plan Senior Ready", 14, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("SoSafe Senior – Evaluación de Seguridad del Hogar", 14, 28);

  let y = 40;

  // ======== DATOS DEL ADULTO MAYOR ========
  doc.setFont("helvetica", "bold");
  doc.text("Datos del adulto mayor:", 14, y);
  y += 8;

  const nombre = evaluacion.datosAdulto?.nombre || "No especificado";
  const edad = evaluacion.datosAdulto?.edad
    ? `${evaluacion.datosAdulto.edad} años`
    : "Edad no especificada";

  doc.setFont("helvetica", "normal");
  doc.text(`• Nombre: ${nombre}`, 14, y); y += 6;
  doc.text(`• Edad: ${edad}`, 14, y); y += 6;

  if (evaluacion.riesgoGlobal) {
    doc.text(
      `• Riesgo global estimado: ${evaluacion.riesgoGlobal.toUpperCase()}`,
      14,
      y
    );
    y += 10;
  }

  // ======== FASES ========
  doc.setFont("helvetica", "bold");
  doc.text("Fase 1: Ajustes urgentes", 14, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(
    "Corregir de inmediato los riesgos altos detectados, priorizando baño y escaleras.",
    14,
    y,
    { maxWidth: 180 }
  );
  y += 14;

  doc.setFont("helvetica", "bold");
  doc.text("Fase 2: Adaptaciones del hogar", 14, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(
    "Instalar barras, mejorar iluminación, organizar espacios y asegurar puntos de apoyo.",
    14,
    y,
    { maxWidth: 180 }
  );
  y += 14;

  doc.setFont("helvetica", "bold");
  doc.text("Fase 3: Autonomía y prevención", 14, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(
    "Monitoreo continuo, educación familiar y revisión periódica del hogar.",
    14,
    y,
    { maxWidth: 180 }
  );
  y += 16;

  // ======== RECOMENDACIONES POR ÁREA ========
  doc.setFont("helvetica", "bold");
  doc.text("Recomendaciones por área evaluada:", 14, y);
  y += 8;

  doc.setFont("helvetica", "normal");

  for (const area of evaluacion.checklist) {
    const recs = obtenerRecomendacionesArea(area.area, area.riesgo);

    // Salto de página si llegamos al borde
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.text(`• ${area.area.toUpperCase()} (riesgo ${area.riesgo})`, 14, y);
    y += 6;

    doc.setFont("helvetica", "normal");

    recs.forEach((r) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(`- ${r}`, 18, y, { maxWidth: 175 });
      y += 5;
    });

    y += 6;
  }

  // ======== GUARDAR PDF ========
  doc.save("plan-senior-ready.pdf");
}
