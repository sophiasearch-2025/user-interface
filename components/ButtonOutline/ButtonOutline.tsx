"use client"; // Necesita de 'onClick'
import React from "react";
import Clamp from "../NoticeCards/Clamp";
import styles from "./ButtonOutline.module.css";

type Props = {
  children: React.ReactNode;            // Contenido interno del botón (texto, iconos, etc.)
  onClick?: () => void;                 // Función a ejecutar al hacer clic
  type?: "button" | "submit" | "reset"; // Tipo de botón HTML
  disabled?: boolean;                   // Desactiva el botón e impide interacción
  className?: string;                   // Clases CSS adicionales para el contenedor             
};

export default function ButtonOutline({
  // Valores por defecto de los Props
  children,
  onClick,
  type = "button",
  disabled = false,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles["button-outline"]}
    >
      <Clamp as="span" lines={1}>
        {children}
      </Clamp>
    </button>
  );
}