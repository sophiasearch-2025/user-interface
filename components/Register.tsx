"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="font-bold bg-btn-primary-bg text-link-hover hover:bg-btn-primary-hover-bg hover:text-btn-primary-hover-text border border-transparent hover:border-btn-primary-bg px-5 py-2 rounded-full transition-colors"
      >
        Registrarse
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d1d1b]/80"
          onClick={closeModal}
        >
          <div className="flex flex-col items-center gap-6">
            <div
              className="bg-[#f2f2f2] z-50 p-10 rounded-2xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold  text-[#532ece] mb-2">
                Registrarse
              </h2>
              <p className=" text-[#818181] mb-8">
                Para unirse a cientos de investigadores
              </p>

              {/* Campo: Nombre */}
              <div className="mb-5">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-[#1d1d1b]"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full px-4 py-2.5 border border-[#1d1d1b] rounded-full focus:ring-[#532ece] focus:border-[#532ece] text-[#1d1d1b]"
                />
              </div>

              {/* Campo: Nombre de usuario */}
              <div className="mb-5">
                <label
                  htmlFor="nombreUsuario"
                  className="block text-sm font-medium text-[#1d1d1b]"
                >
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  id="nombreUsuario"
                  name="nombreUsuario"
                  className="w-full px-4 py-2.5 border border-[#1d1d1b] rounded-full focus:ring-[#532ece] focus:border-[#532ece] text-[#1d1d1b]"
                />
              </div>

              {/* Fecha de nacimiento y Género en la misma fila */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                {/* Campo: Fecha de nacimiento */}
                <div>
                  <label
                    htmlFor="fechaNacimiento"
                    className="block text-sm font-medium text-[#1d1d1b]"
                  >
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    className="w-full px-4 py-2.5 border border-[#1d1d1b] rounded-full focus:ring-[#532ece] focus:border-[#532ece] text-[#1d1d1b]"
                  />
                </div>

                {/* Campo: Género */}
                <div>
                  <label
                    htmlFor="genero"
                    className="block text-sm font-medium text-[#1d1d1b]"
                  >
                    Género
                  </label>
                  <select
                    id="genero"
                    name="genero"
                    className="w-full px-4 py-2.5 border border-[#1d1d1b] rounded-full focus:ring-[#532ece] focus:border-[#532ece] text-[#1d1d1b]"
                  >
                    <option value="">Seleccionar</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="no binario">No binario</option>
                    <option value="prefiero-no-decir">Prefiero no decir</option>
                  </select>
                </div>
              </div>

              {/* Campo: Rol */}
              <div className="mb-5">
                <label
                  htmlFor="rol"
                  className="block text-sm font-medium text-[#1d1d1b]"
                >
                  Rol
                </label>
                <select
                  id="rol"
                  name="rol"
                  className="w-full px-4 py-2.5 border border-[#1d1d1b] rounded-full focus:ring-[#532ece] focus:border-[#532ece] text-[#1d1d1b]"
                >
                  <option value="seleccionar">Seleccionar</option>
                  <option value="investigador">Investigador/a</option>
                  <option value="organización">Organización</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Campo: Correo */}
              <div className="mb-5">
                <label
                  htmlFor="correo"
                  className="block text-sm font-medium text-[#1d1d1b]"
                >
                  Correo
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  className="w-full px-4 py-2.5 border border-[#1d1d1b] rounded-full focus:ring-[#532ece] focus:border-[#532ece] text-[#1d1d1b]"
                />
              </div>

              {/* Campo: Contraseña */}
              <div className="mb-6">
                <label
                  htmlFor="contrasena"
                  className="block text-sm font-medium text-[#1d1d1b]"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="contrasena"
                    name="contrasena"
                    className="w-full px-4 py-2.5 pr-12 border border-[#1d1d1b] rounded-full focus:ring-[#532ece] focus:border-[#532ece] text-[#1d1d1b]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#818181] hover:text-[#1d1d1b] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Botones */}
              <button
                type="submit"
                className="w-full bg-btn-primary-bg text-[#f2f2f2] font-bold py-3 px-4 rounded-full hover:bg-[#532ece]/70 transition-colors mt-6"
              >
                Registrarse
              </button>
              <button
                onClick={closeModal}
                className="block w-full text-center text-[#532ece] hover:text-[#818181] transition-colors mt-4"
              >
                Iniciar sesión
              </button>
            </div>
            {/*Footer con texto y links */}
            <div
              className="text-center z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[#f2f2f2] font-medium">
                Todas tus noticias. Unificadas.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <a
                  href="/terminos"
                  className="text-[#44cfe2] hover:text-[#f2f2f2] transition-colors"
                >
                  Terminos y condiciones
                </a>
                <span className="text-[#f2f2f2]">|</span>
                <a
                  href="/privacidad"
                  className="text-[#44cfe2] hover:text-[#f2f2f2] transition-colors"
                >
                  Politica de privacidad
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
