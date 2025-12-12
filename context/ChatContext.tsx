"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";


type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};


interface ChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  
  messages: Message[];
  addMessage: (text: string, sender: "user" | "ai") => void;
  
  
  currentNewsContext: string | null; 
  setNewsContext: (text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "¡Hola! Soy Sophia. Estoy leyendo la noticia contigo. ¿Qué quieres saber?",
      sender: "ai",
    },
  ]);
  const [currentNewsContext, setCurrentNewsContext] = useState<string | null>(null);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const addMessage = (text: string, sender: "user" | "ai") => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), text, sender }]);
  };

  return (
    <ChatContext.Provider value={{ 
      isOpen, openChat, closeChat, 
      messages, addMessage, 
      currentNewsContext, setNewsContext: setCurrentNewsContext 
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat debe usarse dentro de un ChatProvider");
  return context;
}