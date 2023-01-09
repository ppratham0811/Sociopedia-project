import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // PERSIST,
  // REGISTER,
  // PAUSE,
  // PURGE,
  // REHYDRATE,
} from "redux-persist";
import LocalStorage from "redux-persist/lib/storage";
import authReducer from "./state";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: LocalStorage,
};

export const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk]
});

export const persistor = persistStore(store);
