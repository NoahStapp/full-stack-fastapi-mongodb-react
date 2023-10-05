import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import toastsReducer from "./slices/toastsSlice";
import tokensReducer from "./slices/tokensSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toasts: toastsReducer,
    tokens: tokensReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState, toasts: ToastsState, tokens: TokensState}
export type AppDispatch = typeof store.dispatch;
