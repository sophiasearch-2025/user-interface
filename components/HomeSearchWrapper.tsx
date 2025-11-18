"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/SearchBar";
import { NewsFilterState, FiltersApiResponse } from "@/types";

export default function HomeSearchWrapper() {
  const router = useRouter();

  const [mediaOptions, setMediaOptions] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [authorOptions, setAuthorOptions] = useState<string[]>([]);

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
        console.error("Error al cargar filtros en Home:", error);
      }
    };
    fetchFilters();
  }, []);

  const handleApplyFilters = (filters: NewsFilterState) => {
    const params = new URLSearchParams();

    if (filters.searchTerm) params.set("q", filters.searchTerm);

    if (filters.media.length > 0) {
      filters.media.forEach((m) => params.append("media", m));
    }
    if (filters.categories.length > 0) {
      filters.categories.forEach((c) => params.append("category", c));
    }
    if (filters.authors.length > 0) {
      filters.authors.forEach((a) => params.append("autor", a));
    }

    if (filters.startDate) {
      params.set("startDate", filters.startDate.toISOString().split("T")[0]);
    }
    if (filters.endDate) {
      params.set("endDate", filters.endDate.toISOString().split("T")[0]);
    }

    router.push(`/news?${params.toString()}`);
  };

  const handleClearFilters = () => {
    console.log("Filtros limpiados en Home (Visual)");
  };

  return (
    <Search
      onApplyFiltersAction={handleApplyFilters}
      onClearFiltersAction={handleClearFilters}
      availableMediaOptions={mediaOptions}
      availableCategoryOptions={categoryOptions}
      availableAuthorOptions={authorOptions}
      initialFilters={null}
    />
  );
}
