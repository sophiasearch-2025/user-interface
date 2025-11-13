import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-40 gap-8">
      <div className={`flex flex-col items-baseline text-5xl`}>
        <h2 className="font-bold text-text-primary">Página no encontrada</h2>
        <h2 className="font-bold text-text-accent self-center">404</h2>
      </div>

      <Link
        className="font-bold bg-btn-primary-bg hover:bg-btn-primary-bg/90 text-btn-primary-text px-5 py-2 rounded-full transition-colors"
        href="/"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
