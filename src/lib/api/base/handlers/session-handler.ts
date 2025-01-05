import { create } from 'zustand';

import { IUser } from 'shared-utils';

type SessionHandlerActions = {
  dispatch: (session: IUser | null, isNewUser?: boolean) => void;
};
type SessionHandlerState = { session: IUser | null; isNewUser: boolean };

export const useSessionHandler = create<
  SessionHandlerState & SessionHandlerActions
>(set => ({
  session: null,
  isNewUser: false,
  dispatch: (session, isNewUser) =>
    set(() => ({ session, isNewUser: isNewUser })),
}));
