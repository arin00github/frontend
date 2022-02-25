import { Action, createStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import pageReducer from "./features/page/page.slice";
import { devToolsEnhancer } from "@redux-devtools/extension";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  page: pageReducer,
});

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(enhancedReducer, devToolsEnhancer({}));

export const persistor = persistStore(store);
