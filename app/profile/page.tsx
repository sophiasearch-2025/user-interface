"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Pencil, Save, X, Trash2, Plus, Building2, Phone, Mail } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // 1. ESTADO "LA VERDAD" (Datos guardados)
  const [savedData, setSavedData] = useState({
    name: "Usuario",
    role: "Estudiante investigador",
    email: "usuario@ejemplo.com",
    phone: "+56 9 8765 4321",
    institution: "Universidad Austral de Chile",
    collaborators: [
      { id: 1, name: "Ana Pérez", email: "ana@colab.com" },
      { id: 2, name: "Carlos Díaz", email: "carlos@colab.com" },
    ],
  });

  // 2. ESTADO "BORRADOR" (Edición en tiempo real)
  const [formData, setFormData] = useState(savedData);

  // Maneja cambios en campos simples (nombre, rol, etc.)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja cambios en la lista de colaboradores
  const handleCollaboratorChange = (id: number, field: "name" | "email", value: string) => {
    setFormData((prev) => ({
      ...prev,
      collaborators: prev.collaborators.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  // Agregar nuevo colaborador vacío
  const addCollaborator = () => {
    const newId = Date.now(); // ID temporal simple
    setFormData((prev) => ({
      ...prev,
      collaborators: [...prev.collaborators, { id: newId, name: "", email: "" }],
    }));
  };

  // Eliminar colaborador
  const removeCollaborator = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      collaborators: prev.collaborators.filter((c) => c.id !== id),
    }));
  };

  const handleSave = () => {
    setSavedData(formData); // Aquí iría tu petición a la API
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(savedData); // Revertir cambios
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background text-text-primary p-4 md:p-8 flex justify-center items-start pt-20">
      <div className="w-full max-w-5xl bg-surface-dark rounded-xl border border-border-primary/50 overflow-hidden">
        
        {/* ENCABEZADO Y DATOS PRINCIPALES */}
        <div className="p-8 flex flex-col md:flex-row gap-8 border-b border-border-primary/20">
            {/* Avatar */}
            <div className="flex-shrink-0 flex justify-center md:justify-start">
                <div className="w-32 h-32 bg-surface-accent-dark rounded-full flex items-center justify-center border-4 border-surface-accent shadow-lg shadow-surface-accent/20">
                    <span className="text-5xl text-text-primary font-medium">
                    {formData.name.charAt(0).toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Formulario Principal */}
            <div className="flex-grow space-y-4">
                
                {/* Nombre y Rol */}
                <div className="space-y-1">
                    <div className="relative group max-w-md">
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-none p-0 text-3xl font-bold text-text-primary focus:ring-0 focus:outline-none border-b border-border-primary/50 focus:border-border-primary placeholder-text-muted/50"
                                placeholder="Nombre completo"
                            />
                        ) : (
                            <h1 className="text-3xl font-bold text-text-primary py-1 border-b border-transparent">{savedData.name}</h1>
                        )}
                    </div>
                    
                    <div className="relative group max-w-md">
                         {isEditing ? (
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-none p-0 text-xl text-text-secondary font-medium focus:ring-0 focus:outline-none border-b border-border-primary/50 focus:border-border-primary placeholder-text-muted/50"
                                placeholder="Rol / Puesto"
                            />
                        ) : (
                            <p className="text-xl text-text-secondary font-medium py-1 border-b border-transparent">{savedData.role}</p>
                        )}
                    </div>
                </div>

                {/* Grid de Datos de Contacto */}
                <div className="grid gap-x-8 gap-y-4 pt-4">
                    
                    {/* Institución */}
                    <div className="relative group">
                        <div className="flex items-center gap-2 text-text-muted mb-1">
                            <Building2 className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-wider font-semibold">Institución</span>
                        </div>
                        {isEditing ? (
                             <input
                                type="text"
                                name="institution"
                                value={formData.institution}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-none p-0 text-base text-text-primary focus:ring-0 focus:outline-none border-b border-border-primary/50 focus:border-border-primary"
                            />
                        ) : (
                            <p className="text-base text-text-primary py-1 border-b border-transparent">{savedData.institution}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="relative group">
                         <div className="flex items-center gap-2 text-text-muted mb-1">
                            <Mail className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-wider font-semibold">Correo</span>
                        </div>
                        {isEditing ? (
                             <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-none p-0 text-base text-text-primary focus:ring-0 focus:outline-none border-b border-border-primary/50 focus:border-border-primary"
                            />
                        ) : (
                            <p className="text-base text-text-primary py-1 border-b border-transparent">{savedData.email}</p>
                        )}
                    </div>

                    {/* Teléfono */}
                    <div className="relative group">
                         <div className="flex items-center gap-2 text-text-muted mb-1">
                            <Phone className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-wider font-semibold">Teléfono</span>
                        </div>
                        {isEditing ? (
                             <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-none p-0 text-base text-text-primary focus:ring-0 focus:outline-none border-b border-border-primary/50 focus:border-border-primary"
                            />
                        ) : (
                            <p className="text-base text-text-primary py-1 border-b border-transparent">{savedData.phone}</p>
                        )}
                    </div>
                </div>
            </div>
            
             {/* Botones Acciones (Desktop: Derecha | Mobile: Abajo) */}
             <div className="flex flex-col gap-3 min-w-[200px] justify-start">
                {isEditing ? (
                    <>
                    <button onClick={handleSave} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-btn-secondary-bg hover:brightness-110 text-btn-secondary-text rounded-full font-medium transition-all text-sm shadow-md">
                        <Save className="w-4 h-4" /> Guardar
                    </button>
                    <button onClick={handleCancel} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-transparent border border-text-muted text-text-muted hover:bg-text-muted/10 rounded-full font-medium transition-colors text-sm">
                        <X className="w-4 h-4" /> Cancelar
                    </button>
                    </>
                ) : (
                    <div className = "flex flex-col gap-5">
                    <button onClick={() => setIsEditing(true)} className="px-6 py-5 bg-btn-primary-bg text-btn-primary-text hover:bg-btn-primary-hover-bg hover:text-btn-primary-hover-text border border-transparent hover:border-btn-primary-bg rounded-full font-medium transition-all duration-300 text-sm shadow-md">
                        Modificar perfil
                    </button>
                    <Link
                      href="/profile"
                      className="px-6 py-5 bg-text-danger hover:brightness-90 text-text-primary rounded-full font-medium transition-colors text-sm shadow-md inline-block text-center"
                    >
                      Cancelar suscripción
                    </Link>
                    </div>
                )}
            </div>
        </div>

        {/* SECCIÓN COLABORADORES */}
        <div className="p-8 bg-black/20">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-text-primary">Colaboradores</h3>
                {isEditing && (
                    <button onClick={addCollaborator} className="text-xs flex items-center gap-1 text-text-secondary hover:text-white transition-colors">
                        <Plus className="w-4 h-4" /> Añadir nuevo
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.collaborators.map((collab, index) => (
                    <div key={collab.id} className="group relative bg-surface-dark border border-border-muted-on-light/10 rounded-lg p-4 flex items-center gap-4 transition-all hover:border-border-primary/30">
                        {/* Avatar pequeño del colaborador */}
                        <div className="w-10 h-10 rounded-full bg-surface-accent/20 flex items-center justify-center text-text-accent font-bold shrink-0">
                            {collab.name ? collab.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        
                        <div className="flex-grow min-w-0">
                             {isEditing ? (
                                <div className="space-y-2">
                                    <input 
                                        placeholder="Nombre"
                                        className="w-full bg-transparent border-b border-border-primary/30 text-sm text-text-primary focus:outline-none focus:border-border-primary"
                                        value={collab.name}
                                        onChange={(e) => handleCollaboratorChange(collab.id, "name", e.target.value)}
                                    />
                                    <input 
                                        placeholder="Correo"
                                        className="w-full bg-transparent border-b border-border-primary/30 text-xs text-text-muted focus:outline-none focus:border-border-primary"
                                        value={collab.email}
                                        onChange={(e) => handleCollaboratorChange(collab.id, "email", e.target.value)}
                                    />
                                </div>
                             ) : (
                                <>
                                    <p className="font-medium text-text-primary truncate">{collab.name}</p>
                                    <p className="text-sm text-text-muted truncate">{collab.email}</p>
                                </>
                             )}
                        </div>

                        {/* Botón Borrar (Solo en edición) */}
                        {isEditing && (
                          
                            <button 
                                onClick={() => removeCollaborator(collab.id)}
                                className="p-2 text-text-danger hover:bg-text-danger/10 rounded-full transition-colors"
                                title="Eliminar colaborador"
                                >
                                <Trash2 className="w-4 h-4" />
                            </button>
                          
                        )}
                    </div>
                ))}
            </div>
            
            {/* Mensaje si no hay colaboradores */}
            {formData.collaborators.length === 0 && (
                <p className="text-text-muted text-sm italic text-center py-4">No hay colaboradores registrados.</p>
            )}
        </div>

      </div>
    </div>
  );
}