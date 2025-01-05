/* eslint-disable @typescript-eslint/no-explicit-any */

export type ApiUrlType = {
  [key: string]: string | ((params: any) => string);
};

export const API_URLS = {
  verifySession: 'auth/verify-session',
  login: `auth/login`,
  signup: 'auth/register',

  // users
  updateUser: 'users',
};
