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
