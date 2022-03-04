import { Action, createStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import pageReducer from "./features/page/page.slice";
import { devToolsEnhancer } from "@redux-devtools/extension";
import counter from "./modules/counter";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  page: pageReducer,
  counter,
});

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(enhancedReducer, devToolsEnhancer({}));

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>; // rootReducer의 타입을 반환
