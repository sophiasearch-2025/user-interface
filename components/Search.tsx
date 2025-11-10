"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { useState } from "react";
import TagSelector from "./TagSelector";

export default function Search() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const allMediaOptions = ["La Tercera", "BioBioChile", "CNN Chile", "El Mercurio"];
  const allCategoryOptions = ["Tecnología", "Cultura", "Internacional", "Deportes", "Política"];
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handleClearFilters = () => {
    setSelectedMedia([]);
    setSelectedCategories([]);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handleApplyFilters = () => {
    // Llamada a enlace de búsqueda con filtros aplicados.
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <div
        className="relative z-10 flex items-center gap-3
                      bg-surface-light rounded-full p-4 shadow-lg"
      >
        <button className="p-2" type="submit">
          <SearchIcon className="text-text-muted-on-light" />
        </button>

        <input
          type="search"
          name="search"
          placeholder="Buscar por palabras claves, fuente o fecha..."
          className="w-full text-sm bg-transparent focus:outline-none
                     text-foreground-on-light placeholder:text-text-muted-on-light"
        />

        <button
          className={`p-2 rounded-full transition-colors ${
            isFilterOpen ? "bg-surface-accent text-text-primary" : "hover:bg-black/10 text-text-muted-on-light"
          }`}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <SlidersHorizontalIcon
            className={`transition-colors w-5 h-5 ${isFilterOpen ? "text-text-primary" : "text-border-primary"}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            className="absolute top-10 left-0 right-0 z-0 bg-surface-accent rounded-b-2xl shadow-lg p-4 pt-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <p className="font-semibold py-2 text-text-primary text-lg">Filtrar por:</p>

            <p className="font-semibold text-text-primary">Fecha:</p>
            <div className="flex gap-4">
              <div className="flex py-2 flex-col gap-1 w-full">
                <label className="font-medium text-sm text-text-primary" htmlFor="start_date">
                  Desde
                </label>
                <input
                  className="text-sm bg-surface-light text-foreground-on-light rounded-full p-2 px-3 focus:outline-none"
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={selectedStartDate ? selectedStartDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => setSelectedStartDate(e.target.value ? new Date(e.target.value) : null)}
                  max={selectedEndDate ? selectedEndDate.toISOString().split("T")[0] : "2050-01-01"}
                ></input>
              </div>
              <div className="flex py-2 flex-col gap-1 w-full">
                <label className="font-medium text-sm text-text-primary" htmlFor="end_date">
                  Hasta
                </label>
                <input
                  className="text-sm bg-surface-light text-foreground-on-light rounded-full p-2 px-3 focus:outline-none"
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={selectedEndDate ? selectedEndDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => setSelectedEndDate(e.target.value ? new Date(e.target.value) : null)}
                  min={selectedStartDate ? selectedStartDate.toISOString().split("T")[0] : "1970-01-01"}
                ></input>
              </div>
            </div>

            <TagSelector
              label="Medio:"
              buttonText="Añadir medio"
              availableOptions={allMediaOptions}
              selectedItems={selectedMedia}
              onChangeAction={setSelectedMedia}
            />

            <TagSelector
              label="Categoría:"
              buttonText="Añadir categoría"
              availableOptions={allCategoryOptions}
              selectedItems={selectedCategories}
              onChangeAction={setSelectedCategories}
            />

            <div className="flex justify-end gap-x-3 mt-4 border-t border-surface-light/20 pt-4">
              <button
                className="flex items-center gap-1 text-sm font-bold bg-btn-primary-hover-bg hover:bg-btn-primary-hover-bg/90 text-btn-primary-hover-text border border-btn-primary-bg px-5 py-2 rounded-full transition-colors"
                onClick={handleClearFilters}
              >
                Limpiar filtros
              </button>

              <button
                className="flex items-center gap-1 text-sm font-bold bg-surface-accent-dark hover:bg-surface-accent-dark/80 text-btn-primary-text px-5 py-2 rounded-full transition-colors"
                onClick={handleApplyFilters}
              >
                Aplicar filtros
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
