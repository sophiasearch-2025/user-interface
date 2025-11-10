type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex items-center gap-4">
        {pageNumbers.map((number) => (
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
        ))}
      </div>
    </div>
  );
}
