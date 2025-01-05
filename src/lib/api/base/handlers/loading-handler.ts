import { create } from 'zustand';

/**
 * Actions for managing the loading state.
 */
export type LoadingHandlerActions = {
  /**
   * Starts the loading process by setting `isLoading` to `true`.
   */
  startLoading: () => void;

  /**
   * Stops the loading process by setting `isLoading` to `false`.
   */
  stopLoading: () => void;
};

/**
 * The state managed by the loading handler.
 */
export type LoadingHandlerState = {
  /**
   * Indicates whether the loading process is active.
   */
  isLoading: boolean;
};

/**
 * A Zustand store for managing loading state and actions.
 */
export const useLoadingHandler = create<
  LoadingHandlerState & LoadingHandlerActions
>(set => ({
  isLoading: false,
  startLoading: () => set(() => ({ isLoading: true })),
  stopLoading: () => set(() => ({ isLoading: false })),
}));
