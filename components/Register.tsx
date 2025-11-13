"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    nombreUsuario: "",
    fechaNacimiento: "",
    genero: "",
    rol: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  // Estado para los errores
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setErrors({}); // Limpiar errores al cerrar
  };

  // Función para manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Actualiza el valor del campo
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpia el error de este campo si el usuario empieza a corregirlo
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Función de validación y envío
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    const newErrors: { [key: string]: string } = {};


    // Validamos campos vacíos
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.nombreUsuario.trim()) newErrors.nombreUsuario = "El usuario es obligatorio.";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha es obligatoria.";
    if (!formData.genero) newErrors.genero = "Selecciona un género.";
    if (!formData.rol || formData.rol === "seleccionar") newErrors.rol = "Selecciona un rol.";
    if (!formData.contrasena) newErrors.contrasena = "La contraseña es obligatoria.";
    
    // Validamos contraseña (mínimo 6 caracteres)
    if (formData.contrasena && formData.contrasena.length < 6) {
      newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres.";
    }
    // Validamos que las contraseñas coincidan
    if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Las contraseñas no coinciden.";
    }
    // Validamos correo
    if (!formData.correo) {
      newErrors.correo = "El correo es obligatorio.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.correo)) {
        newErrors.correo = "El formato del correo no es válido.";
      }
    }


    // Si hay errores, los guardamos y no enviamos nada
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Formulario Válido. Datos listos para enviar:", formData);
      alert("Registro de usuario exitoso.");
    }
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
            {/* Agregamos la etiqueta <form> para manejar el submit */}
            <form 
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()} 
            >
              <div
                className="bg-surface-light z-50 p-10 rounded-2xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-3xl font-bold text-text-accent mb-2">Registrarse</h2>
                <p className="text-text-muted-on-light mb-8">Para unirse a cientos de investigadores</p>

                {/* Campo: Nombre */}
                <div className="mb-5">
                  <label htmlFor="nombre" className="block text-sm font-medium text-foreground-on-light">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                      errors.nombre ? "border-red-500" : "border-border-muted-on-light"
                    }`}
                  />
                  {errors.nombre && <p className="text-red-500 text-xs mt-1 ml-2">{errors.nombre}</p>}
                </div>

                {/* Campo: Nombre de usuario */}
                <div className="mb-5">
                  <label htmlFor="nombreUsuario" className="block text-sm font-medium text-foreground-on-light">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    id="nombreUsuario"
                    name="nombreUsuario"
                    value={formData.nombreUsuario}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                      errors.nombreUsuario ? "border-red-500" : "border-border-muted-on-light"
                    }`}
                  />
                  {errors.nombreUsuario && <p className="text-red-500 text-xs mt-1 ml-2">{errors.nombreUsuario}</p>}
                </div>

                {/* Fecha de nacimiento y Género */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-foreground-on-light">
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                        errors.fechaNacimiento ? "border-red-500" : "border-border-muted-on-light"
                      }`}
                    />
                    {errors.fechaNacimiento && <p className="text-red-500 text-xs mt-1">{errors.fechaNacimiento}</p>}
                  </div>

                  <div>
                    <label htmlFor="genero" className="block text-sm font-medium text-foreground-on-light">
                      Género
                    </label>
                    <select
                      id="genero"
                      name="genero"
                      value={formData.genero}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                        errors.genero ? "border-red-500" : "border-border-muted-on-light"
                      }`}
                    >
                      <option value="">Seleccionar</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="no binario">No binario</option>
                      <option value="prefiero-no-decir">Prefiero no decir</option>
                    </select>
                    {errors.genero && <p className="text-red-500 text-xs mt-1">{errors.genero}</p>}
                  </div>
                </div>

                {/* Campo: Rol */}
                <div className="mb-5">
                  <label htmlFor="rol" className="block text-sm font-medium text-foreground-on-light">
                    Rol
                  </label>
                  <select
                    id="rol"
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                      errors.rol ? "border-red-500" : "border-border-muted-on-light"
                    }`}
                  >
                    <option value="seleccionar">Seleccionar</option>
                    <option value="investigador">Investigador/a</option>
                    <option value="organización">Organización</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.rol && <p className="text-red-500 text-xs mt-1 ml-2">{errors.rol}</p>}
                </div>

                {/* Campo: Correo */}
                <div className="mb-5">
                  <label htmlFor="correo" className="block text-sm font-medium text-foreground-on-light">
                    Correo
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                      errors.correo ? "border-red-500" : "border-border-muted-on-light"
                    }`}
                  />
                  {errors.correo && <p className="text-red-500 text-xs mt-1 ml-2">{errors.correo}</p>}
                </div>

                {/* Campo: Contraseña */}
                <div className="mb-6">
                  <label htmlFor="contrasena" className="block text-sm font-medium text-foreground-on-light">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="contrasena"
                      name="contrasena"
                      value={formData.contrasena}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 pr-12 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                        errors.contrasena ? "border-red-500" : "border-border-muted-on-light"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-on-light hover:text-foreground-on-light transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.contrasena && <p className="text-red-500 text-xs mt-1 ml-2">{errors.contrasena}</p>}
                </div>
                {/* Campo: Confirmar Contraseña */}
                <div className="mb-6">
                  <label htmlFor="confirmarContrasena" className="block text-sm font-medium text-foreground-on-light">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmarContrasena"
                    name="confirmarContrasena" // Importante: debe coincidir con el estado
                    value={formData.confirmarContrasena}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                      errors.confirmarContrasena ? "border-red-500" : "border-border-muted-on-light"
                    }`}
                  />
                  {errors.confirmarContrasena && <p className="text-red-500 text-xs mt-1 ml-2">{errors.confirmarContrasena}</p>}
                </div>
                {/* Botones */}
                <button
                  type="submit"
                  className="w-full bg-btn-primary-bg text-btn-primary-text font-bold py-3 px-4 rounded-full hover:bg-btn-primary-bg/70 transition-colors mt-6"
                >
                  Registrarse
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="block w-full text-center text-link-on-light hover:text-text-muted-on-light transition-colors mt-4"
                >
                  Iniciar sesión
                </button>
              </div>
              
              {/*Footer */}
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
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
