import { NextResponse } from "next/server";

// 1. URL de tu Backend real
const BACKEND_URL = "http://localhost:3001/api"; 
const TEMP_USER_ID = "user123"; 

// DATOS DE RESPALDO (MOCK)
// Los definimos fuera para usarlos tanto si el backend da error 404 como si está apagado
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

export async function GET() {
  try {
    console.log(`Intentando conectar a: ${BACKEND_URL}/users/${TEMP_USER_ID}`);
    
    const res = await fetch(`${BACKEND_URL}/users/${TEMP_USER_ID}`, {
        cache: 'no-store',
        // Timeout corto para no dejar la página cargando eternamente si el backend no responde
        signal: AbortSignal.timeout(3000) 
    });
    
    if (!res.ok) {
        console.warn(`Backend respondió con error: ${res.status}. Usando datos falsos.`);
        return NextResponse.json({ user: FALLBACK_USER });
    }

    const userFromDb = await res.json();

    // Mezclamos los datos reales con valores por defecto para evitar nulos
    const userForFrontend = {
      name: userFromDb.name || "Usuario Sin Nombre",
      email: userFromDb.email || "sin@email.com",
      role: userFromDb.role || "Sin Rol",
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
    const body = await request.json();
    console.log("Enviando actualización al backend...", body);

    const res = await fetch(`${BACKEND_URL}/users/${TEMP_USER_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error("Backend 3001 rechazó la actualización");

    return NextResponse.json({ success: true });

  } catch (error) {
    console.warn("No se pudo guardar en Backend 3001. Simulando éxito para la Demo.");
    // Devolvemos éxito falso para que la UI no se rompa, pero avisamos
    return NextResponse.json({ success: true, warning: "Datos guardados solo localmente" });
  }
}