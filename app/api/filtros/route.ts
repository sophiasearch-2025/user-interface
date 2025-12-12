// Lo mismo explicato en api/buscar/route.ts
import { NextResponse } from "next/server";

const FILTROS_BACKEND = "http://172.105.21.15:3000/api/filtros";

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(FILTROS_BACKEND, {
      cache: "no-store",
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[API FILTROS] Backend retornó ${res.status}. Devolviendo filtros vacíos.`);
      return returnEmptyFilters();
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.warn("[API FILTROS] Falló la conexión. Usando filtros vacíos.");
    return returnEmptyFilters();
  }
}

function returnEmptyFilters() {
    return NextResponse.json({
        success: true,
        data: {
            media_outlet: [],
            country: [],
            categoria: [],
            autor: []
        }
    });
}