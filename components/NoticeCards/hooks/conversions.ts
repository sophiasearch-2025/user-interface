/** ---------------------------------------------------
 * Convierte un valor desde una unidad CSS a píxeles.
 * @param value Número base a convertir.
 * @param unit Unidad de origen: "px" | "rem" | "em" | "vw" | "vh".
 * @returns Valor equivalente en píxeles.
 */
const convertUnitToPx = (value: number, unit: 'px' | 'rem' | 'em' | 'vw' | 'vh'): number => {
  if (unit === 'px') return value;
  if (unit === 'rem' || unit === 'em') return value * 16;
  
  const viewport = typeof window !== 'undefined' ? window : { innerWidth: 1920, innerHeight: 1080 };
  
  if (unit === 'vw') return (value * viewport.innerWidth) / 100;
  if (unit === 'vh') return (value * viewport.innerHeight) / 100;
  
  return value;
};



/** ---------------------------------------------------
 * Convierte un valor en píxeles hacia otra unidad CSS.
 * @param pxValue Valor en píxeles.
 * @param unit Unidad destino: "px" | "rem" | "em" | "vw" | "vh".
 * @returns Valor convertido a la unidad solicitada.
 */
const convertPxToUnit = (pxValue: number, unit: 'px' | 'rem' | 'em' | 'vw' | 'vh'): number => {
  if (unit === 'px') return pxValue;
  if (unit === 'rem' || unit === 'em') return pxValue / 16;
  
  const viewport = typeof window !== 'undefined' ? window : { innerWidth: 1920, innerHeight: 1080 };
  
  if (unit === 'vw') return (pxValue * 100) / viewport.innerWidth;
  if (unit === 'vh') return (pxValue * 100) / viewport.innerHeight;
  
  return pxValue;
};



/** ---------------------------------------------------
 * Formatea una fecha al formato nacional (ej: "12 de marzo de 2024").
 * @param d Fecha en formato string o Date. Si es inválida, retorna string vacío.
 * @returns Fecha formateada o "" si la fecha no es válida.
 */
const convertDateToStr = (d?: string | Date): string => {
  if (!d) return "";

  const date = typeof d === "string" ? new Date(d) : d;

  if (Number.isNaN(+date)) return "";

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}



/* --------------------------------------------------- */
export {
  convertUnitToPx,
  convertPxToUnit,
  convertDateToStr,
};