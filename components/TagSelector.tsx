"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus } from "lucide-react";

type TagSelectorProps = {
  label: string;
  buttonText: string;
  availableOptions: string[];
  selectedItems: string[];
  onChangeAction: (newItems: string[]) => void;
};

export default function TagSelector({
  label,
  buttonText,
  availableOptions,
  selectedItems,
  onChangeAction,
}: TagSelectorProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleRemove = (itemToRemove: string) => {
    const newItems = selectedItems.filter((item) => item !== itemToRemove);
    onChangeAction(newItems);
  };

  const handleAdd = (itemToAdd: string) => {
    const newItems = [...selectedItems, itemToAdd];
    onChangeAction(newItems);
  };

  const filteredOptions = availableOptions.filter((option) => !selectedItems.includes(option));

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="py-2">
      <p className="font-semibold text-text-primary">{label}</p>

      <div className="flex flex-wrap gap-2 py-2">
        {selectedItems.map((item) => (
          <div
            key={item}
            className="flex items-center gap-1 bg-surface-accent-dark text-text-primary text-sm font-medium px-3 py-1 rounded-full"
          >
            <span>{item}</span>
            <button onClick={() => handleRemove(item)} className="hover:bg-background-dark/20 rounded-full">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1 text-sm font-bold bg-btn-primary-hover-bg hover:bg-btn-primary-hover-bg/90 text-btn-primary-hover-text border border-btn-primary-bg px-5 py-2 rounded-full transition-colors"
        >
          <Plus className="w-4 h-4" />
          {buttonText}
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="absolute top-full left-0 mt-2 w-56 z-20 bg-btn-primary-hover-bg rounded-lg shadow-lg p-2"
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAdd(option)}
                    className="block w-full text-left text-surface hover:bg-surface hover:text-text-primary px-3 py-2 rounded transition-colors"
                  >
                    {option}
                  </button>
                ))
              ) : (
                <span className="block text-text-muted px-3 py-2">No hay más opciones</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
