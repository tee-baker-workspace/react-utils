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

/**
 * Handles errors for React Query operations.
 * @param error - The error object.
 */
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

/**
 * The QueryClient instance configured with custom mutation and query caches.
 */
const ReactQueryClient = new QueryClient({
  mutationCache: new MutationCache({ onError }),
  queryCache: new QueryCache({ onError }),
});

/**
 * React component for providing the QueryClient to your application.
 * @param children - The children components that will have access to the QueryClient.
 */
export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={ReactQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
