"use client"

import Image from "next/image";
import UserProfileMenu from "./UserProfileMenu";
import Link from "next/link";
import AuthButtons from "./AuthButtons";
import { useEffect } from "react";
import { useState } from "react";

export default function Navbar() {
  const [usuario, setUsuario] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const leerUsuario = () => {
      try {
        const data = localStorage.getItem("usuarioActual");
        if (data) {
          setUsuario(JSON.parse(data));
        } else {
          setUsuario(null);
        }
      } catch (error) {
        console.error("Error al leer usuario:", error);
        setUsuario(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    leerUsuario();
    window.addEventListener("storage", leerUsuario);
    window.addEventListener("auth-change", leerUsuario);

    return () => {
      window.removeEventListener("storage", leerUsuario);
      window.removeEventListener("auth-change", leerUsuario);
    };
    
  }, []);

  return (
    <nav className="w-full">
      <div className="flex justify-between items-center mx-auto px-8 py-4">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image
              className="h-20 w-auto"
              src="/sophia_dark_bg.png"
              width={283}
              height={90}
              alt="Sophia Search"
              priority={true}
            />
          </Link>

          <Link href="/news">
            <button className="font-bold text-link-active hover:text-link-hover transition-colors">Catálogo</button>
          </Link>
          <Link href="/plans">
            <button className="font-bold text-link-active hover:text-link-hover transition-colors">Planes</button>
          </Link>
        </div>
        {isCheckingAuth ? (
          <div className="w-[100px] h-10" />
        ) : usuario ? (
           <UserProfileMenu name={usuario.name} photoURL={usuario.photoURL} />
        ) : (
          <AuthButtons showRegister={true} showLogin={true} />
        )}
      </div>
    </nav>
  );
}
