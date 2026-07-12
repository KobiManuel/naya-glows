"use client";

import { useAppDispatch, useAppSelector } from "./hooks";
import { useLoginMutation, useGetMeQuery } from "./adminApi";
import { setCredentials, clearAuth, ADMIN_TOKEN_KEY } from "./adminAuthSlice";

export function useAdminAuth() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.adminAuth.token);
  const storedUser = useAppSelector((s) => s.adminAuth.user);
  const hydrated = useAppSelector((s) => s.adminAuth.hydrated);

  const [loginMutation] = useLoginMutation();
  const { data: meData, isLoading: meLoading } = useGetMeQuery(undefined, { skip: !token });

  const user = meData?.user ?? storedUser;
  const loading = !hydrated || (Boolean(token) && meLoading);

  const login = async (email: string, password: string) => {
    const res = await loginMutation({ email, password }).unwrap();
    localStorage.setItem(ADMIN_TOKEN_KEY, res.token);
    dispatch(setCredentials(res));
    return res.user;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    dispatch(clearAuth());
  };

  return { user: user ?? null, token, loading, login, logout };
}
