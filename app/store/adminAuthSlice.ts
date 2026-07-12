import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "./userAuthSlice";

export type { AuthUser };

type AuthState = { token: string | null; user: AuthUser | null; hydrated: boolean };

const initialState: AuthState = { token: null, user: null, hydrated: false };

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; user: AuthUser }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    hydrateToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.hydrated = true;
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, hydrateToken, clearAuth } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

export const ADMIN_TOKEN_KEY = "naya-glows-admin-token";
