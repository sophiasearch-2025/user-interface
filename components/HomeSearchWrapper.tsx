"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/SearchBar";
import { NewsFilterState, FiltersApiResponse } from "@/types";

export default function HomeSearchWrapper() {
  const router = useRouter();

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
        console.error("Error al cargar filtros en Home:", error);
      }
    };
    fetchFilters();
  }, []);

  const handleApplyFilters = (filters: NewsFilterState) => {
    const params = new URLSearchParams();

    if (filters.searchTerm) params.set("q", filters.searchTerm);

    if (filters.media.length > 0) {
      filters.media.forEach((m) => params.append("media_outlet", m));
    }
    if (filters.countries.length > 0) {
      filters.countries.forEach((c) => params.append("country", c));
    }

    if (filters.startDate) {
      params.set("date_from", filters.startDate.toISOString().split("T")[0]);
    }
    if (filters.endDate) {
      params.set("date_to", filters.endDate.toISOString().split("T")[0]);
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
      availableCountryOptions={countryOptions}
      initialFilters={null}
    />
  );
}
