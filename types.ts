export interface Job {
  id: string;
  slug: string;
  company: string;
  position: string;
  tags: string[];
  description: string; // HTML string
  url: string;
  date: string;
  company_logo: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  apply_url: string;
}

export interface GeminiConfig {
  temperature: number;
  topK: number;
  topP: number;
}

export enum FetchStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface FilterState {
  search: string;
  tag: string | null;
}