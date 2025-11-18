"use client";
import { useState, useEffect } from "react";
import ContentHeader from "@/components/ContentHeader";
import Pagination from "@/components/Pagination";
import Search from "@/components/SearchBar";
import NewsTable from "@/components/NewsTable";
import ExportSelectedButton from "@/components/ExportSelectedButton";
import { NewsItem, NewsFilterState, ApiResponse, ApiNewsItem, FiltersApiResponse } from "@/types";

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [activeFilters, setActiveFilters] = useState<NewsFilterState | null>(null);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mediaOptions, setMediaOptions] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [authorOptions, setAuthorOptions] = useState<string[]>([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/filtros");
        if (response.ok) {
          const result: FiltersApiResponse = await response.json();
          if (result.success) {
            setMediaOptions(result.data.media_outlet || []);
            setCategoryOptions(result.data.categoria || []);
            setAuthorOptions(result.data.autor || []);
          }
        }
      } catch (error) {
        console.error("Error al cargar filtros:", error);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const baseUrl = "http://localhost:3001/api/buscar";
        const params = new URLSearchParams();

        if (activeFilters) {
          if (activeFilters.searchTerm) params.append("q", activeFilters.searchTerm);
          if (activeFilters.media.length > 0) params.append("medio", activeFilters.media.join(","));
          if (activeFilters.categories.length > 0) params.append("categoria", activeFilters.categories.join(","));
          if (activeFilters.authors.length > 0) params.append("autor", activeFilters.authors.join(","));
          if (activeFilters.startDate)
            params.append("fechaInicio", activeFilters.startDate.toISOString().split("T")[0]);
          if (activeFilters.endDate) params.append("fechaFin", activeFilters.endDate.toISOString().split("T")[0]);
        }

        params.append("pagina", currentPage.toString());
        params.append("limite", limit.toString());

        const response = await fetch(`${baseUrl}?${params.toString()}`);
        if (!response.ok) throw new Error("Error al conectar con la API");

        const result: ApiResponse = await response.json();

        if (result.success) {
          const mappedData: NewsItem[] = result.data.map((item: ApiNewsItem) => ({
            id: item.id.toString(),
            title: item.title,
            date: item.fecha || item.date,
            url: item.url,
            source: item.media_outlet,
            country: item.country,
            author: item.autor || "N/A",
            category: item.categoria || "General",
          }));

          setFilteredNews(mappedData);
          setTotalPages(result.paginacion.totalPaginas);
          setTotalResults(result.paginacion.total);
        } else {
          setFilteredNews([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error("Error:", error);
        setFilteredNews([]);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [activeFilters, currentPage, limit]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleApplyFilters = (filters: NewsFilterState) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setActiveFilters(null);
    setCurrentPage(1);
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

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  return (
    <div className="w-full mx-auto py-8">
      <ContentHeader firstLine="Catálogo" secondLine="de noticias">
        <div className="flex w-full max-w-7xl">
          <Search
            onApplyFiltersAction={handleApplyFilters}
            onClearFiltersAction={handleClearFilters}
            availableMediaOptions={mediaOptions}
            availableCategoryOptions={categoryOptions}
            availableAuthorOptions={authorOptions}
          />
          <ExportSelectedButton selectedIds={selectedIds} />
        </div>

        <div className="flex items-center gap-3 px-8">
          <p className="text-sm text-text-muted">Mostrar por página:</p>
          <select
            className="bg-surface-dark border border-border-primary rounded-md p-1 text-sm text-foreground focus:outline-none focus:border-border-primary"
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
        </div>
      </ContentHeader>

      {totalResults !== undefined && (
        <div className="flex w-full justify-center">
          <span className="text-lg text-text-muted font-medium mb-1 ml-2">({totalResults} resultados)</span>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-20 text-text-muted">Buscando noticias...</div>
      ) : (
        <NewsTable
          news={filteredNews}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
        />
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
