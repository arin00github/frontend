import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IAuthValue = {
  isLogin: boolean;
  state: string;
};

const initalState: IAuthValue = {
  isLogin: false,
  state: "close",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initalState,
  reducers: {
    getLogin: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLogin: action.payload,
    }),
    getState: (state, action: PayloadAction<string>) => ({
      ...state,
      state: action.payload,
    }),
  },
});

export const authAction = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
