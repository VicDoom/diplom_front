import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../api/api";
import { authReducer } from "./auth/reducer";

export const store = configureStore({
  reducer: combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  }),
  middleware: (getDefaultMiddleware ) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);