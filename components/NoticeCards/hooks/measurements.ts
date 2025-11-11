interface FrameDimensions {
  width: number;
  height: number;
}

interface ContentDimensions {
  width: number;
  height: number;
}



/** ---------------------------------------------------
 * Obtiene las dimensiones visibles del contenedor (frame) usando el bounding box.
 * @param frame Elemento HTML contenedor.
 * @returns Objeto con ancho y alto en píxeles.
 */
const getFrameDimensions = (frame: HTMLElement): FrameDimensions => {
  const rect = frame.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height
  };
};



/** ---------------------------------------------------
 * Obtiene las dimensiones reales del contenido interno,
 * considerando su tamaño total scrollable.
 * @param card Elemento HTML del contenido.
 * @returns Ancho y alto total del contenido (scrollWidth / scrollHeight).
 */
const getContentDimensions = (card: HTMLElement): ContentDimensions => {
  return {
    width: card.scrollWidth,
    height: card.scrollHeight
  };
};



/** ---------------------------------------------------
 * Aplica límites mínimos a las dimensiones del frame.
 * Garantiza que no se reduzca por debajo del tamaño mínimo especificado.
 * @param frameWidth Ancho actual del frame.
 * @param frameHeight Alto actual del frame.
 * @param minWidth Ancho mínimo permitido.
 * @param minHeight Alto mínimo permitido.
 * @returns Dimensiones ajustadas respetando los límites mínimos.
 */
const applyEffectiveLimits = (frameWidth: number, frameHeight: number, minWidth: number, minHeight: number): FrameDimensions => {
  return {
    width: Math.max(frameWidth, minWidth),
    height: Math.max(frameHeight, minHeight)
  };
};



/* --------------------------------------------------- */
export {
  getFrameDimensions,
  getContentDimensions,
  applyEffectiveLimits,
  type FrameDimensions,
  type ContentDimensions,
};