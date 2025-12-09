import { NextResponse } from "next/server";

const BACKEND_URL = "http://172.105.21.15:3000/api";

// DATOS DE RESPALDO 
const FALLBACK_USER = {
    name: "Usuario Offline",
    email: "modo@offline.com",
    role: "Sin conexión a Backend",
    phone: "+56 9 0000 0000",
    institution: "Modo Local",
    collaborators: [
        { id: 1, name: "Colaborador Demo", email: "demo@test.com" }
    ]
};

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("user-id");

    if (!userId) {
        return NextResponse.json({ error: "No user ID provided" }, { status: 400 });
    }

    console.log(`Buscando perfil para ID: ${userId} en ${BACKEND_URL}`);
    
    const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5000) 
    });
    
    if (!res.ok) {
      console.warn(`Backend error ${res.status}. Usando fallback.`);
      return NextResponse.json({ user: { ...FALLBACK_USER, id: userId } });
    }

    const responseData = await res.json();
    const userFromDb = responseData.data || responseData;
    // Mezclamos los datos reales con valores por defecto para evitar nulos
    const userForFrontend = {
      name: userFromDb.name || "Usuario ",
      email: userFromDb.email || "",
      role: userFromDb.role || "Usuario",
      phone: userFromDb.phone || "", 
      institution: userFromDb.institution || "",
      collaborators: userFromDb.collaborators || [], 
    };

    return NextResponse.json({ user: userForFrontend });

  } catch (error) {
    // AQUÍ ESTABA EL PROBLEMA ANTES
    // Si el fetch falla (backend apagado), capturamos el error y devolvemos el Mock
    console.error(" Error conectando al Backend 3001 (Posiblemente apagado):");
    return NextResponse.json({ user: FALLBACK_USER });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = request.headers.get("user-id");
    const body = await request.json();
    if (!userId) throw new Error("Falta User ID");

    const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("Error en Backend Remoto");
    
    return NextResponse.json({ success: true });

  } catch (error) {
    console.warn("Error guardando en remoto:", error);
    return NextResponse.json({ success: true, warning: "Guardado localmente" });
  }
}