"use client"; // Necesita de 'useState', 'onError'

import Image from "next/image";
import { useState } from "react";
import styles from "./NoticeCover.module.css";

type Props = {
  src?: string;       // Ruta de la imagen (opcional, usa fallback si falla o está vacía)
  alt?: string;       // Texto alternativo para accesibilidad
  ratio?: number;     // Relación de aspecto (ancho / alto, ej: 16/9)
  priority?: boolean; // Indica si la imagen debe precargarse (LCP optimization)
  className?: string; // Clases CSS adicionales para el contenedor
};

export default function NoticeCover({
  src,
  alt = "Portada",
  ratio = 16 / 9,
  priority = false,
  className = "",
}: Props) {
  // Estado para detectar si la carga de la imagen falló
  const [failed, setFailed] = useState(false);

  // Si la imagen falla o la ruta está vacía, usa imagen de 'fallback'
  const safeSrc = !failed && src?.trim() ? src : "/sophia_light_bg.png";

  return (
    <div
      className={`${styles["cover"]} ${className}`}
      style={{ aspectRatio: `${ratio}` }}
    >
      <Image
        src={safeSrc}
        alt={alt}
        fill
        sizes="(min-width:1024px) 400px, 100vw"
        className={styles["image"]}
        onError={() => setFailed(true)}
        priority={priority}
      />
    </div>
  );
}