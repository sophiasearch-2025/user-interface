import {
  applyEffectiveLimits,
} from './measurements';

import {
  shouldShowCover,
  calculateDynamicLines,
} from './calculations';

import {
  calculateOptimalScale,
  applyContentScale,
  calculateButtonScale,
} from './scaling';



/** ---------------------------------------------------
 * Configuración para el cálculo de visibilidad del cover
 */
interface CoverConfig {
  base: number;    // factor en W = W0
  W0: number;      // pivote (ancho por defecto)
  L: number;       // asíntota inferior
  kUp: number;     // rapidez de acercamiento a L (W > W0)
  kDown: number;   // pendiente para W < W0
}



/** ---------------------------------------------------
 * Resultado agregado de los cálculos de layout.
 */
interface LayoutCalculationResults {
  // Escala final aplicada al contenido tras combinar escala base y escala externa.
  finalScale: number;
  // Factor de transformación para el botón de acción, derivado de escalas de contenido y botón.
  buttonTransform: number;
  // Indica si el cover debe mostrarse dada el área efectiva disponible.
  coverVisible: boolean;
  // Número de líneas permitidas para la descripción, en función del alto disponible.
  descriptionLines: number;
  // Número de líneas permitidas para la leyenda (caption), en función del alto disponible.
  captionLines: number;
}



/** ---------------------------------------------------
 * Ejecuta todos los cálculos de layout y devuelve valores listos para renderizado.
 * @param frameWidth Ancho del contenedor externo (frame).
 * @param frameHeight Alto del contenedor externo (frame).
 * @param contentWidth Ancho intrínseco del contenido a escalar.
 * @param contentHeight Alto intrínseco del contenido a escalar.
 * @param contentScale Escala externa del contenido (control del llamado).
 * @param buttonScale Escala adicional específica del botón.
 * @param minWidth Ancho mínimo efectivo permitido para el frame.
 * @param minHeight Alto mínimo efectivo permitido para el frame.
 * @param coverConfig Configuración para el cálculo de visibilidad del cover.
 * @returns {LayoutCalculationResults} Medidas y flags necesarios para el layout.
 */
const performAllCalculations = (
  frameWidth: number,
  frameHeight: number,
  contentWidth: number,
  contentHeight: number,
  contentScale: number,
  buttonScale: number,
  minWidth: number,
  minHeight: number,
  coverConfig: CoverConfig
): LayoutCalculationResults => {
  // 1. Aplicar límites efectivos
  const { width: effectiveWidth, height: effectiveHeight } = applyEffectiveLimits(frameWidth, frameHeight, minWidth, minHeight);
  
  // 2. Calcular visibilidad del cover
  const coverVisible = shouldShowCover(effectiveWidth, effectiveHeight, coverConfig);
  
  // 3. Calcular líneas dinámicas
  const { descriptionLines, captionLines } = calculateDynamicLines(effectiveHeight);
  
  // 4. Calcular escala óptima
  const baseScale = calculateOptimalScale(frameWidth, frameHeight, contentWidth, contentHeight);
  const finalScale = applyContentScale(baseScale, contentScale);
  
  // 5. Calcular transformación del botón
  const buttonTransform = calculateButtonScale(contentScale, buttonScale);
  
  return {
    finalScale,
    buttonTransform,
    coverVisible,
    descriptionLines,
    captionLines
  };
};



/* --------------------------------------------------- */
export {
  performAllCalculations,
  type LayoutCalculationResults,
  type CoverConfig,
};