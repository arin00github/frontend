import { IAuthValue, authAction } from "./auth.slice";

interface IAuthState {
  auth: IAuthValue;
}

export const { getLogin, getState } = authAction;

export const selectAuth = (state: IAuthState) => state.auth;
