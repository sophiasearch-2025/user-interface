export type NewsItem = {
  id: string;
  title: string;
  date: string;
  url: string;
  source: string;
  country: string;
  author: string;
  category: string;
};

export type ApiNewsItem = {
  id: number;
  title: string;
  date: string;
  fecha: string;
  media_outlet: string;
  url: string;
  text: string;
  country: string;
  autor: string;
  categoria: string;
  palabrasClave: string[];
};

export type ApiResponse = {
  success: boolean;
  data: ApiNewsItem[];
  paginacion: {
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
  };
};

export type FiltersApiResponse = {
  success: boolean;
  data: {
    media_outlet: string[];
    country: string[];
    categoria: string[];
    autor: string[];
  };
};

export type NewsFilterState = {
  searchTerm: string;
  startDate: Date | null;
  endDate: Date | null;
  media: string[];
  categories: string[];
  authors: string[];
};
