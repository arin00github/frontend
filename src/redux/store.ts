import {
  Action,
  createStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import pageReducer from "./features/page/page.slice";
import {
  devToolsEnhancer,
  composeWithDevTools,
} from "@redux-devtools/extension";
import counter from "./modules/counter";
import myLogger from "./middlewares/myLogger";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  page: pageReducer,
  counter,
});

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  enhancedReducer,
  composeWithDevTools(applyMiddleware(myLogger))
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>; // rootReducer의 타입을 반환
