"use client";

import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

type AuthButtonsProps = {
  showRegister?: boolean;
  showLogin?: boolean;
};

export default function AuthButtons({ showRegister, showLogin }: AuthButtonsProps) {
  const [modalActivo, setModalActivo] = useState<"login" | "register" | null>(null);

  return (
    <div className="flex items-center gap-8">
      <Register
        className={showRegister ? `` : `hidden`}
        isOpen={modalActivo === "register"}
        onOpenAction={() => setModalActivo("register")}
        onCloseAction={() => setModalActivo(null)}
        onSwitchAction={() => setModalActivo("login")}
      />

      <Login
        className={showLogin ? `` : `hidden`}
        isOpen={modalActivo === "login"}
        onOpenAction={() => setModalActivo("login")}
        onCloseAction={() => setModalActivo(null)}
        onSwitchAction={() => setModalActivo("register")}
      />
    </div>
  );
}
