'use client';

import Link from "next/link";

export default function PlanPremiumSuccess() {
  return (
    <main>
      {/* Encabezado */}
      <div className="text-center mt-10 mb-10">
        <h2 className="relative inline-block text-4xl font-bold tracking-wide text-white">
          <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#C084FC] bg-clip-text text-transparent">
            Comprobante enviado
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent rounded-full"></div>
        </h2>

        <p className="mt-5 text-gray-400 text-lg max-w-xl mx-auto">
          Tu archivo fue recibido. Nuestro equipo verificará el pago y te notificará por correo.
        </p>
      </div>

      {/* Tarjeta principal */}
      <div className="relative bg-gradient-to-b from-[#2e0060] to-[#120030] border border-purple-700 shadow-[0_0_25px_rgba(150,80,255,0.5)] rounded-2xl p-8 w-full max-w-md mx-auto text-center transition-all duration-500">
        <p className="text-[#F2F2F2] text-lg mb-8">
          Mientras tanto, puedes seguir explorando nuestras funciones o regresar al panel principal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="rounded-xl bg-[#eadede] border-[3px] border-[#74D9E6] text-[#532ECE] hover:bg-[#bcbcbc] px-5 py-2 font-semibold transition">
              Ir al inicio
            </button>
          </Link>

          <Link href="/plans">
            <button className="rounded-xl border-[5px] border-[#74D9E6] text-[#532ECE] bg-gradient-to-r from-[#2eb6ce] to-[#d8dddd] px-5 py-2 font-semibold transition">
              Revisar planes
            </button>
          </Link>
        </div>
      </div>

      <div className="mb-40"></div>
    </main>
  );
}
