type Award = string;

interface Movie {
  title: string;
  releaseYear: number;
  rating: number;
  awards: Award[];
}

interface Category {
  name: string;
  movies: Movie[];
}

type Filter = MatchFilter | RangeFilter | ValuesFilter;

interface MatchFilter {
  filter: string;
}

interface RangeFilter {
  filter: number;
  filterTo: number;
}

interface ValuesFilter {
  values: string[];
}

class MovieList {
  movies: Movie[];
  filters: Filter[];

  constructor(movies: Movie[]) {
    this.movies = movies;
    this.filters = [];
  }

  applySearchValue(value: string): void {
    this.filters.push({ filter: value });
  }

  applyFiltersValue(filters: Filter[]): void {
    this.filters = filters;
  }
}

class CategoryList {
  categories: Category[];
  filters: Filter[];

  constructor(categories: Category[]) {
    this.categories = categories;
    this.filters = [];
  }

  applySearchValue(value: string): void {
    this.filters.push({ filter: value });
  }

  applyFiltersValue(filters: Filter[]): void {
    this.filters = filters;
  }
}
