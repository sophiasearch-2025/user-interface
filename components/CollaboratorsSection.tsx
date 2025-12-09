"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { EditableField } from "@/components/EditableField"; // Ajusta la ruta si es necesario

export type Collaborator = {
  id: number;
  name: string;
  email: string;
};

interface CollaboratorsSectionProps {
  collaborators: Collaborator[];
  isEditingMode: boolean; // 👈 Controla visibilidad de herramientas
  onAdd: () => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, field: "name" | "email", value: string) => void;
}

export const CollaboratorsSection = ({
  collaborators,
  isEditingMode,
  onAdd,
  onRemove,
  onUpdate,
}: CollaboratorsSectionProps) => {
  return (
    <div className="p-8 bg-black/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text-primary">Colaboradores</h3>
        
        {/* Solo mostrar botón Añadir en modo edición */}
        {isEditingMode && (
          <button
            onClick={onAdd}
            className="text-xs flex items-center gap-1 text-text-secondary hover:text-white transition-colors border border-text-secondary/30 px-3 py-1 rounded-full hover:bg-text-secondary/10"
          >
            <Plus className="w-3 h-3" /> Añadir nuevo
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collaborators.map((collab) => (
          <div
            key={collab.id}
            className={`group relative bg-surface-dark border rounded-lg p-4 flex items-center gap-4 transition-all ${
              isEditingMode ? "border-border-muted-on-light/10 hover:border-border-primary/30" : "border-transparent"
            }`}
          >
            {/* Avatar pequeño */}
            <div className="w-10 h-10 rounded-full bg-surface-accent/20 flex items-center justify-center text-text-accent font-bold shrink-0">
              {collab.name ? collab.name.charAt(0).toUpperCase() : "?"}
            </div>

            <div className="flex-grow space-y-1 min-w-0">
              <EditableField
                name="collabName"
                value={collab.name}
                isEditingMode={isEditingMode}
                onSave={(val) => onUpdate(collab.id, "name", val)}
                placeholder="Nombre del colaborador"
                className="font-medium text-sm"
              />
              <EditableField
                name="collabEmail"
                value={collab.email}
                isEditingMode={isEditingMode}
                onSave={(val) => onUpdate(collab.id, "email", val)}
                placeholder="Correo electrónico"
                className="text-xs text-text-muted"
              />
            </div>

            {/* Solo mostrar basura en modo edición */}
            {isEditingMode && (
              <button
                onClick={() => onRemove(collab.id)}
                className="p-2 text-text-muted hover:text-text-danger hover:bg-text-danger/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                title="Eliminar colaborador"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {collaborators.length === 0 && (
        <p className="text-text-muted text-sm italic text-center py-4">
          No hay colaboradores registrados.
        </p>
      )}
    </div>
  );
};