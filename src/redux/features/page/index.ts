import { pageValue, pageActions } from "./page.slice";

export interface pageState {
  page: pageValue;
}

export const { putCurrentNumber, putLocation, putSearchWord } = pageActions;

export const selectPage = (state: pageState) => state.page;
