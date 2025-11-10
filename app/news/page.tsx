"use client";
import { useState } from "react";
import BarCollection from "@/components/BarCollection";
import Pagination from "@/components/Pagination";

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <BarCollection collectionTitle="Lorem Ipsum" />

      {/* Aquí iran las tarjetas de noticias */}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
