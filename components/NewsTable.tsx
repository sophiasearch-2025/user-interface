import { NewsItem } from "@/types";
import NewsActionsMenu from "./NewsActionsMenu";

type NewsTableProps = {
  news: NewsItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
};

export default function NewsTable({ news, selectedIds, onToggleSelect, onToggleSelectAll }: NewsTableProps) {
  const safeNews = Array.isArray(news) ? news : [];
  const areAllSelected = safeNews.length > 0 && safeNews.every((item) => selectedIds.includes(item.id));

  return (
    <div className="w-full overflow-hidden rounded-lg border border-surface-dark">
      <table className="min-w-full divide-y divide-surface-dark">
        <thead className="bg-surface-dark">
          <tr>
            <th scope="col" className="p-4">
              <input
                type="checkbox"
                className="h-4 w-4 rounded bg-surface-dark border-border-primary text-btn-primary-bg focus:ring-btn-primary-bg"
                checked={areAllSelected}
                onChange={onToggleSelectAll}
              />
            </th>
            <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-text-primary">
              Título
            </th>
            <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-text-primary">
              Fecha
            </th>
            <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-text-primary">
              Medio
            </th>
            <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-text-primary">
              País
            </th>
            <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-text-primary">
              URL
            </th>
            <th scope="col" className="relative py-3.5 px-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-dark bg-background">
          {safeNews.length === 0 && (
            <tr>
              <td colSpan={9} className="p-8 text-center text-text-muted">
                No se encontraron noticias con esos filtros.
              </td>
            </tr>
          )}
          {safeNews.map((item) => (
            <tr
              key={item.id}
              className={selectedIds.includes(item.id) ? "bg-surface-dark" : "hover:bg-surface-dark/50"}
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded bg-surface-dark border-border-primary text-btn-primary-bg focus:ring-btn-primary-bg"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => onToggleSelect(item.id)}
                />
              </td>
              <td className="whitespace-nowrap py-4 px-3 text-sm font-medium text-text-primary">{item.title}</td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-text-muted">
                {new Date(item.date).toLocaleDateString("es-CL")}
              </td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-text-muted">{item.media_outlet}</td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-text-muted capitalize">{item.country}</td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-link-active">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Ver Link
                </a>
              </td>
              <td className="relative whitespace-nowrap py-4 px-3 text-sm font-medium">
                <NewsActionsMenu news={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
