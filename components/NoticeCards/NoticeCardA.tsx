"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { fmtDate } from "./formatDate";
import ButtonOutline from "../ButtonOutline/ButtonOutline";
import MediaAvatar from "./MediaAvatar";
import NoticeCover from "./NoticeCover";
import Clamp from "./Clamp";
import styles from "./NoticeCardA.module.css";

type Props = {
  logoSrc?: string;
  coverSrc?: string;
  sourceName?: string;
  dateISO?: string | Date;
  caption?: string;
  title?: string;
  description?: string;
  ctaHref?: string;
  className?: string;
  // Props para control explícito de dimensiones
  width?: number;
  height?: number;
  unit?: 'px' | 'rem' | 'em' | 'vw' | 'vh';
  // Control manual del scale interno del contenido (0.1 - 2.0)
  contentScale?: number;
  // Control manual del scale del botón (0.1 - 2.0)
  buttonScale?: number;
  // Permitir redimensionar el componente arrastrando los bordes
  resizable?: boolean;
};

// *** CONSTANTES PARA LÍMITES MÍNIMOS INTERNOS ***
const ANCHO_MINIMO = 200; // px - ancho mínimo absoluto que el componente no puede cruzar
const ALTO_MINIMO = 200;  // px - alto mínimo absoluto que el componente no puede cruzar

// *** FUNCIONES DE CONVERSIÓN DE UNIDADES ***
const unitToPx = (value: number, unit: 'px' | 'rem' | 'em' | 'vw' | 'vh'): number => {
  switch (unit) {
    case 'px':
      return value;
    case 'rem':
      return value * 16; // 1rem = 16px por defecto
    case 'em':
      return value * 16; // 1em = 16px por defecto (asumiendo fuente base)
    case 'vw':
      return value * (typeof window !== 'undefined' ? window.innerWidth : 1920) / 100;
    case 'vh':
      return value * (typeof window !== 'undefined' ? window.innerHeight : 1080) / 100;
    default:
      return value;
  }
};

const pxToUnit = (pxValue: number, unit: 'px' | 'rem' | 'em' | 'vw' | 'vh'): number => {
  switch (unit) {
    case 'px':
      return pxValue;
    case 'rem':
      return pxValue / 16;
    case 'em':
      return pxValue / 16;
    case 'vw':
      return pxValue * 100 / (typeof window !== 'undefined' ? window.innerWidth : 1920);
    case 'vh':
      return pxValue * 100 / (typeof window !== 'undefined' ? window.innerHeight : 1080);
    default:
      return pxValue;
  }
};

export default function NoticeCardA({
  logoSrc,
  coverSrc,
  sourceName = "Medio desconocido",
  dateISO,
  caption = "Autor/a no disponible",
  title = "Título no disponible",
  description = "Descripción no disponible",
  ctaHref = "#",
  className = "",
  width = 330,
  height = 440,
  unit = 'px',
  contentScale = 1.0,
  buttonScale = 1.0,
  resizable = false,
}: Props) {
  const prettyDate = fmtDate(dateISO);
  
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [buttonTransform, setButtonTransform] = useState(1);
  const [dynamicDescriptionLines, setDynamicDescriptionLines] = useState(3);
  const [dynamicCaptionLines, setDynamicCaptionLines] = useState(1);
  const [showCover, setShowCover] = useState(true);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    const calculateScale = () => {
      // Resetear scale temporalmente para medir tamaño natural
      canvas.style.setProperty("--scale", "1");
      
      // Forzar reflow
      void canvas.offsetHeight;

      let frameWidth: number;
      let frameHeight: number;
      
      // *** LÓGICA SEPARAR DIMENSIONES DEL CONTENIDO ***
      if (width !== undefined || height !== undefined) {
        // Si se definen dimensiones explícitas, las dimensiones reales del frame
        // ya están aplicadas en getDimensionStyle()
        const frameRect = frame.getBoundingClientRect();
        frameWidth = frameRect.width;
        frameHeight = frameRect.height;
      } else {
        // Si NO se definen dimensiones explícitas, usar getBoundingClientRect()
        const frameRect = frame.getBoundingClientRect();
        frameWidth = frameRect.width;
        frameHeight = frameRect.height;
      }
      
      // *** APLICAR LÍMITES MÍNIMOS EN PÍXELES ***
      // El componente NUNCA será más pequeño que estos valores, sin importar
      // lo que defina el programador externamente
      const effectiveWidthPx = Math.max(frameWidth, ANCHO_MINIMO);
      const effectiveHeightPx = Math.max(frameHeight, ALTO_MINIMO);
      
      const card = canvas.firstElementChild as HTMLElement;
      if (!card) return;

      // Medir contenido natural completo (sin escalado)
      const contentWidth = card.scrollWidth;
      const contentHeight = card.scrollHeight;

      // Calcular escala que ajusta por ambos ejes usando las dimensiones reales del frame
      const scaleX = frameWidth / contentWidth;
      const scaleY = frameHeight / contentHeight;
      let newScale = Math.min(1, scaleX, scaleY);

      // Usar las dimensiones efectivas para la lógica responsiva
      const responsiveWidth = effectiveWidthPx;
      const responsiveHeight = effectiveHeightPx;
      
      // Calcular el alto del cover basado en la proporción 16/9
      // alto_cover = ancho_noticecard * 9 / 16
      const coverHeight = responsiveWidth * 9 / 16;

      const base = 2.1;     // factor en W = W0
      const W0 = width;     // pivote
      const L = 0.1;         // asíntota inferior deseada
      const kUp = 0.4;       // rapidez de acercamiento a L (W > W0)
      const kDown = 0.8;     // pendiente para W < W0

      const P_NUM = 3, P_DEN = 4; // exponente 3/4

      function factorByWidth(W: number) {
        if (W >= W0) {
          const norm = (W - W0) / W0;            // ≥ 0
          const curved = L + (base - L) / (1 + kUp * Math.pow(norm, P_NUM / P_DEN));
          return curved;                          // ya tiene piso L
        } else {
          // crecimiento lineal sin techo para angostos
          return base * (1 + kDown * (W0 - W) / W0);
        }
      }

      // Uso:
      const factor = factorByWidth(responsiveWidth);
      if (responsiveHeight >= factor * coverHeight) setShowCover(true);
      else setShowCover(false);

      // Volver a medir con las líneas ajustadas
      const contentWithAdjustedLines = card.scrollHeight;
      const adjustedScaleY = frameHeight / contentWithAdjustedLines;
      newScale = Math.min(newScale, adjustedScaleY, frameWidth / contentWidth * 0.998);

      // Aplicar el contentScale manual si está definido
      // Limitar contentScale entre 0.1 y 2.0 para evitar valores extremos
      const clampedContentScale = Math.max(0.1, Math.min(2.0, contentScale));
      const finalScale = newScale * clampedContentScale;

      // Calcular el scale del botón para que no se vea afectado por contentScale
      // y aplicar el buttonScale específico
      const clampedButtonScale = Math.max(0.1, Math.min(2.0, buttonScale));
      const calculatedButtonTransform = (1 / clampedContentScale) * clampedButtonScale;
      
      setScale(finalScale);
      setButtonTransform(calculatedButtonTransform);
      canvas.style.setProperty("--scale", String(finalScale));
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calculateScale);
    });

    // Observar el frame si NO se usan dimensiones explícitas O si es resizable
    if (!width && !height || resizable) {
      resizeObserver.observe(frame);
    }
    
    // Observar cambios en el contenido interno
    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(calculateScale);
    });
    
    mutationObserver.observe(canvas, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    // Cálculo inicial
    calculateScale();

    return () => {
      // Desconectar resize observer si se estaba usando
      if (!width && !height || resizable) {
        resizeObserver.disconnect();
      }
      mutationObserver.disconnect();
    };
  }, [contentScale, buttonScale, resizable]);

  // Generar estilos dinámicos para las dimensiones explícitas con límites mínimos
  const getDimensionStyle = () => {
    const style: React.CSSProperties = {};
    
    if (width !== undefined || height !== undefined) {
      // *** APLICAR LÍMITES MÍNIMOS CORRECTOS SEGÚN UNIDAD ***
      if (width !== undefined) {
        // Convertir la dimensión definida por el usuario a píxeles
        const userWidthPx = unitToPx(width, unit);
        // Aplicar límite mínimo en píxeles
        const effectiveWidthPx = Math.max(userWidthPx, ANCHO_MINIMO);
        // Convertir de vuelta a la unidad especificada
        const effectiveWidth = pxToUnit(effectiveWidthPx, unit);
        style.width = `${effectiveWidth}${unit}`;
      }
      
      if (height !== undefined) {
        // Convertir la dimensión definida por el usuario a píxeles
        const userHeightPx = unitToPx(height, unit);
        // Aplicar límite mínimo en píxeles
        const effectiveHeightPx = Math.max(userHeightPx, ALTO_MINIMO);
        // Convertir de vuelta a la unidad especificada
        const effectiveHeight = pxToUnit(effectiveHeightPx, unit);
        style.height = `${effectiveHeight}${unit}`;
      }
    }

    // Agregar funcionalidad de resize si está habilitada
    if (resizable) {
      style.resize = 'both';
      style.overflow = 'hidden';
      style.minWidth = `${ANCHO_MINIMO}px`;
      style.minHeight = `${ALTO_MINIMO}px`;
    }
    
    return style;
  };

  return (
    <div 
      ref={frameRef} 
      className={`${styles["frame"]} ${resizable ? styles["resizable"] : ""} ${className}`}
      style={getDimensionStyle()}
    >
      <div 
        ref={canvasRef} 
        className={styles["canvas"]}
        style={{ "--scale": scale } as React.CSSProperties}
      >
        <article className={styles["card"]}>
          <header className={styles["header"]}>
            <MediaAvatar 
              src={logoSrc} 
              alt={`Logo de ${sourceName}`} 
              size={40} 
            />
            <div className={styles["info"]}>
              <Clamp 
                as="span" 
                lines={1} 
                className={styles["sourceName"]} 
                title={sourceName}
              >
                {sourceName}
              </Clamp>
              <Clamp 
                as="span" 
                lines={1} 
                className={styles["date"]} 
                title={prettyDate}
              >
                {prettyDate}
              </Clamp>
            </div>
          </header>

          {showCover && (
            <div className={styles["coverWrapper"]}>
              <NoticeCover 
                src={coverSrc} 
                alt={`Portada de ${title}`} 
                ratio={16 / 9} 
              />
            </div>
          )}

          <div className={styles["content"]}>
            <Clamp 
              as="h3" 
              lines={2} 
              className={styles["title"]} 
              title={title}
            >
              {title}
            </Clamp>
            
            <Clamp 
              as="p" 
              lines={dynamicCaptionLines} 
              className={styles["caption"]} 
              title={caption}
            >
              {caption}
            </Clamp>
            
            <Clamp 
              as="p" 
              lines={dynamicDescriptionLines} 
              className={styles["description"]} 
              title={description}
            >
              {description}
            </Clamp>

            <div 
              className={styles["actions"]}
              style={{ 
                transform: `scale(${buttonTransform})`,
                transformOrigin: 'bottom right'
              }}
            >
              <ButtonOutline 
                onClick={() => window.open(ctaHref, "_blank")}
              >
                Añadir a colección
              </ButtonOutline>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}