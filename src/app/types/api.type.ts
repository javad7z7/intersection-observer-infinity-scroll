export type TMetadata = {
  current_page: string;
  page_count: number;
  per_page: number;
  total_count: number;
};

export type TResponse<T> = {
  data: T;
  metadata: TMetadata;
};
