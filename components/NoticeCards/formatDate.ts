/*
ESTA FUNCIÓN SÍ LA HICE YO (Marco Delgado)
A diferencia de la función del Carousel xd
La comenté como si fuera código de la NASA

Complejidad: formatear una fecha
Orgullo: máximo
Claude involucrado: 0%
ChatGPT involucrado: Relativo XD

- useCarouselScroll.ts  : 200 líneas de magia negra
- formatDate.ts         : 15 líneas que SÍ ENTIENDO (Relativo)
*/

// Función que formatea fechas en un formato legible según la configuración regional
export function fmtDate(
  d?: string | Date,       // Fecha a formatear (puede ser un string o un objeto Date)
  locale = "es-CL"         // Configuración regional (por defecto, español de Chile)
) {
  // Si no se proporciona una fecha, retorna cadena vacía
  if (!d) return "";

  // Convierte el parámetro a objeto Date si viene como string
  const date = typeof d === "string" ? new Date(d) : d;

  // Si la conversión a fecha no es válida, retorna cadena vacía
  if (Number.isNaN(+date)) return "";

  // Retorna la fecha formateada con día, mes (en texto) y año
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}
