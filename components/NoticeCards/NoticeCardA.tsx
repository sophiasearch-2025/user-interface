"use client";
import React from "react";
import CardButton from "../CardButton/CardButton";
import MediaAvatar from "./MediaAvatar";
import NoticeCover from "./NoticeCover";
import Clamp from "./Clamp";
import { useNoticeCardLogic, convertDateToStr } from "./hooks";

import styles from "./NoticeCardA.module.css";

// *** CONSTANTES DE CONFIGURACIÓN DEL COMPONENTE ***
const ANCHO_MINIMO = 200; // px - ancho mínimo absoluto que el componente no puede cruzar
const ALTO_MINIMO = 200;  // px - alto mínimo absoluto que el componente no puede cruzar

const ANCHO_DEF = 330;    // px - ancho por defecto
const ALTO_DEF = 440;    // px - alto por defecto

// *** CONFIGURACIÓN RESPONSIVE RESPECTO AL COVER ***
const COVER_VISIBILITY_CONFIG = {
  base: 2.1,     // factor en W = W0
  W0: 330,       // pivote (ancho por defecto)
  L: 0.1,        // asíntota inferior
  kUp: 0.4,      // rapidez de acercamiento a L (W > W0)
  kDown: 0.8,    // pendiente para W < W0
};

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
  textButton?: string;
  width?: number;
  height?: number;
  unit?: 'px' | 'rem' | 'em' | 'vw' | 'vh';
  contentScale?: number;
  buttonScale?: number;
  resizable?: boolean;
  buttonVariant?: "outline" | "filled";
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
  textButton = "Añadir a colección",
  width = ANCHO_DEF,
  height = ALTO_DEF,
  unit = 'px',
  contentScale,
  buttonScale,
  resizable,
  buttonVariant = "outline",
}: Props) {
  const {
    scale,
    buttonTransform,
    showCover,
    dynamicDescriptionLines,
    dynamicCaptionLines,
    getDimensionStyle,
    frameRef,
    canvasRef,
  } = useNoticeCardLogic({
    width,
    height,
    unit,
    contentScale,
    buttonScale,
    resizable,
    minWidth: ANCHO_MINIMO,
    minHeight: ALTO_MINIMO,
    coverConfig: COVER_VISIBILITY_CONFIG,
  });

  const prettyDate = convertDateToStr(dateISO);

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
                maxLines={1} 
                className={styles["sourceName"]} 
                title={sourceName}
              >
                {sourceName}
              </Clamp>
              <Clamp 
                as="span" 
                maxLines={1} 
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
              maxLines={2} 
              className={styles["title"]} 
              title={title}
            >
              {title}
            </Clamp>
            
            <Clamp 
              as="p" 
              maxLines={dynamicCaptionLines} 
              className={styles["caption"]} 
              title={caption}
            >
              {caption}
            </Clamp>
            
            <Clamp 
              as="p" 
              maxLines={dynamicDescriptionLines} 
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
              <CardButton 
                variant={buttonVariant}
                onClick={() => window.open(ctaHref, "_blank")}
              >
                {textButton}
              </CardButton>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}