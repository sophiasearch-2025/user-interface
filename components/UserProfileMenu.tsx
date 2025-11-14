"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, User, BookMarked, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserData as UserDataProps } from "@/lib/session";

export default function UserProfileMenu({ name: userName, role: userRole, initial: userInitial }: UserDataProps) {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const UserButton = (
    <button
      onClick={() => setOpen(!isOpen)}
      className={`flex items-center gap-3 px-4 py-3 w-full justify-between focus:outline-none border border-border-primary hover:bg-btn-primary-hover-bg/10 transition-all
      ${isOpen ? "rounded-t-xl" : "rounded-xl"}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-btn-primary-bg rounded-full">
          <span className="font-bold text-text-primary text-lg">{userInitial}</span>
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-link-hover">{userName}</p>
          <p className="text-xs text-text-muted">{userRole}</p>
        </div>
      </div>

      <ChevronDown className={`w-5 h-5 text-link-active transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
  );

  return (
    <div className="relative flex flex-col items-stretch bg-surface-dark min-w-[260px]" ref={menuRef}>
      {UserButton}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bg-background top-full left-0 right-0 w-full z-50 p-3 flex flex-col gap-2 border-b border-x border-border-primary rounded-b-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-primary bg-surface-dark rounded-lg hover:bg-btn-primary-hover-bg/10 transition-colors"
            >
              <User className="w-4 h-4 text-link-active" />
              Mi perfil
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-primary bg-surface-dark rounded-lg hover:bg-btn-primary-hover-bg/10 transition-colors"
            >
              <BookMarked className="w-4 h-4 text-link-active" />
              Mis colecciones
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-danger bg-surface-dark/50 rounded-lg hover:bg-text-danger/20 transition-colors mt-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
