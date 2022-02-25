import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface pageValue {
  currentPage: number;
  location: string;
  searchWord: string;
}

const initialState: pageValue = {
  currentPage: 0,
  location: '',
  searchWord: '',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    putCurrentNumber: (state, action: PayloadAction<number>) => ({
      ...state,
      currentPage: action.payload,
    }),
    putLocation: (state, action: PayloadAction<string>) => ({
      ...state,
      location: action.payload,
    }),
    putSearchWord: (state, action: PayloadAction<string>) => ({
      ...state,
      searchWord: action.payload,
    }),
  },
});

export const pageActions = pageSlice.actions;

export default pageSlice.reducer;
