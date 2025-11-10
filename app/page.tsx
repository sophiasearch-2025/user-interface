"use client";
import { useState } from "react";
import BarCollection from "@/components/BarCollection";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="bg-background min-h-screen">
      <div className="w-full">
        <BarCollection collectionTitle="Lorem Ipsum" />

        {/* Aquí iran las tarjetas de noticias */}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </main>
  );
}
