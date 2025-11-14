"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { X } from "lucide-react";

export default function Login() {
  const [isOpen, setIsOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorCorreo || !correo) {
      alert("Por favor, corrige los errores antes de continuar.");
      return;
    }
    alert("¡Te has registrado correctamente!");
  };

  return (
    <>
      <button
        onClick={openModal}
        className="font-bold bg-transparent text-link-active  transition-colors hover:text-link-hover"
      >
        Iniciar sesión
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-background/90"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                className="bg-surface-light z-50 p-10 rounded-2xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
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
                <h2 className="text-3xl font-bold text-text-accent mb-2">Iniciar sesión</h2>
                <p className="text-text-muted-on-light mb-8">Para acceder a las funcionalidades</p>

                <form onSubmit={handleSubmit}>
                  {/* Campo: Correo o nombre de usuario */}
                  <div className="mb-5">
                    <label htmlFor="correo" className="block text-sm font-medium text-foreground-on-light">
                      Correo
                    </label>

                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      value={correo}
                      onChange={handleCorreoChange}
                      className={`w-full px-4 py-2.5 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                        errorCorreo ? "border-text-danger" : "border-border-muted-on-light"
                      }`}
                    />

                    {errorCorreo && (
                      <p className={`text-text-danger text-sm font-medium mt-1 h-5 ${!errorCorreo ? "invisible" : ""}`}>
                        {errorCorreo}
                      </p>
                    )}
                  </div>

                  {/* Campo: Contraseña */}
                  <div className="mb-6">
                    <label htmlFor="contrasena" className="block text-sm font-medium text-[#1d1d1b]">
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="contrasena"
                        name="contrasena"
                        className="w-full px-4 py-2.5 border border-border-muted-on-light rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-on-light hover:text-foreground-on-light transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Botones */}
                  <button
                    type="submit"
                    className="w-full bg-btn-primary-bg text-btn-primary-text font-bold py-3 px-4 rounded-full hover:bg-btn-primary-bg/70 transition-colors mt-6"
                  >
                    Iniciar sesión
                  </button>
                </form>

                <button
                  onClick={closeModal}
                  className="block w-full text-center text-link-on-light hover:text-text-muted-on-light transition-colors mt-4"
                >
                  Registrarse
                </button>
              </motion.div>
              {/* Footer con texto y links (simplificado) */}
              <div className="text-center z-50" onClick={(e) => e.stopPropagation()}>
                <p className="text-foreground font-medium">Todas tus noticias. Unificadas.</p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <a href="/terminos" className="text-link-active hover:text-link-hover transition-colors">
                    Terminos y condiciones
                  </a>
                  <span className="text-foreground">|</span>
                  <a href="/privacidad" className="text-link-active hover:text-link-hover transition-colors">
                    Politica de privacidad
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
