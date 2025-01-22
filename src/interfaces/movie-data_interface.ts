export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
    genres: Genre[];
}

export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    runtime: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credits?: Credits;
    genres: Genre[];
}

export interface Credits {
    cast: Cast[];
    crew: Crew[];
}

export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}
  
export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface MovieCategorizedResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Language {
    iso_639_1: string;
    english_name: string;
    name: string;
}

export interface PieChartData {
    label: string;
    value: string | number;
    color?: string;
}
