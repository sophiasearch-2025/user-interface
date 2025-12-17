'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlanPremium() {
  const router = useRouter();
  const [archivo, setArchivo] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!archivo) {
      return;
    }

    router.push('/plans/premium/success');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setArchivo(files[0]);
    }
  };

  return (
    <main>
      <div className="text-center mt-10 mb-10">
        <h2 className="relative inline-block text-4xl font-bold tracking-wide text-white">
          <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#C084FC] bg-clip-text text-transparent">
            Suscripción Sophia Search Premium
          </span>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent rounded-full"></div>
        </h2>

        <p className="mt-5 text-gray-400 text-lg max-w-xl mx-auto">
          Completa el proceso y sube tu comprobante para activar el plan
        </p>
      </div>

      <div className="relative bg-gradient-to-b from-[#2e0060] to-[#120030] border border-purple-700 shadow-[0_0_25px_rgba(150,80,255,0.5)] hover:shadow-[0_0_45px_rgba(160,80,255,0.9)] rounded-2xl p-8 w-full max-w-xs transition-all duration-500 mx-auto">
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
      </div>

      <form
        onSubmit={handleSubmit}
        className="px-6 pb-8 space-y-6 mt-10 max-w-md mx-auto"
      >
        <div>
          <label
            htmlFor="proof-upload"
            className="block text-sm font-semibold uppercase tracking-widest text-[#F2F2F2]"
          >
            Comprobante de pago (PNG, JPG o PDF)
          </label>

          <input
            id="proof-upload"
            type="file"
            accept="image/png,image/jpeg,application/pdf"
            onChange={handleFileChange}
            className="mt-3 w-full cursor-pointer rounded-lg border border-dashed border-[#F2F2F2]/60 bg-[#241A44] px-4 py-4 text-sm text-[#F2F2F2] focus:outline-none focus:ring-2 focus:ring-[#FF5C8A]"
          />

          <p className="mt-5 text-xs text-[#F2F2F2]/60">
            El archivo será revisado manualmente; recibirás confirmación por correo.
          </p>
        </div>

        <button
          type="submit"
          disabled={!archivo}
          className="botonsus1 text-lg mt-4 px-3 py-2 w-full max-w-xs mx-auto block disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enviar comprobante
        </button>
      </form>

      <div className="mb-50"></div>
    </main>
  );
}
