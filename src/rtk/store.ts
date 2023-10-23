import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { getPersistConfig } from 'redux-deep-persist';
import rootReducer from "./reducers";

const logger = createLogger();

const persistConfig = getPersistConfig({
  key: "root",
  storage,
  whitelist: [],
  rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger, thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
