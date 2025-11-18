import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1, // Cuántos números mostrar al lado del actual
): (number | string)[] => {
  // Total de números a mostrar (ej: 1 + ... + 5,6,7 + ... + 405)
  const totalPageNumbers = siblingCount * 2 + 5; // Sibling + Actual + Primero + Ultimo + 2 Ellipsis

  // --- Caso 1: Si no hay suficientes páginas para necesitar ellipsis ---
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // --- Caso 2: Solo mostrar puntos a la DERECHA ---
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", totalPages];
  }

  // --- Caso 3: Solo mostrar puntos a la IZQUIERDA ---
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
    return [firstPageIndex, "...", ...rightRange];
  }

  // --- Caso 4: Mostrar puntos en AMBOS LADOS ---
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from({ length: 2 * siblingCount + 1 }, (_, i) => leftSiblingIndex + i);
    return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
  }

  return [];
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-text-muted hover:text-foreground disabled:opacity-50"
          aria-label="Ir a página anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {pageNumbers.map((number, index) => {
          if (typeof number === "string") {
            return (
              <span key={`dots-${index}`} className="flex items-center justify-center w-10 h-10 text-text-muted">
                <MoreHorizontal className="w-5 h-5" />
              </span>
            );
          }

          return (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`
                flex items-center justify-center w-10 h-10 rounded-full font-bold
                ${
                  currentPage === number
                    ? "bg-surface-accent text-text-primary"
                    : "text-text-muted hover:text-foreground"
                }
              `}
            >
              {number}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-text-muted hover:text-foreground disabled:opacity-50"
          aria-label="Ir a página siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
