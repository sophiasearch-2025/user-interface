"use client"; // Necesita de 'useState', 'onError'

import Image from "next/image";
import { useState } from "react";
import styles from "./MediaAvatar.module.css";

type Props = {
  src?: string;       // Ruta de la imagen (opcional, usa fallback si falla o está vacía)
  alt?: string;       // Texto alternativo para accesibilidad
  size?: number;      // Tamaño del avatar en píxeles (ancho y alto)
  className?: string; // Clases CSS adicionales para el contenedor
};

export default function MediaAvatar({
  src,
  alt = "Avatar",
  size = 40,
  className = "",
}: Props) {
  // Estado para detectar si la carga de la imagen falló
  const [failed, setFailed] = useState(false);

  // Si la imagen falla o la ruta está vacía, usa el favicon como fallback
  const safeSrc = !failed && src?.trim() ? src : "/favicon.ico";

  return (
    <div
      className={`${styles["avatar"]} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={alt ? undefined : true}
    >
      <Image
        src={safeSrc}
        alt={alt}
        fill
        sizes={`${size}px`}
        className={styles["image"]}
        onError={() => setFailed(true)}
      />
    </div>
  );
}