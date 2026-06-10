export interface ISelectOptionLV {
  value: string;
  label: string;
}

export type TResourceType = "image" | "video" | "audio" | "auto";

export type IRecord<T = string | string[] | undefined> = Record<string, T>
export interface IQueryResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  pagination?: IPagination
  [x: string]: any
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  previousPage: number;
}

export interface IQueryParams extends IBaseQueryParams {
  [k: string]: any
  status?: string
  role?: string,
  date?: string
  endDate?: string
  type?: string;
}
export interface IBaseQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}


export type TSearchKey =
  'search'
  | 'captain_search'
  | 'player_search'
  | 'manager_search'
  | 'match_search'
  | 'squad_search'
  | 'sponsor_search'
  | 'card_search'
  | 'injury_search'
  | 'news_search'
  | 'goal_search'
  | 'team_search'
  | 'gallery_search'
  | 'training_search'
  | 'transaction_search'
  | 'log_search'
  | 'doc_search'
  | 'highlight_search'
  | 'user_search'
  | 'mvp_search'