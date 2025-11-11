"use client";
import { useLayoutEffect, useRef, useState } from "react";

// Importar todas las funciones modulares
import { 
  convertUnitToPx, 
  convertPxToUnit,
  getFrameDimensions, 
  getContentDimensions, 
  performAllCalculations,
  type CoverConfig
} from './index';

// *** TIPOS ***
interface UseNoticeCardLogicProps {
  width?: number;
  height?: number;
  unit?: 'px' | 'rem' | 'em' | 'vw' | 'vh';
  contentScale?: number;
  buttonScale?: number;
  resizable?: boolean;
  // Límites mínimos del componente
  minWidth: number;
  minHeight: number;
  // Configuración de visibilidad del cover
  coverConfig: CoverConfig;
}

interface UseNoticeCardLogicReturn {
  scale: number;
  buttonTransform: number;
  showCover: boolean;
  dynamicDescriptionLines: number;
  dynamicCaptionLines: number;
  getDimensionStyle: () => React.CSSProperties;
  frameRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

// *** HOOK PRINCIPAL ***
export const useNoticeCardLogic = ({
  width,
  height,
  unit = 'px',
  contentScale = 1.0,
  buttonScale = 1.0,
  resizable = false,
  minWidth,
  minHeight,
  coverConfig,
}: UseNoticeCardLogicProps): UseNoticeCardLogicReturn => {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [scale, setScale] = useState(1);
  const [buttonTransform, setButtonTransform] = useState(1);
  const [showCover, setShowCover] = useState(true);
  const [dynamicDescriptionLines, setDynamicDescriptionLines] = useState(3);
  const [dynamicCaptionLines, setDynamicCaptionLines] = useState(1);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    
    if (!frame || !canvas) return;

    // Obtener referencia al contenido
    const card = canvas.firstElementChild as HTMLElement;
    if (!card) return;

    // Variables de scope para toda la función
    const hasExplicitDims = width !== undefined || height !== undefined;

    const calculateAllLayout = () => {
      // Resetear scale temporalmente para medición correcta
      canvas.style.setProperty("--scale", "1");
      void canvas.offsetHeight; // Forzar reflow

      // Obtener dimensiones reales
      const { width: frameWidth, height: frameHeight } = getFrameDimensions(frame);
      const { width: contentWidth, height: contentHeight } = getContentDimensions(card);

      // Realizar todos los cálculos
      const results = performAllCalculations(
        frameWidth,
        frameHeight,
        contentWidth,
        contentHeight,
        contentScale,
        buttonScale,
        minWidth,    // Pasar los límites configurables
        minHeight,
        coverConfig  // Pasar configuración del cover
      );

      // Aplicar resultados
      setScale(results.finalScale);
      setButtonTransform(results.buttonTransform);
      setShowCover(results.coverVisible);
      setDynamicDescriptionLines(results.descriptionLines);
      setDynamicCaptionLines(results.captionLines);
      
      // Aplicar scale al canvas
      canvas.style.setProperty("--scale", String(results.finalScale));
    };

    // Configurar observadores
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calculateAllLayout);
    });

    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(calculateAllLayout);
    });

    // Observar frame solo si es necesario
    if (hasExplicitDims || resizable) {
      resizeObserver.observe(frame);
    }
    
    // Siempre observar cambios en el contenido
    mutationObserver.observe(canvas, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    // Cálculo inicial
    calculateAllLayout();

    // Cleanup
    return () => {
      if (hasExplicitDims || resizable) {
        resizeObserver.disconnect();
      }
      mutationObserver.disconnect();
    };
  }, [contentScale, buttonScale, resizable, minWidth, minHeight, coverConfig]);

  // *** FUNCIÓN PARA ESTILOS DE DIMENSIONES ***
  const getDimensionStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};
    
    const hasExplicitWidth = width !== undefined;
    const hasExplicitHeight = height !== undefined;
    
    if (hasExplicitWidth) {
      const userWidthPx = convertUnitToPx(width, unit);
      const effectiveWidthPx = Math.max(userWidthPx, minWidth);
      const effectiveWidth = convertPxToUnit(effectiveWidthPx, unit);
      style.width = `${effectiveWidth}${unit}`;
    }
    
    if (hasExplicitHeight) {
      const userHeightPx = convertUnitToPx(height, unit);
      const effectiveHeightPx = Math.max(userHeightPx, minHeight);
      const effectiveHeight = convertPxToUnit(effectiveHeightPx, unit);
      style.height = `${effectiveHeight}${unit}`;
    }

    // Funcionalidad de resize
    if (resizable) {
      style.resize = 'both';
      style.overflow = 'hidden';
      style.minWidth = `${minWidth}px`;
      style.minHeight = `${minHeight}px`;
    }
    
    return style;
  };

  return {
    scale,
    buttonTransform,
    showCover,
    dynamicDescriptionLines,
    dynamicCaptionLines,
    getDimensionStyle,
    frameRef,
    canvasRef,
  };
};