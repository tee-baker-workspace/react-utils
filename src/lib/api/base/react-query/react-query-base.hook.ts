import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { pathOr } from 'ramda';
import { useEffect } from 'react';

import { useLoadingHandler } from '../handlers/loading-handler';
import {
  MutationArgs,
  QueryArgs,
  QueryErrorResponse,
  QueryResponse,
} from './react-query-base.type';

/**
 * Hook for executing a query with React Query and custom behavior.
 * @template TQueryData - The type of data returned by the query.
 * @template TSelectData - The type of data after the `select` transformation (optional, defaults to `TQueryData`).
 * @param args - Configuration options for the query.
 * @returns The query result and additional metadata.
 */
export const useAppQuery = <TQueryData, TSelectData = TQueryData>(
  args: QueryArgs<TQueryData, TSelectData>,
) => {
  const {
    queryFn,
    queryKey,
    select,
    showLoading,
    options,
    refetchInterval,
    enabled = true,
  } = args;

  const { startLoading, stopLoading } = useLoadingHandler();

  const { isLoading, ...query } = useQuery<
    AxiosResponse<QueryResponse<TQueryData>>,
    AxiosError<QueryErrorResponse>,
    TSelectData,
    QueryKey
  >({
    ...options,
    queryKey,
    queryFn: async params => {
      const response = await queryFn(params);
      return response;
    },
    select: data => {
      const formattedData = pathOr(null, ['data', 'data'], data) as TSelectData;
      if (select) {
        return select(data.data);
      }
      return formattedData;
    },
    refetchInterval,
    enabled,
  });

  useEffect(() => {
    if (isLoading && showLoading) {
      startLoading();
    }
    if (!isLoading && showLoading) {
      stopLoading();
    }
  }, [isLoading]);

  return { isLoading, ...query };
};

/**
 * Hook for executing a mutation with React Query and custom behavior.
 * @template TData - The type of data returned by the mutation.
 * @template TVariables - The type of variables passed to the mutation.
 * @param args - Configuration options for the mutation.
 * @returns The mutation result and additional metadata.
 */
export const useAppMutation = <TData, TVariables>(
  args: MutationArgs<TData, TVariables>,
) => {
  const {
    onError,
    onMutate,
    onSettled,
    onSuccess,
    mutationFn,
    options,
    showLoading,
  } = args;

  const { startLoading, stopLoading } = useLoadingHandler();

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (data, variables) => {
      if (onSuccess) {
        onSuccess(data.data, variables);
      }
    },

    onMutate: variables => {
      if (showLoading) {
        startLoading();
      }
      if (onMutate) {
        onMutate(variables);
      }
    },

    onError: (error, variables) => {
      if (onError) {
        onError(error, variables);
      }
    },

    onSettled: (data, error) => {
      if (showLoading) {
        stopLoading();
      }
      if (onSettled) {
        onSettled(data?.data, error);
      }
    },
  });
};
