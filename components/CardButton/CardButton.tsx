"use client";
import React from "react";
import styles from "./CardButton.module.css";

type CardButtonVariant = "outline" | "filled";

interface CardButtonProps {
  variant?: CardButtonVariant; // "outline" | "filled" - por defecto "outline"
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const CardButton: React.FC<CardButtonProps> = ({
  variant = "outline", // Por defecto es "outline"
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const buttonClass = variant === "filled" 
    ? styles["button-fullcolor"] 
    : styles["button-outline"];

  return (
    <button
      type={type}
      className={`${buttonClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CardButton;