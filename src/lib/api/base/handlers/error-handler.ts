import { create } from 'zustand';

import { QueryErrorResponse } from '../react-query/react-query-base.type';

type ErrorHandlerActions = {
  dispatch: (error: QueryErrorResponse | null) => void;
};
type ErrorHandlerState = { error: QueryErrorResponse | null };

export const useErrorHandler = create<ErrorHandlerState & ErrorHandlerActions>(
  set => ({
    error: null,
    dispatch: error => set(() => ({ error })),
  }),
);
