export type NewsItem = {
  id: string;
  title: string;
  text: string;
  media_outlet: string;
  country: string;
  date: string;
  url: string;
};

export type ApiNewsItem = {
  id: string;
  score: number;
  title: string;
  text: string;
  media_outlet: string;
  country: string;
  date: string;
  url: string;
};

export type ApiResponse = {
  success: boolean;
  data: ApiNewsItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
};

export type FiltersApiResponse = {
  success: boolean;
  data: {
    total_news: number;
    media_outlets: string[];
    countries: string[];
    date_range: {
      min: number;
      max: number;
    };
  };
};

export type NewsFilterState = {
  searchTerm: string;
  startDate: Date | null;
  endDate: Date | null;
  media: string[];
  countries: string[];
};
