/** ---------------------------------------------------
 * Calcula la escala óptima para que un contenido encaje dentro de un marco
 * sin deformarse, manteniendo su proporción.
 * @param frameWidth Ancho disponible.
 * @param frameHeight Alto disponible.
 * @param contentWidth Ancho del contenido original.
 * @param contentHeight Alto del contenido original.
 * @returns La escala óptima (máximo 1 para no sobreescalar).
 */
const calculateOptimalScale = (
  frameWidth: number,
  frameHeight: number,
  contentWidth: number,
  contentHeight: number
): number => {
  const scaleX = frameWidth / contentWidth;
  const scaleY = frameHeight / contentHeight;
  return Math.min(1, scaleX, scaleY);
};



/** ---------------------------------------------------
 * Restringe una escala a un rango seguro para evitar valores extremos.
 * Mantiene la escala dentro del intervalo [0.1, 2.0].
 * @param scale Escala a acotar.
 * @returns Escala acotada entre 0.1 y 2.0.
 */
const clampScale = (scale: number): number => {
  return Math.max(0.1, Math.min(2.0, scale));
};



/** ---------------------------------------------------
 * Aplica un factor de escala al contenido, restringiéndolo a un rango seguro.
 * @param baseScale Escala base calculada previamente.
 * @param contentScale Escala adicional solicitada por el usuario.
 * @returns Escala resultante ajustada entre 0.1 y 2.0.
 */
const applyContentScale = (baseScale: number, contentScale: number): number => {
  return baseScale * clampScale(contentScale);
};



/** ---------------------------------------------------
 * Calcula la escala adecuada para botones u otros elementos que deben
 * mantenerse visualmente proporcionales al cambiar la escala del contenido.
 * @param contentScale Escala actual del contenido.
 * @param buttonScale Escala deseada para el botón.
 * @returns Escala final ajustada para mantener legibilidad y proporción.
 */
const calculateButtonScale = (contentScale: number, buttonScale: number): number => {
  return (1 / clampScale(contentScale)) * clampScale(buttonScale);
};



/* --------------------------------------------------- */
export {
  calculateOptimalScale,
  applyContentScale,
  calculateButtonScale,
};