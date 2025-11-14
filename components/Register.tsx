"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [correo, setCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fecha = e.target.value;
    setFechaNacimiento(fecha);

    if (!fecha) {
      setErrorFecha("Por favor, ingrese su fecha de nacimiento.");
      return;
    }

    const fechaNac = new Date(fecha);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    const dia = hoy.getDate() - fechaNac.getDate();

    const edadFinal = mes < 0 || (mes === 0 && dia < 0) ? edad - 1 : edad;

    if (fechaNac > hoy) {
      setErrorFecha("Fecha de nacimiento inválida");
    } else if (edadFinal < 13) {
      setErrorFecha("Debes tener al menos 13 años para registrarte."); //No se si es necesario un mínimo de edad
    } else if (edadFinal > 120) {
      setErrorFecha("Fecha de nacimiento inválida");
    } else {
      setErrorFecha("");
    }
  };

  const handleCorreoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCorreo(value);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setErrorCorreo("Por favor ingrese su correo.");
    } else if (!regex.test(value)) {
      setErrorCorreo("Ingrese un correo válido.");
    } else {
      setErrorCorreo("");
    }
  };

  //Cuando se presiona el Botón "Registrarse", llega aquí
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorFecha || !fechaNacimiento || errorCorreo || !correo) {
      alert("Por favor, corrige los errores antes de continuar.");
      return;
    }
    alert("¡Te has registrado correctamente!");
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="font-bold bg-btn-primary-bg text-btn-primary-text hover:bg-btn-primary-hover-bg hover:text-btn-primary-hover-text border border-transparent hover:border-btn-primary-bg px-5 py-2 rounded-full transition-colors"
      >
        Registrarse
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-background/90"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                className="bg-surface-light z-50 p-10 rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-text-muted-on-light hover:text-foreground-on-light transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-3xl font-bold text-text-accent mb-2">
                  Registrarse
                </h2>
                <p className="text-text-muted-on-light mb-8">
                  Para unirse a cientos de investigadores
                </p>
                {/* Campo: Nombre */}
                <div className="mb-5">
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-foreground-on-light"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="w-full px-4 py-2.5 border border-border-muted-on-light rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light"
                  />
                </div>

                {/* Campo: Nombre de usuario */}
                <div className="mb-5">
                  <label
                    htmlFor="nombreUsuario"
                    className="block text-sm font-medium text-foreground-on-light"
                  >
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    id="nombreUsuario"
                    name="nombreUsuario"
                    className="w-full px-4 py-2.5 border border-border-muted-on-light rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light"
                  />
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Fecha de nacimiento */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <label
                        htmlFor="fechaNacimiento"
                        className="block text-sm font-medium text-foreground-on-light"
                      >
                        Fecha de nacimiento
                      </label>
                      <input
                        type="date"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        value={fechaNacimiento}
                        onChange={handleFechaChange}
                        className={`w-full px-4 py-2.5 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                          errorFecha
                            ? "border-red"
                            : "border-border-muted-on-light"
                        }`}
                      />
                      {errorFecha && (
                        <p className="text-text-danger text-[15px] mt-1">
                          {errorFecha}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="genero"
                        className="block text-sm font-medium text-foreground-on-light"
                      >
                        Género
                      </label>
                      <select
                        id="genero"
                        name="genero"
                        className="w-full px-4 py-2.5 border border-border-muted-on-light rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light"
                      >
                        <option value="">Seleccionar</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="no binario">No binario</option>
                        <option value="prefiero-no-decir">
                          Prefiero no decir
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Campo: Rol */}
                  <div className="mb-5">
                    <label
                      htmlFor="rol"
                      className="block text-sm font-medium text-foreground-on-light"
                    >
                      Rol
                    </label>
                    <select
                      id="rol"
                      name="rol"
                      className="w-full px-4 py-2.5 border border-border-muted-on-light rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light"
                    >
                      <option value="seleccionar">Seleccionar</option>
                      <option value="investigador">Investigador/a</option>
                      <option value="organización">Organización</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="correo"
                      className="block text-sm font-medium text-foreground-on-light"
                    >
                      Correo
                    </label>

                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      value={correo}
                      onChange={handleCorreoChange}
                      className={`w-full px-4 py-2.5 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                        errorCorreo
                          ? "border-primary"
                          : "border-border-muted-on-light"
                      }`}
                    />

                    {errorCorreo && (
                      <p
                        className={`text-text-danger text-[16px] mt-1 h-5 ${!errorCorreo ? "invisible" : ""}`}
                      >
                        {errorCorreo}
                      </p>
                    )}
                  </div>

                  {/* Campo: Contraseña */}
                  <div className="mb-6">
                    <label
                      htmlFor="contrasena"
                      className="block text-sm font-medium text-foreground-on-light"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="contrasena"
                        name="contrasena"
                        className="w-full px-4 py-2.5 pr-12 border border-border-muted-on-light rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-on-light hover:text-foreground-on-light transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-btn-primary-bg text-btn-primary-text font-bold py-3 px-4 rounded-full hover:bg-btn-primary-bg/70 transition-colors mt-6"
                  >
                    Registrarse
                  </button>

                  <button
                    onClick={closeModal}
                    className="block w-full text-center text-link-on-light hover:text-text-muted-on-light transition-colors mt-4"
                  >
                    Iniciar sesión
                  </button>
                </form>
              </motion.div>
              {/* Footer con texto y links (simplificado) */}
              <div
                className="text-center z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-foreground font-medium">
                  Todas tus noticias. Unificadas.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <a
                    href="/terminos"
                    className="text-link-active hover:text-link-hover transition-colors"
                  >
                    Terminos y condiciones
                  </a>
                  <span className="text-foreground">|</span>
                  <a
                    href="/privacidad"
                    className="text-link-active hover:text-link-hover transition-colors"
                  >
                    Politica de privacidad
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
