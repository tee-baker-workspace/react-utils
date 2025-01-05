import { create } from 'zustand';

import { IUser } from 'shared-utils';

/**
 * Actions for managing the session state.
 */
export type SessionHandlerActions = {
  /**
   * Updates the session state.
   * @param session - The user session object or `null` to clear the session.
   * @param isNewUser - Indicates if the session belongs to a new user (optional).
   */
  dispatch: (session: IUser | null, isNewUser?: boolean) => void;
};

/**
 * The state managed by the session handler.
 */
export type SessionHandlerState = {
  /**
   * The current user session, or `null` if no session exists.
   */
  session: IUser | null;

  /**
   * Indicates whether the current session is for a new user.
   */
  isNewUser: boolean;
};

/**
 * A Zustand store for managing session state and actions.
 */
export const useSessionHandler = create<
  SessionHandlerState & SessionHandlerActions
>(set => ({
  session: null,
  isNewUser: false,
  dispatch: (session, isNewUser) =>
    set(() => ({ session, isNewUser: isNewUser })),
}));
