'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type PlanType = "free" | "premium" | null;

export default function Planes() {
  const router = useRouter();

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);

  const openPopup = (planType: PlanType): void => {
    setSelectedPlan(planType);
    setShowPopup(true);
  };

  const closePopup = (): void => {
    setShowPopup(false);
    setTermsAccepted(false);
    setSelectedPlan(null);
  };

  const handleAcceptTerms = (): void => {
    if (termsAccepted && selectedPlan === "premium") {
      router.push("/plans/premium");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 py-10">
      {/* Plan gratuito */}
      <div className="relative bg-gradient-to-b from-[#f9f9f9] to-[#e9e9e9] border border-blue-400 shadow-[0_0_25px_rgba(80,150,255,0.5)] hover:shadow-[0_0_45px_rgba(80,150,255,0.9)] rounded-2xl p-8 w-full max-w-xs transition-all duration-500">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
          Plan Gratuito
        </h3>

        <ul className="text-gray-700 text-sm space-y-3 mb-6">
          <li>✔ Acceso limitado a funcionalidades básicas</li>
          <li>✔ Sin costo mensual</li>
          <li>✔ Ideal para usuarios nuevos</li>
        </ul>

        <p className="text-center text-gray-500 text-xs mb-4">
          Perfecto para probar las funciones esenciales de Sophia sin compromiso.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => openPopup("free")}
            className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white font-semibold py-2 px-6 rounded-xl shadow-[0_0_12px_rgba(59,130,246,0.7)] hover:shadow-[0_0_25px_rgba(59,130,246,1)] hover:scale-105 transition-all duration-300"
          >
            Obtener Sophia Gratuito
          </button>
        </div>
      </div>

      {/* Plan premium */}
      <div className="relative bg-gradient-to-b from-[#2e0060] to-[#120030] border border-purple-700 shadow-[0_0_25px_rgba(150,80,255,0.5)] hover:shadow-[0_0_45px_rgba(160,80,255,0.9)] rounded-2xl p-8 w-full max-w-xs transition-all duration-500">
        <h3 className="text-2xl font-semibold text-white mb-4 text-center">
          Sophia Premium
        </h3>

        <ul className="text-gray-200 text-sm space-y-3 mb-6">
          <li>✔ Exportación de datos en CSV</li>
          <li>✔ Filtros avanzados con IA</li>
          <li>✔ Fuentes internacionales</li>
          <li>✔ Soporte prioritario</li>
          <li>✔ Estadísticas avanzadas</li>
          <li>✔ Actualizaciones semanales</li>
        </ul>

        <div className="border-t border-purple-800 mb-6 opacity-50"></div>

        <p className="text-center text-purple-300 text-xs mb-4">
          Plan anual $93.999
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => openPopup("premium")}
            className="bg-gradient-to-r from-[#7e22ce] to-[#a855f7] text-white font-semibold py-2 px-6 rounded-xl shadow-[0_0_12px_rgba(147,51,234,0.7)] hover:shadow-[0_0_25px_rgba(147,51,234,1)] hover:scale-105 transition-all duration-300"
          >
            Obtener Sophia Premium
          </button>
        </div>
      </div>

      {/* Popup TyC */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="relative max-w-3xl w-full mx-4 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl shadow-2xl border border-white/10 p-6 overflow-hidden">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-white tracking-wide">
              Términos y Condiciones
            </h2>

            {/* Contenido con scroll */}
            <div className="terms-content overflow-y-auto max-h-[60vh] pr-2 text-gray-300 leading-relaxed text-sm space-y-5">
              <p>
                <strong>1. Aceptación de los Términos</strong><br />
                Al acceder, utilizar o descargar contenido mediante el sistema de noticias, el usuario declara haber leído, comprendido y aceptado íntegramente los presentes Términos y Condiciones. En caso de no estar de acuerdo, deberá abstenerse de utilizar la plataforma.
              </p>
              <p>
                <strong>2. Descripción del Servicio</strong><br />
                El sistema proporciona acceso para visualizar y descargar noticias provenientes de diversas fuentes digitales. La aplicación actúa exclusivamente como un intermediario tecnológico, sin alterar, almacenar ni modificar el contenido original publicado por los medios externos.
              </p>
              <p>
                <strong>3. Propiedad Intelectual</strong><br />
                Todos los contenidos disponibles a través del sistema son propiedad de sus respectivos autores o medios de comunicación. La plataforma no reclama derechos de propiedad intelectual sobre dicho material, y su uso está sujeto a las condiciones y políticas establecidas por cada fuente.
              </p>
              <p>
                <strong>4. Uso Autorizado</strong><br />
                El sistema podrá ser utilizado únicamente con fines personales, académicos o informativos. Queda expresamente prohibido el uso con fines comerciales, la redistribución masiva o cualquier modificación del contenido descargado.
              </p>
              <p>
                <strong>5. Fuentes con Restricción o Suscripción</strong><br />
                Cuando una fuente requiera autenticación, suscripción o pago, el usuario deberá contar con una cuenta válida o los permisos correspondientes. El sistema no elude ni reemplaza mecanismos de acceso restringido implementados por las fuentes originales.
              </p>
              <p>
                <strong>6. Responsabilidad del Usuario</strong><br />
                El usuario es el único responsable del uso que realice de la información descargada. Asimismo, deberá verificar la validez de los derechos de autor y condiciones de uso de cada medio. El equipo desarrollador no se hace responsable por el uso indebido o distribución no autorizada del contenido.
              </p>
              <p>
                <strong>7. Enlaces Externos</strong><br />
                Los enlaces o recursos externos pertenecen a terceros. La plataforma no controla ni garantiza la disponibilidad, exactitud o legalidad del contenido enlazado.
              </p>
              <p>
                <strong>8. Modificación de los Términos</strong><br />
                El equipo de desarrollo podrá actualizar estos términos en cualquier momento, informando los cambios a través de la aplicación o de la documentación oficial del proyecto.
              </p>
              <p>
                <strong>9. Limitación de Responsabilidad</strong><br />
                El sistema se ofrece “tal cual” y sin garantías. El equipo desarrollador no será responsable por daños directos o indirectos derivados del uso, descarga o acceso al contenido externo.
              </p>
            </div>

            <div className="flex items-center mt-6 space-x-3">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="w-5 h-5 accent-blue-500 cursor-pointer"
              />
              <label className="text-gray-200 text-sm select-none">
                Acepto los términos y condiciones
              </label>
            </div>

            <button
              onClick={handleAcceptTerms}
              disabled={!termsAccepted}
              className={`mt-5 w-full py-2.5 rounded-xl font-medium transition-all duration-200 ${
                termsAccepted
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
