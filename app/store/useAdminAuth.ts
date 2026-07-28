"use client";

import { useAppDispatch, useAppSelector } from "./hooks";
import { adminApi, useLoginMutation, useGetMeQuery } from "./adminApi";
import { setCredentials, clearAuth, ADMIN_TOKEN_KEY } from "./adminAuthSlice";

export function useAdminAuth() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.adminAuth.token);
  const storedUser = useAppSelector((s) => s.adminAuth.user);
  const hydrated = useAppSelector((s) => s.adminAuth.hydrated);

  const [loginMutation, { isLoading: loggingIn }] = useLoginMutation();
  const { data: meData, isLoading: meLoading } = useGetMeQuery(undefined, { skip: !token });

  const user = meData?.user ?? storedUser;
  const loading = !hydrated || (Boolean(token) && meLoading);

  // See useUserAuth's login/logout for why this reset matters — cached
  // queries aren't keyed by token, so without it a previous admin session's
  // data could keep surfacing after a logout or a different admin signing in.
  const login = async (email: string, password: string) => {
    dispatch(adminApi.util.resetApiState());
    const res = await loginMutation({ email, password }).unwrap();
    localStorage.setItem(ADMIN_TOKEN_KEY, res.token);
    dispatch(setCredentials(res));
    return res.user;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    dispatch(clearAuth());
    dispatch(adminApi.util.resetApiState());
  };

  return { user: user ?? null, token, loading, login, loggingIn, logout };
}
