"use client";

import React, { useState, useEffect } from "react";
import { Save, Building2, Phone, Mail, X, Pencil } from "lucide-react";
import Link from "next/link";
import { EditableField } from "@/components/EditableField";
import { useRouter } from "next/navigation";
import { CollaboratorsSection, Collaborator } from "@/components/CollaboratorsSection";

type ViewState = "checking_auth" | "fetching_data" | "ready";

// Interfaz extendida para incluir photoURL
interface UserProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  company: string;
  photoURL?: string | null;
  collaborators: Collaborator[];
}

export default function ProfilePage() {
  const router = useRouter();

  // Estado de los datos persistidos (Base de datos)
  const [savedData, setSavedData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    company: "",
    photoURL: null,
    collaborators: [] as Collaborator[],
  });

  // Estado inicial: 'checking_auth' (No mostramos NADA todavía)
  const [viewState, setViewState] = useState<ViewState>("checking_auth");

  // Estado del formulario en edición (Borrador)
  const [formData, setFormData] = useState(savedData);
  
  // Control del modo edición global
  const [isGlobalEditing, setIsGlobalEditing] = useState(false);

  // Carga inicial de datos
  useEffect(() => {
    const fetchProfile = async () => {
      // Obtener credenciales desde localStorage
      const storedUser = localStorage.getItem("usuarioActual");
      
      if (!storedUser) {
          // Si no hay usuario, mostramos error y cortamos la ejecución
          router.push("/404");
          return; 
      }

      // Si hay usuario, pasamos a estado de carga visual
      setViewState("fetching_data");

      try {
        const usuarioObj = JSON.parse(storedUser);
        const userId = usuarioObj.id || usuarioObj._id; 

        // Solicitar perfil a la API intermedia enviando el ID
        const res = await fetch('/api/profile', {
            headers: {
                'user-id': userId
            }
        });

        if (!res.ok) throw new Error("Falló la carga");
        
        const data = await res.json();
        
        setSavedData(data.user);
        setFormData(data.user);

        const updatedUser = { ...usuarioObj, ...data.user };
        localStorage.setItem("usuarioActual", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("auth-change"));

        // Datos listos, mostramos la interfaz
        setViewState("ready");
      } catch (error) {
        console.error("Error obteniendo perfil:", error);
        router.push("/404");
      }
    };

    fetchProfile();
  }, [router]);

  // Caso 1: Comprobando autenticación o redirigiendo (Usuario no logueado)
  if (viewState === "checking_auth") {
    return null; 
  }

  // Caso 2: Usuario autenticado, pero cargando datos (Usuario logueado)
  if (viewState === "fetching_data") {
    return (
        <div className="min-h-screen bg-background text-text-primary flex items-center justify-center pt-20">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-accent"></div>
                <p className="text-xl animate-pulse font-medium">Cargando perfil...</p>
            </div>
        </div>
    );
  }

  // --- Handlers de actualización de estado ---
  
  const updateField = (field: string, newValue: string) => {
    setFormData((prev) => ({ ...prev, [field]: newValue }));
  };

  const updateCollaborator = (id: number, field: "name" | "email", val: string) => {
    setFormData((prev) => ({
      ...prev,
      collaborators: prev.collaborators.map((c) =>
        c.id === id ? { ...c, [field]: val } : c
      ),
    }));
  };

  const addCollaborator = () => {
    setFormData((prev) => ({
      ...prev,
      collaborators: [...prev.collaborators, { id: Date.now(), name: "", email: "" }],
    }));
  };

  const removeCollaborator = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      collaborators: prev.collaborators.filter((c) => c.id !== id),
    }));
  };

  // Guardar cambios en el servidor
  const handleGlobalSave = async () => {
    try {
        const storedUser = localStorage.getItem("usuarioActual");
        const userId = storedUser ? JSON.parse(storedUser).id : "0";

        const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'user-id': userId
            },
            body: JSON.stringify(formData)
        });

        if (!res.ok) throw new Error("Error al guardar en el servidor");

        // Actualizar estado local al confirmar éxito
        setSavedData(formData);
        setIsGlobalEditing(false);

        // Sincronizamos con el NavBar y el localStorage
        if (storedUser) {
            const currentUser = JSON.parse(storedUser);
            // Fusionamos los datos antiguos con los nuevos
            const updatedUser = { ...currentUser, ...formData };
            localStorage.setItem("usuarioActual", JSON.stringify(updatedUser));
            // Disparar evento para que Navbar.tsx se entere del cambio
            window.dispatchEvent(new Event("auth-change"));
        }
        console.log("Guardado exitoso en BD");
        alert("Cambios guardados correctamente");
    } catch (error) {
        console.error("Error al guardar:", error);
        alert("Hubo un error al guardar los cambios.");
    }
  };

  // Cancelar edición y revertir cambios
  const handleCancel = () => {
    setFormData(savedData);
    setIsGlobalEditing(false);
  };

  // Caso 3: Vista Principal (viewState === "ready")
  return (
    <div className="min-h-screen bg-background text-text-primary p-4 md:p-8 flex justify-center items-start pt-20">
      <div className="w-full max-w-5xl bg-surface-dark rounded-xl shadow-[0_0_15px_rgba(68,207,226,0.1)] border border-border-primary/50 overflow-hidden relative">
        
        {/* SECCIÓN PRINCIPAL DE CONTENIDO */}
        <div className="p-8 flex flex-col md:flex-row gap-8 border-b border-border-primary/20">
          
          {/* Columna Avatar (Izquierda) */}
          <div className="shrink-0 flex justify-center md:justify-start items-start">
            <div className="w-32 h-32 bg-surface-accent-dark rounded-full flex items-center justify-center border-4 border-surface-accent shadow-lg shadow-surface-accent/20">
              <span className="text-5xl text-text-primary font-medium">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
          </div>

          {/* Columna Datos de Texto (Centro - ocupa el espacio disponible) */}
          <div className="grow min-w-0 space-y-2 mt-2">
            <EditableField
              name="name"
              value={formData.name}
              isEditingMode={isGlobalEditing}
              onSave={(val) => updateField("name", val)}
              className="text-3xl font-bold wrap-break-words leading-tight"
            />
            <EditableField
              name="role"
              value={formData.role}
              isEditingMode={isGlobalEditing}
              onSave={(val) => updateField("role", val)}
              className="text-xl text-text-secondary font-medium wrap-break-words"
            />

            <div className="flex flex-col gap-3 pt-4">
              <EditableField
                name="company"
                value={formData.company}
                isEditingMode={isGlobalEditing}
                onSave={(val) => updateField("company", val)}
                icon={Building2}
                placeholder="Institución"
              />
              <EditableField
                name="email"
                value={formData.email}
                isEditingMode={isGlobalEditing}
                onSave={(val) => updateField("email", val)}
                icon={Mail}
                placeholder="Correo"
              />
              <EditableField
                name="phone"
                value={formData.phone}
                isEditingMode={isGlobalEditing}
                onSave={(val) => updateField("phone", val)}
                icon={Phone}
                placeholder="Teléfono"
              />
            </div>
          </div>

          {/* Nueva Columna de Botones (Derecha) */}
          <div className="flex flex-col gap-3 shrink-0 w-full md:w-52 md:ml-4 mt-4 md:mt-0 items-stretch">
            {isGlobalEditing ? (
              <>
                <button 
                  onClick={handleCancel}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-transparent border border-text-muted text-text-muted hover:bg-text-muted/10 rounded-full font-medium transition-colors text-sm whitespace-nowrap"
                >
                  <X className="w-4 h-4" /> Cancelar
                </button>
                <button 
                  onClick={handleGlobalSave}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-btn-secondary-bg text-btn-secondary-text hover:brightness-110 rounded-full font-bold shadow-lg shadow-cyan-500/20 transition-all text-sm whitespace-nowrap"
                >
                  <Save className="w-4 h-4" /> Guardar
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsGlobalEditing(true)}
                className="w-full flex items-center justify-center gap-2 px-5 py-2 bg-btn-primary-bg text-btn-primary-text hover:bg-btn-primary-hover-bg hover:text-btn-primary-hover-text border border-transparent hover:border-btn-primary-bg rounded-full font-medium transition-all duration-300 text-sm whitespace-nowrap"
              >
                <Pencil className="w-4 h-4" /> Modificar datos
              </button>
            )}

            <Link
              href="/profile"
              className="w-full px-6 py-2 bg-text-danger/10 text-text-danger hover:bg-text-danger hover:text-white rounded-full font-medium transition-colors text-sm flex items-center justify-center whitespace-nowrap"
               >
              Cancelar suscripción
              </Link>
          </div>

        </div>

        {/* Sección Colaboradores */}
        <CollaboratorsSection 
            collaborators={formData.collaborators}
            isEditingMode={isGlobalEditing}
            onAdd={addCollaborator}
            onRemove={removeCollaborator}
            onUpdate={updateCollaborator}
        />
      </div>
    </div>
  );
}