"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheck, Eye, EyeOff, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type RegisterProps = {
  isOpen: boolean;
  onOpenAction: () => void;
  onCloseAction: () => void;
  onSwitchAction: () => void;
  className?: string;
};

export default function Register({
  isOpen,
  onOpenAction: onOpen,
  onCloseAction: onClose,
  onSwitchAction: onSwitch,
  className,
}: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    nombreUsuario: "",
    fechaNacimiento: "",
    genero: "",
    rol: "",
    correo: "",
    contrasena: "",
    aceptaTerminos: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const openModal = () => onOpen();
  const closeModal = () => {
    onClose();
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  /*HOLA a quién lea esto (HISTORIA 6)
  Hay un problema acá y es que la API se actualizó pero no quedó un registro (o yo por lo menos no lo tengo) sobre
  como cambiaron todo. La cosa es que opté por usar de ejemplo al ultimo usuario que registraron y en base a ese
  defini lo que se envia a la API.

  El registro que tenían ustedes acá pide más cosas de lo que la API esta recibiendo (porque asumo que lo crearon antes
  de la API) pero no supone un problema pues no exige realmente los otros datos (como la fecha de nacimiento, genero,etc.)
  No quise borrarlos de su interfaz pues ustedes lo hicieron y siento que si alguien de otro grupo llega a borrarles cosas
  igual es penca, asi que vean bien allí sobre lo que se pide al registrar.

  Esta función en teoría funciona, pero para evitar llenar la API de usuarios incompletos y/o malos prefiero no probar
  a lo loco.

  - Rodrigo González (del otro grupo de interfaz)
  */

  const datosParaAPI = {
    name: formData.nombre,
    username: formData.nombreUsuario,
    email: formData.correo,
    password: formData.contrasena,
    role: formData.rol,
  };


  try {
    const respuesta = await fetch("http://172.105.21.15:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosParaAPI),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      const mensajeError =
        data.detail ||
        data.message ||
        "error al registrar usuario!!";

      setErrors({ api: mensajeError });
      alert("error: " + mensajeError);
    } else {
      alert("Usuario registrado. por favor, inicia sesión!");
      closeModal();
    }
  } catch (error) {
    setErrors({ api: "Error de conexión con el server" });
    alert("Ocurrió un error de conexión!")
  }

  setIsLoading(false);
};


  return (
    <div>
      <button
        onClick={openModal}
        className={`font-bold bg-btn-primary-bg text-btn-primary-text hover:bg-btn-primary-hover-bg hover:text-btn-primary-hover-text border border-transparent hover:border-btn-primary-bg px-5 py-2 rounded-full transition-colors ${className}`}
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
                className="bg-surface-light z-50 p-10 rounded-2xl shadow-lg w-lg max-w-lg max-h-[90vh] overflow-y-auto relative" // Estilo del compañero
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Botón cerrar */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-text-muted-on-light hover:text-foreground-on-light transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <h2 className="text-3xl font-bold text-text-accent mb-2">Registrarse</h2>
                <p className="text-text-muted-on-light mb-8">Para unirse a cientos de investigadores</p>

                {/*<form> */}
                <form onSubmit={handleSubmit}>
                  {/* Nombre */}
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
                      className={`w-full px-4 h-11 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                        errors.nombre ? "border-text-danger" : "border-border-muted-on-light"
                      }`}
                    />
                    {errors.nombre && <p className="text-text-danger text-sm font-medium mt-1">{errors.nombre}</p>}
                  </div>

                  {/*Nombre de usuario */}
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
                      className={`w-full px-4 h-11 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                        errors.nombreUsuario ? "border-text-danger" : "border-border-muted-on-light"
                      }`}
                    />
                    {errors.nombreUsuario && (
                      <p className="text-text-danger text-sm font-medium mt-1">{errors.nombreUsuario}</p>
                    )}
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
                        max={new Date().toISOString().split("T")[0]} // Buena idea del compañero
                        className={`w-full px-4 h-11 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                          errors.fechaNacimiento ? "border-text-danger" : "border-border-muted-on-light"
                        }`}
                      />
                      {/* Mensaje de error de fecha */}
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
                        className={`w-full px-4 h-11 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                          errors.genero ? "border-text-danger" : "border-border-muted-on-light"
                        }`}
                      >
                        <option value="">Seleccionar</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="no binario">No binario</option>
                        <option value="prefiero-no-decir">Prefiero no decir</option>
                      </select>
                      {/* Mensaje de error de genero */}
                    </div>
                  </div>

                  {/* Contenedor unificado para errores de Fecha y Género */}
                  {(errors.fechaNacimiento || errors.genero) && (
                    <div className="mb-5 -mt-4">
                      {errors.fechaNacimiento && (
                        <p className="text-text-danger text-sm font-medium">{errors.fechaNacimiento}</p>
                      )}
                      {errors.genero && <p className="text-text-danger text-sm font-medium">{errors.genero}</p>}
                    </div>
                  )}

                  {/* Rol */}
                  <div className="mb-5">
                    <label htmlFor="rol" className="block text-sm font-medium text-foreground-on-light">
                      Rol
                    </label>
                    <select
                      id="rol"
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                      className={`w-full px-4 h-11 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                        errors.rol ? "border-text-danger" : "border-border-muted-on-light"
                      }`}
                    >
                      <option value="seleccionar">Seleccionar</option>
                      <option value="investigador">Investigador/a</option>
                      <option value="organización">Organización</option>
                      <option value="otro">Otro</option>
                    </select>
                    {errors.rol && <p className="text-text-danger text-sm font-medium mt-1">{errors.rol}</p>}
                  </div>

                  {/* Correo */}
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
                      className={`w-full px-4 h-11 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                        errors.correo ? "border-text-danger" : "border-border-muted-on-light"
                      }`}
                    />
                    {errors.correo && <p className="text-text-danger text-sm font-medium mt-1 h-5">{errors.correo}</p>}
                  </div>

                  {/* Contraseña */}
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
                        className={`w-full px-4 h-11 pr-12 border rounded-full focus:ring-text-accent focus:border-text-accent text-foreground-on-light ${
                          errors.contrasena ? "border-text-danger" : "border-border-muted-on-light"
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
                    {errors.contrasena && (
                      <p className="text-text-danger text-sm font-medium mt-1">{errors.contrasena}</p>
                    )}
                  </div>

                  {/* Terminos y condiciones */}
                  <label className="flex items-center cursor-pointer gap-2 mb-5 mt-4">
                    <input
                      type="checkbox"
                      id="aceptaTerminos"
                      name="aceptaTerminos"
                      checked={formData.aceptaTerminos}
                      onChange={handleChange}
                      className="peer hidden"
                    />

                    <CircleCheck
                      className={`h-5 w-5 rounded-full border-2 transition-colors
                                ${errors.aceptaTerminos ? "border-text-danger" : "border-border-muted-on-light"}
                                peer-checked:bg-text-accent peer-checked:border-text-accent`}
                    />

                    <div className="text-sm text-foreground-on-light">
                      Acepto los{" "}
                      <Link href="/terms" className="text-link-on-light hover:underline" target="_blank">
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="/privacy" className="text-link-on-light hover:underline" target="_blank">
                        política de privacidad
                      </Link>
                    </div>
                  </label>

                  {errors.api && <p className="text-text-danger text-sm font-medium text-center mb-4">{errors.api}</p>}

                  {/* Botones */}
                  <button
                    type="submit"
                    className="w-full bg-btn-primary-bg text-btn-primary-text font-bold py-3 px-4 rounded-full hover:bg-btn-primary-bg/70 transition-colors"
                  >
                    {isLoading ? "Registrando..." : "Registrarse"}
                  </button>
                  <button
                    type="button"
                    onClick={onSwitch}
                    className="block w-full text-center text-link-on-light hover:text-text-muted-on-light transition-colors mt-4"
                  >
                    Iniciar sesión
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
