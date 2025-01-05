import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiUrlType } from './lib/api/base/api-urls/api-urls';
import {
  MutationArgs,
  QueryArgs,
  QueryErrorResponse,
} from './lib/api/base/react-query/react-query-base.type';

export {
  InfiniteQueryResponse,
  MutationArgs,
  OtherResponseData,
  QueryArgs,
  QueryErrorResponse,
  QueryResponse,
} from './lib/api/base/react-query/react-query-base.type';

export {
  ErrorHandlerActions,
  ErrorHandlerState,
} from './lib/api/base/handlers/error-handler';

export {
  LoadingHandlerActions,
  LoadingHandlerState,
} from './lib/api/base/handlers/loading-handler';

export {
  SessionHandlerActions,
  SessionHandlerState,
} from './lib/api/base/handlers/session-handler';

/**
 * A Zustand store for managing error state.
 */
export declare const useErrorHandler: StoreApi<
  ErrorHandlerState & ErrorHandlerActions
>;

/**
 * A Zustand store for managing loading state.
 */
export declare const useLoadingHandler: StoreApi<
  LoadingHandlerState & LoadingHandlerActions
>;

/**
 * A Zustand store for managing session state and actions.
 */
export declare const useSessionHandler: StoreApi<
  SessionHandlerState & SessionHandlerActions
>;

/**
 * The QueryClient instance configured with custom mutation and query caches.
 */
export declare const ReactQueryClient: QueryClient;

/**
 * React component for providing the QueryClient to your application.
 * @param children - The children components that will have access to the QueryClient.
 */
export declare const ReactQueryProvider: ({
  children,
}: PropsWithChildren) => JSX.Element;

/**
 * Hook for executing a query with React Query and custom behavior.
 * @template TQueryData - The type of data returned by the query.
 * @template TSelectData - The type of data after the `select` transformation (optional, defaults to `TQueryData`).
 * @param args - Configuration options for the query.
 * @returns The query result and additional metadata.
 */
export declare function useAppQuery<TQueryData, TSelectData = TQueryData>(
  args: QueryArgs<TQueryData, TSelectData>,
): {
  isLoading: boolean;
  queryKey: QueryKey;
  [key: string]: unknown;
};

/**
 * Hook for executing a mutation with React Query and custom behavior.
 * @template TData - The type of data returned by the mutation.
 * @template TVariables - The type of variables passed to the mutation.
 * @param args - Configuration options for the mutation.
 * @returns The mutation result and additional metadata.
 */
export declare function useAppMutation<TData, TVariables>(
  args: MutationArgs<TData, TVariables>,
): {
  mutate: (
    variables: TVariables,
    options?: UseMutationOptions<
      TData,
      AxiosError<QueryErrorResponse>,
      TVariables
    >,
  ) => void;
  [key: string]: unknown;
};

export declare class AxiosClient {
  constructor(baseUrl: string, token: string | (() => Promise<string | null>));

  /**
   * Sends a GET request to the specified URL.
   * @param url - The URL to send the request to.
   * @param config - Optional Axios request configuration.
   * @returns A promise resolving to the Axios response.
   */
  get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;

  /**
   * Sends a POST request to the specified URL.
   * @param url - The URL to send the request to.
   * @param data - Optional data to include in the request body.
   * @param config - Optional Axios request configuration.
   * @returns A promise resolving to the Axios response.
   */
  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;

  /**
   * Sends a PUT request to the specified URL.
   * @param url - The URL to send the request to.
   * @param data - Optional data to include in the request body.
   * @param config - Optional Axios request configuration.
   * @returns A promise resolving to the Axios response.
   */
  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;

  /**
   * Sends a PATCH request to the specified URL.
   * @param url - The URL to send the request to.
   * @param data - Optional data to include in the request body.
   * @param config - Optional Axios request configuration.
   * @returns A promise resolving to the Axios response.
   */
  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;

  /**
   * Sends a DELETE request to the specified URL.
   * @param url - The URL to send the request to.
   * @param config - Optional Axios request configuration.
   * @returns A promise resolving to the Axios response.
   */
  delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
}

export declare const API_URLS: ApiUrlType;

/**
 * The i18n instance used for internationalization in the application.
 */
export declare const i18n: I18nInstance;

/**
 * Updates the current language for the application.
 * @param lng - The language code to switch to (e.g., 'en', 'fr').
 */
export declare function updateLanguage(lng: string): void;
