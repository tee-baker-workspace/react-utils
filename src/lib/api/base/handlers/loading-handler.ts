import { create } from 'zustand';

type LoadingHandlerActions = {
  startLoading: () => void;
  stopLoading: () => void;
};
type LoadingHandlerState = { isLoading: boolean };

export const useLoadingHandler = create<
  LoadingHandlerState & LoadingHandlerActions
>(set => ({
  isLoading: false,
  startLoading: () => set(() => ({ isLoading: true })),
  stopLoading: () => set(() => ({ isLoading: false })),
}));
