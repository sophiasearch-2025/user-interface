"use client";
import { useState, useEffect } from "react";

// Definimos usuarios de prueba
const MOCK_USERS = {
  free: { name: "Pepe Free", role: "free", initial: "P" },
  premium: { name: "Ana Premium", role: "premium", initial: "A" },
};

export function useMockSession() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    //Se lee de localstorage
    const storedRole = localStorage.getItem("demo_role");
    if (storedRole && (storedRole === "free" || storedRole === "premium")) {
      setUser(MOCK_USERS[storedRole]);
    } else {
      // Por defecto  usuario es FREE
      setUser(MOCK_USERS.free); 
    }
  }, []);

  const loginAs = (role: "free" | "premium") => {
    localStorage.setItem("demo_role", role);
    setUser(MOCK_USERS[role]);
    window.location.reload(); 
  };

  return { user, loginAs };
}