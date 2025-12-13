"use client";
import React from "react";
import { useRouter } from "next/navigation"; 
import CardButton from "../CardButton/CardButton";
import MediaAvatar from "./MediaAvatar";
import NoticeCover from "./NoticeCover";
import Clamp from "./Clamp";
import { useNoticeCardLogic, convertDateToStr } from "./hooks";

import styles from "./NoticeCardA.module.css";

// *** CONSTANTES DE CONFIGURACIÓN DEL COMPONENTE ***
const ANCHO_MINIMO = 200; 
const ALTO_MINIMO = 200;  

const ANCHO_DEF = 330;    
const ALTO_DEF = 440;    

const COVER_VISIBILITY_CONFIG = {
  base: 2.1,     
  W0: 330,       
  L: 0.1,        
  kUp: 0.4,      
  kDown: 0.8,    
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
  const router = useRouter(); 

  const {
    scale,
    buttonTransform,
    showCover,
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

  
  const handleButtonClick = () => {
    if (ctaHref.startsWith("/")) {
      router.push(ctaHref);
    } else {
      window.open(ctaHref, "_blank");
    }
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
              maxLines={2} 
              className={styles["caption"]} 
              title={caption}
            >
              {caption}
            </Clamp>
            
            <Clamp 
              as="p" 
              maxLines={20} 
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
                onClick={handleButtonClick} 
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