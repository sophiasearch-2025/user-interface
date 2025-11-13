"use client";
import { useState } from "react";
import ContentHeader from "@/components/ContentHeader";
import Pagination from "@/components/Pagination";

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <ContentHeader firstLine="Catálogo" secondLine="de noticias" />

      {/* Aquí iran las tarjetas de noticias */}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
