'use client';

// Añadimos useRef y useEffect para el auto-scroll
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { siGooglegemini } from "simple-icons";
import Icon from "@/components/Icon";

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};
//Componentes del chat IA abierto

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

const ChatBody = React.forwardRef<HTMLDivElement, { messages: Message[] }>(
  ({ messages }, ref) => (
    <div ref={ref} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar ">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`text-sm rounded-full p-3 max-w-[80%] shadow-md
              ${msg.sender === 'user'
                ? 'bg-[var(--palette-cyan)] text-foreground-on-light'
                : 'bg-[var(--palette-black)] text-[var(--color-text-primary)]'
              }
            `}
          >
            {msg.text === '...' ? (
              <div className="flex items-center justify-center gap-1.5 h-5">
                <span className="h-1.5 w-1.5 bg-[var(--palette-blue-dark)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-1.5 w-1.5 bg-[var(--palette-blue-dark)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-1.5 w-1.5 bg-[var(--palette-blue-dark)] roundsed-full animate-bounce"></span>
              </div>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        </div>
      ))}
      <div className="h-4"></div>
    </div>
  )
);
ChatBody.displayName = 'ChatBody'; // Buena práctica para debugging con forwardRef

const ChatInput = ({ onSend }: { onSend: (text: string) => void }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="pt-4 flex items-center gap-3 border-t border-[var(--palette-blue-dark)]/50 mt-4">
      <input
        type="text"
        placeholder="Escribe tu consulta..."
        className="flex-1 p-3 rounded-full bg-[var(--color-surface-light)] border border-[var(--palette-blue-dark)] text-foreground-on-light placeholder-text-foreground-on-light focus:outline-none focus:ring-2 focus:ring-[var(--palette-cyan)]"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-btn-primary-bg text-btn-primary-text hover:bg-btn-primary-hover-bg hover:text-btn-primary-hover-text
                 p-3 rounded-full shadow-lg transition-colors 
                 focus:outline-none focus:ring-2 focus:ring-btn-primary-bg"
        aria-label="Enviar mensaje"
      >
        <Send size={24} />
      </button>
    </form>
  );
};

//Componente Principal

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      text: '¡Hola! Soy Sophia, tu asistente de IA. Estoy aquí para ayudarte con tus investigaciones.',
      sender: 'ai',
    },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]); // Se ejecuta CADA VEZ que el array 'messages' cambia (scrollea)

  const widgetVariants = {
    hidden: {
      x: 'calc(100% - 40px)', 
    },
    visible: {
      x: 0,
    },
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { id: crypto.randomUUID(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    const loadingMessage: Message = { id: 'loading', text: '...', sender: 'ai' };
    setMessages(prev => [...prev, loadingMessage]);

    // ... (Hacer aqui la conexion con la api IA) ...
    //Provisorio para visualizar un chat
    setTimeout(() => {
      const aiMessage: Message = { 
        id: crypto.randomUUID(), 
        text: `Respuesta simulada a: "${text}"`, 
        sender: 'ai' 
      };
      setMessages(prev => [
        ...prev.filter(msg => msg.id !== 'loading'),
        aiMessage
      ]);
    }, 1500);
    //fin provisorio
  };

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 z-50 h-full flex items-center"
      style={{
        height: '70vh',
        top: '15vh',
      }}
      variants={widgetVariants}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
    >
      {/* BOTÓN TIPO PESTAÑA */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-48 flex-shrink-0 flex items-center justify-center p-2
                   bg-gradient-to-b from-[var(--color-surface-dark)] to-[var(--color-surface-accent-dark)] 
                   text-white font-bold text-lg
                   rounded-l-2xl shadow-xl
                   focus:outline-none focus:ring-4 focus:ring-btn-primary-bg/50"
        aria-label={isOpen ? 'Cerrar chat' : 'Conversar con IA'}
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        <Icon icon={siGooglegemini} className="h-5 w-5" />
        <span className="rotate-180">Conversar con IA</span>
      </button>

      {/* VENTANA DE CHAT */}
      <div
        className="w-full sm:w-96 h-full rounded-l-2xl shadow-2xl flex flex-col p-4
                   bg-gradient-to-b from-[var(--color-surface-dark)] to-[var(--color-surface-accent-dark)]"
        style={{
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
        }}
      >
        <ChatHeader onClose={() => setIsOpen(false)} />
        <ChatBody ref={scrollContainerRef} messages={messages} />
        <ChatInput onSend={handleSendMessage} />
      </div>
    </motion.div>
  );
}
