"use client";
import { useState, useEffect } from "react";
import ContentHeader from "@/components/ContentHeader";
import Pagination from "@/components/Pagination";
import Search from "@/components/SearchBar";
import NewsTable from "@/components/NewsTable";
import ExportSelectedButton from "@/components/ExportSelectedButton";
import { NewsItem, NewsFilterState } from "@/types";

const MOCK_NEWS_DATA: NewsItem[] = [
  {
    id: "1",
    title: "Descubren nueva especie marina",
    date: "2025-11-05",
    author: "M. González",
    url: "#",
    source: "El Informador",
    category: "Ciencia",
  },
  {
    id: "2",
    title: "IA supera récord en diagnóstico",
    date: "2025-11-07",
    author: "C. Rodríguez",
    url: "#",
    source: "Tech Daily",
    category: "Tecnología",
  },
  {
    id: "3",
    title: "Mundial 2026: Estadios listos",
    date: "2025-11-08",
    author: "A. Martínez",
    url: "#",
    source: "Deportes Hoy",
    category: "Deportes",
  },
  {
    id: "4",
    title: "Nueva política de IA en Chile",
    date: "2025-11-09",
    author: "S. Jofré",
    url: "#",
    source: "La Tercera",
    category: "Tecnología",
  },
  {
    id: "5",
    title: "Caída de la bolsa en Asia",
    date: "2025-11-10",
    author: "J. Doe",
    url: "#",
    source: "BioBioChile",
    category: "Economía",
  },
];

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const [activeFilters, setActiveFilters] = useState<NewsFilterState | null>(null);

  const [allNews] = useState<NewsItem[]>(MOCK_NEWS_DATA);

  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(MOCK_NEWS_DATA);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!activeFilters) {
      setFilteredNews(allNews);
      return;
    }

    const filtered = allNews.filter((news) => {
      if (activeFilters.media.length > 0 && !activeFilters.media.includes(news.source)) {
        return false;
      }
      if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(news.category)) {
        return false;
      }
      // (Aquí iría la lógica de fechas...)
      return true;
    });

    setFilteredNews(filtered);
    setSelectedIds([]);
  }, [activeFilters, allNews]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleApplyFilters = (filters: NewsFilterState) => {
    console.log("Filtros aplicados desde la página:", filters);
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters(null);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prevIds) => (prevIds.includes(id) ? prevIds.filter((i) => i !== id) : [...prevIds, id]));
  };

  const handleToggleSelectAll = () => {
    if (filteredNews.every((item) => selectedIds.includes(item.id))) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNews.map((item) => item.id));
    }
  };

  return (
    <div className="w-full mx-auto py-8">
      <ContentHeader firstLine="Catálogo" secondLine="de noticias">
        <div className="flex w-full max-w-7xl">
          <Search onApplyFiltersAction={handleApplyFilters} onClearFiltersAction={handleClearFilters} />
          <ExportSelectedButton selectedIds={selectedIds} />
        </div>

        <div className="flex items-center gap-3 px-8">
          <p className="text-sm text-text-muted">Mostrar por página:</p>

          <select className="bg-surface-dark border border-border-primary rounded-md p-1 text-sm text-foreground focus:outline-none focus:border-border-primary">
            <option value="4">4</option>
            <option value="6">6</option>
          </select>
        </div>
      </ContentHeader>

      <NewsTable
        news={filteredNews}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
