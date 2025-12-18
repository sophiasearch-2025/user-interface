"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ContentHeader from "@/components/ContentHeader";
import Pagination from "@/components/Pagination";
import NewsTable from "@/components/NewsTable";
import ExportSelectedButton from "@/components/ExportSelectedButton";
import { NewsItem, NewsFilterState, ApiResponse, ApiNewsItem, FiltersApiResponse } from "@/types";
import SearchBar from "@/components/SearchBar";

function NewsPageContent() {
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const [activeFilters, setActiveFilters] = useState<NewsFilterState | null>(() => {
    if (searchParams.toString()) {
      return {
        searchTerm: searchParams.get("q") || "",
        media: searchParams.getAll("media_outlet"),
        countries: searchParams.getAll("country"),
        startDate: searchParams.get("date_from") ? new Date(searchParams.get("date_from")!) : null,
        endDate: searchParams.get("date_to") ? new Date(searchParams.get("date_to")!) : null,
      };
    }
    return null;
  });

  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [mediaOptions, setMediaOptions] = useState<string[]>([]);
  const [countryOptions, setCountryOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("/api/filters");
        if (response.ok) {
          const result: FiltersApiResponse = await response.json();
          if (result.success) {
            setMediaOptions(result.data.media_outlets || []);
            setCountryOptions(result.data.countries || []);
          }
        }
      } catch (error) {
        console.error("Error filtros:", error);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const baseUrl = "/api/search";
        const params = new URLSearchParams();

        if (activeFilters) {
          if (activeFilters.searchTerm) params.append("q", activeFilters.searchTerm);
          if (activeFilters.media.length > 0) params.append("media_outlet", activeFilters.media.join(","));
          if (activeFilters.countries.length > 0) params.append("country", activeFilters.countries.join(","));
          if (activeFilters.startDate) params.append("date_from", activeFilters.startDate.toISOString().split("T")[0]);
          if (activeFilters.endDate) params.append("date_to", activeFilters.endDate.toISOString().split("T")[0]);
        }

        params.append("page", currentPage.toString());
        params.append("limit", limit.toString());

        const response = await fetch(`${baseUrl}?${params.toString()}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error API: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const result: ApiResponse = await response.json();

        if (result.success) {
          const mappedData: NewsItem[] = result.data.map((item: ApiNewsItem) => ({
            id: item.id.toString(),
            title: item.title,
            text: item.text,
            date: item.date,
            url: item.url,
            media_outlet: item.media_outlet,
            country: item.country,
          }));

          setFilteredNews(mappedData);
          setTotalPages(result.pagination.total_pages);
          setTotalResults(result.pagination.total);
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

  const handlePageChange = (p: number) => setCurrentPage(p);

  const handleApplyFilters = (filters: NewsFilterState) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setActiveFilters(null);
    setCurrentPage(1);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
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
          <SearchBar
            onApplyFiltersAction={handleApplyFilters}
            onClearFiltersAction={handleClearFilters}
            availableMediaOptions={mediaOptions}
            availableCountryOptions={countryOptions}
            initialFilters={activeFilters}
          />
          <ExportSelectedButton selectedIds={selectedIds} />
        </div>

        <div className="flex items-center gap-3 px-8">
          <p className="text-sm text-text-muted">Mostrar por página:</p>
          <select
            className="bg-surface-dark border border-border-primary rounded-md p-1 text-sm text-foreground focus:outline-none focus:border-border-primary"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
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
        <div className="text-center py-20 text-text-muted">Cargando noticias...</div>
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

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Cargando catálogo...</div>}>
      <NewsPageContent />
    </Suspense>
  );
}
