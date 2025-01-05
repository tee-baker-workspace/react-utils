import { create } from 'zustand';

import { QueryErrorResponse } from '../react-query/react-query-base.type';

/**
 * Actions available for the error handler.
 */
export type ErrorHandlerActions = {
  /**
   * Dispatches an error to update the state.
   * @param error - The error to set, or null to clear the error.
   */
  dispatch: (error: QueryErrorResponse | null) => void;
};

/**
 * The state managed by the error handler.
 */
export type ErrorHandlerState = {
  /**
   * The current error, or null if no error exists.
   */
  error: QueryErrorResponse | null;
};

/**
 * A Zustand store for managing error state and actions.
 */
export const useErrorHandler = create<ErrorHandlerState & ErrorHandlerActions>(
  set => ({
    error: null,
    dispatch: error => set(() => ({ error })),
  }),
);
