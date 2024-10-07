import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/app/lib/axios";
import { QueryConfig } from "@/app/lib/react-query";
import { TMetadata, TResponse } from "../types/api.type";

export type TMovieApi = {
  id: number;
  title: string;
  poster: string;
  year: string;
  country: string;
  imdb_rating: string;
  genres: string[];
  images: string[];
};
export type TMoviesApi = TMovieApi[];

export const getMovies = async (page: number): Promise<any> => {
  const endPoint = `/movies?page=${page}`;
  return await api.get(endPoint).then((response) => response.data);
};

export const getMoviesQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["movies"],
    queryFn: ({ pageParam }) => getMovies(pageParam),
    getNextPageParam: (lastPage) => {
      const { current_page, page_count, per_page, total_count } =
        lastPage.metadata;
      const nextPageSkip = Number(current_page) + 1;
      const hasNext = nextPageSkip <= page_count;
      if (hasNext) {
        return nextPageSkip;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
  });
};

type UseMoviesOptions = {
  queryConfig?: QueryConfig<typeof getMoviesQueryOptions>;
};

export const useMovies = ({ queryConfig }: UseMoviesOptions) => {
  return useInfiniteQuery({
    ...getMoviesQueryOptions(),
    ...queryConfig,
  });
};
