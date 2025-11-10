"use client"; // Necesita de 'onPrevious', 'onNext'

import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CarouselControls.module.css";

type Props = {
  isReady: boolean;       // Indica si los cálculos de scroll están completos
  hasOverflow: boolean;   // Determina si el contenido desborda y necesita controles
  atStart: boolean;       // Indica si el scroll está al inicio
  atEnd: boolean;         // Indica si el scroll está al final
  onPrevious: () => void; // Callback para navegar al elemento anterior
  onNext: () => void;     // Callback para navegar al elemento siguiente
  className?: string;     // Clases CSS adicionales para el contenedor
  scale?: number; 
};

export function CarouselControls({
  isReady,
  hasOverflow,
  atStart,
  atEnd,
  onPrevious,
  onNext,
  className = "",
  scale = 1,
}: Props) {
  if (!isReady || !hasOverflow) return null;
  return (
    <div className={className} style={{ ["--scale" as any]: scale }}>
      <button
        aria-label="Anterior"
        onClick={onPrevious}
        disabled={atStart}
        className={`${styles["carousel-control"]} ${styles["carousel-control-left"]}`}
      >
        <ChevronLeft />
      </button>
      <button
        aria-label="Siguiente"
        onClick={onNext}
        disabled={atEnd}
        className={`${styles["carousel-control"]} ${styles["carousel-control-right"]}`}
      >
        <ChevronRight />
      </button>
    </div>
  );
}