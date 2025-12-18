import { NextResponse } from "next/server";

// URL del backend (Es un placeholder. Aunque falle, el código de abajo lo manejará)
const SEARCH_BACKEND = "http://172.105.21.15:3020/api/search";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const backendUrl = `${SEARCH_BACKEND}?${searchParams.toString()}`;

    // Configura un timeout corto para no dejar cargando eternamente si la IP no responde
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(backendUrl, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      // Si el backend responde 404, 500, etc., lo tratamos como "Sin resultados"
      console.warn(`[API BUSCAR] Backend retornó ${res.status}. Devolviendo lista vacía.`);
      return returnEmptySuccess();
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    // Si falla la conexión, devolvemos lista vacía
    console.warn("[API BUSCAR] Falló la conexión. Usando fallback vacío.", error);
    return returnEmptySuccess();
  }
}

// Helper para devolver estructura vacía válida
function returnEmptySuccess() {
  return NextResponse.json({
    success: true,
    data: [],
    paginacion: {
      total: 0,
      pagina: 1,
      limite: 10,
      totalPaginas: 1,
    },
  });
}
