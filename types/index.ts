export type NewsItem = {
  id: string;
  title: string;
  date: string;
  author: string;
  url: string;
  source: string;
  category: string;
};

export type NewsFilterState = {
  startDate: Date | null;
  endDate: Date | null;
  media: string[];
  categories: string[];
  // Aquí podríamos añadir 'searchTerm' en el futuro
};
