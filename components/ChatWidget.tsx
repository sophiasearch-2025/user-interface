"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, X, Lock } from "lucide-react";
import { siGooglegemini } from "simple-icons";
import Icon from "@/components/Icon";
import { v4 as uuidv4 } from "uuid";

// Hooks personalizados
import { useMockSession } from "@/components/hooks/useMockSession";
import { useChat } from "@/context/ChatContext"; 

// --- SUB-COMPONENTES DE UI ---

const ChatHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="flex justify-between items-center text-text-primary pb-4 mb-4">
    <div className="flex items-center gap-3">
      <h2 className="text-2xl font-bold">
        Hola, <br /> ¿en qué puedo ayudarte?
      </h2>
    </div>
    <button
      onClick={onClose}
      className="text-text-muted hover:text-text-primary transition-colors p-2 rounded-full hover:bg-white/10"
      aria-label="Cerrar chat"
    >
      <X size={24} />
    </button>
  </div>
);

const ChatBody = React.forwardRef<HTMLDivElement, { messages: any[] }>(({ messages }, ref) => (
  <div ref={ref} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
    {messages.map((msg) => (
      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
        <div
          className={`text-sm rounded-2xl p-3 max-w-[85%] shadow-md whitespace-pre-wrap
              ${
                msg.sender === "user"
                  ? "bg-[var(--palette-cyan)] text-black font-medium"
                  : "bg-[var(--palette-black)] text-white border border-white/10"
              }
            `}
        >
          {msg.text === "..." ? (
            <div className="flex items-center gap-1 h-5 px-2">
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
            </div>
          ) : (
            msg.text
          )}
        </div>
      </div>
    ))}
  </div>
));
ChatBody.displayName = "ChatBody";

// --- COMPONENTE PRINCIPAL ---

export function ChatWidget() {
  // 1. Usamos el Contexto Global (Estado del Chat)
  const { isOpen, openChat, closeChat, messages, addMessage, currentNewsContext } = useChat();
  
  // 2. Usamos la Sesión Mock (Permisos)
  const { user } = useMockSession();
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [inputVal, setInputVal] = useState("");

  const suggestedQuestions = [
    "¿Cuál es la idea principal?",
    "Resumir en 3 puntos",
    "¿Qué impacto tiene esto?"
  ];

  // Auto-scroll al recibir mensajes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // --- LÓGICA DE ENVÍO DE MENSAJES ---
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Validación Criterio C2 (Solo Premium)
    if (user?.role !== "premium") {
        return; 
    }

    // 1. Agregar mensaje del usuario inmediatamente
    addMessage(text, "user");
    setInputVal(""); 

    // 2. Mostrar indicador de carga "..."

    try {
      // 3. LLAMADA A LA API REAL (H7)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          context: currentNewsContext || "No hay una noticia activa en este momento.",
          history: messages 
        }),
      });

      if (!response.ok) throw new Error("Error en la API");

      const data = await response.json();

      // 4. Agregar respuesta de la IA
      addMessage(data.text, "ai");

    } catch (error) {
      console.error(error);
      addMessage("Lo siento, tuve un problema conectando con mi cerebro digital.", "ai");
    }
  };

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 z-50 h-full flex items-center"
      style={{ height: "70vh", top: "15vh" }}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      variants={{ hidden: { x: "calc(100% - 40px)" }, visible: { x: 0 } }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      {/* PESTAÑA LATERAL (Botón para abrir/cerrar) */}
      <button
        onClick={isOpen ? closeChat : openChat}
        className="w-10 h-48 shrink-0 flex items-center justify-center p-2 bg-gradient-to-b from-[var(--palette-grey-dark)] to-[#2a3176] text-white rounded-l-2xl shadow-xl border-y border-l border-white/10"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <Icon icon={siGooglegemini} className="h-5 w-5 mb-2" />
        <span className="rotate-180 font-bold tracking-wide">Asistente IA</span>
      </button>

      {/* PANEL PRINCIPAL DEL CHAT */}
      <div className="w-full sm:w-96 h-full rounded-l-2xl shadow-2xl flex flex-col p-6 bg-gradient-to-b from-[var(--palette-grey-dark)] to-[#2a3176] border-l border-white/10">
        
        <ChatHeader onClose={closeChat} />
        
        <ChatBody ref={scrollContainerRef} messages={messages} />

        {/* ZONA INFERIOR (Input o Bloqueo) */}
        <div className="mt-4 pt-4 border-t border-white/10">
          
          {user?.role === "premium" ? (
            <>
              {/* Sugerencias (Criterio C3) */}
              <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-1">
                {suggestedQuestions.map((q, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSendMessage(q)} 
                    className="text-xs bg-black/40 hover:bg-white/20 border border-white/10 text-white px-3 py-1.5 rounded-full whitespace-nowrap transition backdrop-blur-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input de texto */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputVal); }} 
                className="flex gap-2"
              >
                <input 
                  type="text" 
                  placeholder="Pregunta sobre la noticia..." 
                  className="flex-1 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[var(--palette-cyan)] placeholder:text-white/40 text-sm" 
                  autoComplete="off" 
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                />
                <button 
                  type="submit" 
                  disabled={!inputVal.trim()}
                  className="bg-[var(--palette-purple)] p-2 rounded-full text-white hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          ) : (
            /* Mensaje de Bloqueo para Free (Criterio C2) */
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-red-500/20 rounded-full">
                    <Lock className="text-red-400 w-5 h-5" />
                </div>
              </div>
              <p className="text-sm font-bold text-red-200">Función Premium</p>
              <p className="text-xs text-white/60 mt-1">Actualiza tu plan para chatear con Sophia sobre esta noticia.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}