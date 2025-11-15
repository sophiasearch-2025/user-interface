import { Files } from "lucide-react";

type ExportSelectedButtonProps = {
  selectedIds: string[];
};

export default function ExportSelectedButton({ selectedIds }: ExportSelectedButtonProps) {
  const handleExport = () => {
    console.log("Exportando CSV para IDs:", selectedIds);
    alert(`Exportando ${selectedIds.length} noticias seleccionadas.`);
  };

  const count = selectedIds.length;

  return (
    <button
      onClick={handleExport}
      disabled={count === 0}
      className="flex items-center gap-2 px-4 py-2 rounded-full
                 bg-btn-secondary-bg text-btn-secondary-text font-semibold
                 transition-all
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-opacity-80"
    >
      <Files className="w-5 h-5" />
      Exportar {count > 0 ? `(${count})` : ""}
    </button>
  );
}
