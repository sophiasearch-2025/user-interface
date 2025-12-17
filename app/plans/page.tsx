'use client';

import Planes from "@/components/Planes";
import { useState } from "react";
import { useEffect } from "react";


export default function Suscripciones() {
  const [usuario, setUsuario] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const leerUsuario = () => {
      try {
        const data = localStorage.getItem("usuarioActual");
        if (data) {
          setUsuario(JSON.parse(data));
        } else {
          setUsuario(null);
        }
      } catch (error) {
        console.error("Error al leer usuario:", error);
        setUsuario(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    leerUsuario();
    window.addEventListener("storage", leerUsuario);
    window.addEventListener("auth-change", leerUsuario);

    return () => {
      window.removeEventListener("storage", leerUsuario);
      window.removeEventListener("auth-change", leerUsuario);
    };
    
  }, []);

  return (
    <main>
      {isCheckingAuth ? (
        <p className="text-center mt-20 text-gray-400">
          Verificando sesión...
        </p>
      ) : !usuario ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-white mb-4">
            Debes iniciar sesión
          </h2>
          <a
            href="/login"
            className="text-purple-400 hover:underline"
          >
            Iniciar sesión
          </a>
        </div>
      ) : (
        <>
          <div className="text-center mt-10 mb-6">
            <h2 className="text-4xl font-bold text-white">
              Planes de Suscripción
            </h2>
          </div>
          <Planes/>
        </>
      )}
    </main>
  );
}