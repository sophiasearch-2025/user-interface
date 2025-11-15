"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Files, Eye, BookMarked } from "lucide-react";
import { NewsItem } from "@/types";

type NewsActionsMenuProps = {
  news: NewsItem;
};

export default function NewsActionsMenu({ news }: NewsActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = () => {
    console.log("Exportando CSV:", news.title);
    alert(`Exportando CSV: ${news.title}`);
    setIsOpen(false);
  };

  const handleView = () => {
    window.open(news.url, "_blank");
    setIsOpen(false);
  };

  const handleAddToCollection = () => {
    console.log("Añadiendo a colección:", news.title);
    alert(`Añadiendo a colección: ${news.title}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-surface-dark">
        <MoreHorizontal className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-56 z-20 bg-surface-dark rounded-lg shadow-lg p-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <button
              onClick={handleExport}
              className="flex items-center gap-3 px-4 py-2 text-sm w-full text-left text-text-primary hover:bg-background rounded"
            >
              <Files className="w-4 h-4 text-link-active" />
              Exportar CSV
            </button>
            <button
              onClick={handleView}
              className="flex items-center gap-3 px-4 py-2 text-sm w-full text-left text-text-primary hover:bg-background rounded"
            >
              <Eye className="w-4 h-4 text-link-active" />
              Ver noticia
            </button>
            <button
              onClick={handleAddToCollection}
              className="flex items-center gap-3 px-4 py-2 text-sm w-full text-left text-text-primary hover:bg-background rounded"
            >
              <BookMarked className="w-4 h-4 text-link-active" />
              Añadir a colección
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
