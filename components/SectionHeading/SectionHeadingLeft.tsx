"use client"; // Si bien no necesita capturar eventos, no requiere del servidor.
import styles from './SectionHeadingLeft.module.css'

type Props = {
  top?: string;       // Texto superior del header
  bottom?: string;    // Texto inferior del header
  className?: string; // Clases CSS adicionales para el contenedor
};

export default function SectionHeading({
  // Valores por defecto de los Props
  top = "Últimas",
  bottom = "noticias añadidas",
  className = "",
}: Props) {
  return (
    <div className={`${styles["section-heading-left-container"]} ${className}`}>
      <span aria-hidden className={styles["section-heading-left-bar"]} />
      <h2 className={styles["section-heading-left-h2"]}>
        <span className={styles["section-heading-left-top"]}>{top}</span>
        <span className={styles["section-heading-left-bottom"]}>{bottom}</span>
      </h2>
    </div>
  );
}