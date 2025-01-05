import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { PropsWithChildren } from 'react';

import { useErrorHandler } from '../handlers/error-handler';
import { QueryErrorResponse } from './react-query-base.type';

const onError = (error: Error) => {
  if (axios.isAxiosError(error)) {
    const errorResponse = (error as AxiosError<QueryErrorResponse>)?.response
      ?.data;
    if (errorResponse)
      useErrorHandler.setState(() => ({ error: errorResponse }));
    else
      useErrorHandler.setState(() => ({
        error: {
          error: 'error',
          message: error?.message,
          statusCode: Number(error?.status),
        },
      }));
    return;
  }
};
const ReactQueryClient = new QueryClient({
  mutationCache: new MutationCache({ onError }),
  queryCache: new QueryCache({ onError }),
});

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={ReactQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
