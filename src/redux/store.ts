import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, PreloadedState, Store } from "redux";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
import authReducer from "./auth/auth.slice";

export const persistConfig = {
  key: "root",
  storage: storage,
};

export const rootReducer = combineReducers({
  auth: authReducer,
});

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: enhancedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    preloadedState,
  });
}

export const store = configureStore({
  reducer: enhancedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
