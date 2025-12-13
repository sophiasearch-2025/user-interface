"use client"

import Image from "next/image";
import UserProfileMenu from "./UserProfileMenu";
import { UserData, fetchUserData } from "../lib/session";
import Link from "next/link";
import AuthButtons from "./AuthButtons";
import { useEffect } from "react";
import { useState } from "react";

export default function Navbar() {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const leerUsuario = () => {
      try {
        const data = localStorage.getItem("usuarioActual");
        setUsuario(data ? JSON.parse(data) : null);
      } catch {
        setUsuario(null);
      }
    };
    leerUsuario();
    window.addEventListener("storage", leerUsuario);

    return () => window.removeEventListener("storage", leerUsuario);
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

        {usuario ? (
           <UserProfileMenu name={usuario.name}/>
        ) : (
          <AuthButtons showRegister={true} showLogin={true} />
        )}
      </div>
    </nav>
  );
}
