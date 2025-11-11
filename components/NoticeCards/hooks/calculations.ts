/** ---------------------------------------------------
 * Calcula la altura del cover manteniendo proporción 16:9.
 * @param width Ancho disponible.
 * @returns Altura correspondiente.
 */
const calculateCoverHeight = (width: number): number => {
  return width * 9 / 16; // proporción 16:9
};



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
 * Ajusta un factor de visibilidad según el ancho.
 *
 * Para anchuras ≥ W0: disminuye de forma sublineal hacia una asíntota inferior L.
 * Para anchuras < W0: crece linealmente sin techo.
 *
 * @param width Ancho efectivo de la tarjeta.
 * @param config Configuración para el cálculo de visibilidad.
 * @returns Factor de visibilidad (afecta la altura necesaria para mostrar el cover).
 */
const calculateVisibilityFactor = (width: number, config: CoverConfig): number => {
  const { base, W0, L, kUp, kDown } = config;
  
  if (width >= W0) {
    const normalized = (width - W0) / W0;
    const curved = L + (base - L) / (1 + kUp * Math.pow(normalized, 3/4));
    return curved;
  } else {
    return base * (1 + kDown * (W0 - width) / W0);
  }
};



/** ---------------------------------------------------
 * Determina si se debe mostrar el cover según espacio vertical disponible.
 * @param effectiveWidth Ancho disponible del contenedor.
 * @param effectiveHeight Alto disponible del contenedor.
 * @param config Configuración para el cálculo de visibilidad.
 * @returns true si el cover tiene suficiente espacio para mostrarse; false si debería ocultarse.
 */
const shouldShowCover = (
  effectiveWidth: number,
  effectiveHeight: number,
  config: CoverConfig
): boolean => {
  const coverHeight = calculateCoverHeight(effectiveWidth);
  const visibilityFactor = calculateVisibilityFactor(effectiveWidth, config);
  const requiredHeight = visibilityFactor * coverHeight;
  
  return effectiveHeight >= requiredHeight;
};



/** ---------------------------------------------------
 * Calcula dinámicamente cuántas líneas pueden ocupar el caption y la descripción
 * según la altura del frame disponible.
 * @param frameHeight Altura del contenedor de texto.
 * @returns Cantidad de líneas permitidas para descripción y caption.
 */
const calculateDynamicLines = (frameHeight: number) => {
  const descriptionLines = Math.max(1, Math.min(10, Math.floor(frameHeight / 40)));
  const captionLines = Math.max(1, Math.min(2, Math.floor(frameHeight / 80)));
  
  return { descriptionLines, captionLines };
};



/* --------------------------------------------------- */
export {
  calculateCoverHeight,
  calculateVisibilityFactor,
  shouldShowCover,
  calculateDynamicLines,
  type CoverConfig,
};