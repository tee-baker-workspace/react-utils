import {
  MutationFunction,
  MutationKey,
  MutationOptions,
  QueryFunction,
  QueryKey,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export type OtherResponseData = {
  message: string | string[];
  statusCode: number;
};

export type InfiniteQueryResponse<T> = {
  data: {
    previous_page: number;
    next_page: number;
    total: number;
    current_page: number;
    results: T[];
  };
} & OtherResponseData;

export type QueryErrorResponse = {
  message: string | string[];
  error: string;
  statusCode: number;
};

export type QueryResponse<T> = { data: T } & OtherResponseData;

export type QueryArgs<TQueryData, TSelectData = TQueryData> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<AxiosResponse<QueryResponse<TQueryData>>>;
  select?: (data: QueryResponse<TQueryData>) => TSelectData;
  showLoading?: boolean;
  refetchInterval?: number | false;
  options?: Omit<
    UseQueryOptions<
      AxiosResponse<QueryResponse<TQueryData>>,
      AxiosError<QueryErrorResponse>
    >,
    'refetchInterval' | 'select' | 'queryKey'
  >;
  enabled?: boolean;
};

export type MutationArgs<TData, TVariables> = {
  mutationKey: MutationKey;
  mutationFn: MutationFunction<AxiosResponse<QueryResponse<TData>>, TVariables>;
  onSuccess?: (data: QueryResponse<TData>, variables: TVariables) => void;
  onError?: (
    error: AxiosError<QueryErrorResponse>,
    variables: TVariables,
  ) => void;
  onSettled?: (
    data: QueryResponse<TData> | undefined,
    error: AxiosError<QueryErrorResponse> | null,
  ) => void;
  onMutate?: (variables: TVariables) => void;
  showLoading?: boolean;
  options?: Omit<
    MutationOptions<QueryResponse<TData>, AxiosError<QueryErrorResponse>>,
    | 'onMutate'
    | 'onSuccess'
    | 'onError'
    | 'onSettled'
    | 'mutationFn'
    | 'mutationKey'
  >;
};
