import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "CUSTOMER";
  country: string | null;
  currency: string;
  createdAt: string;
};

type AuthState = { token: string | null; user: AuthUser | null; hydrated: boolean };

const initialState: AuthState = { token: null, user: null, hydrated: false };

const userAuthSlice = createSlice({
  name: "userAuth",
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

export const { setCredentials, hydrateToken, clearAuth } = userAuthSlice.actions;
export default userAuthSlice.reducer;

export const USER_TOKEN_KEY = "naya-glows-user-token";
