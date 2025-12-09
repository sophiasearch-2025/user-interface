"use client";

import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

interface EditableFieldProps {
  value: string;
  name: string;
  onSave: (value: string) => void;
  isEditingMode: boolean; // 👈 Nueva prop para controlar el modo global
  icon?: React.ElementType;
  placeholder?: string;
  className?: string;
}

export const EditableField = ({
  value,
  onSave,
  isEditingMode,
  icon: Icon,
  placeholder,
  className = "",
}: EditableFieldProps) => {
  // Estado interno para saber si este campo específico está siendo escrito
  const [isActive, setIsActive] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  // Sincronizar valor si cambia desde fuera
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsActive(false);
    if (tempValue !== value) {
      onSave(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBlur();
    if (e.key === "Escape") {
      setTempValue(value);
      setIsActive(false);
    }
  };

  // Si NO estamos en modo edición global, mostramos solo texto plano (sin cursor, sin lápiz)
  if (!isEditingMode) {
    return (
      <div className={`flex items-center gap-3 py-1 ${className}`}>
        {Icon && <Icon className="w-4 h-4 text-text-muted mt-1 shrink-0" />}
        <span className={value ? "text-text-primary" : "text-text-muted italic"}>
          {value || placeholder}
        </span>
      </div>
    );
  }

  // Si ESTAMOS en modo edición global:
  return (
    <div className={`relative group flex items-center gap-3 py-1 ${className}`}>
      {Icon && <Icon className="w-4 h-4 text-text-muted mt-1 shrink-0" />}

      <div className="flex-grow relative min-w-0">
        {isActive ? (
          // --- MODO ACTIVO (Escribiendo) ---
          <input
            autoFocus
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full bg-background text-text-primary border-b border-border-primary focus:outline-none p-0 pb-1"
            placeholder={placeholder}
          />
        ) : (
          // --- MODO ESPERA (Editable pero no focado) ---
          <div
            onClick={() => setIsActive(true)}
            className="cursor-pointer flex items-center justify-between border-b border-transparent hover:border-text-muted/20 pb-1 transition-colors group/field"
          >
            <span className={`truncate ${tempValue ? "text-text-primary" : "text-text-muted italic"}`}>
              {tempValue || placeholder}
            </span>
            {/* El lápiz indica que se puede editar al hacer clic */}
            <Pencil className="w-3 h-3 text-text-secondary opacity-0 group-hover/field:opacity-100 transition-opacity ml-2 shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
};