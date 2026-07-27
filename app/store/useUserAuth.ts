"use client";

import { useAppDispatch, useAppSelector } from "./hooks";
import {
  useLoginMutation,
  useRegisterMutation,
  useUpgradeInfluencerMutation,
  useGetMeQuery,
} from "./userApi";
import { setCredentials, clearAuth, USER_TOKEN_KEY } from "./userAuthSlice";

export function useUserAuth() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.userAuth.token);
  const storedUser = useAppSelector((s) => s.userAuth.user);
  const hydrated = useAppSelector((s) => s.userAuth.hydrated);

  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [upgradeInfluencerMutation] = useUpgradeInfluencerMutation();
  const { data: meData, isLoading: meLoading } = useGetMeQuery(undefined, { skip: !token });

  const user = meData?.user ?? storedUser;
  const loading = !hydrated || (Boolean(token) && meLoading);

  const login = async (email: string, password: string) => {
    const res = await loginMutation({ email, password }).unwrap();
    localStorage.setItem(USER_TOKEN_KEY, res.token);
    dispatch(setCredentials(res));
    return res.user;
  };

  const register = async (input: {
    email: string;
    password: string;
    name: string;
    country?: string;
    referralCode?: string;
  }) => {
    const res = await registerMutation(input).unwrap();
    localStorage.setItem(USER_TOKEN_KEY, res.token);
    dispatch(setCredentials(res));
    return res.user;
  };

  const upgradeInfluencer = async (input: {
    platform?: string;
    socialHandle?: string;
    bio?: string;
  }) => {
    const res = await upgradeInfluencerMutation(input).unwrap();
    localStorage.setItem(USER_TOKEN_KEY, res.token);
    dispatch(setCredentials(res));
    return res.user;
  };

  const logout = () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    dispatch(clearAuth());
  };

  return { user: user ?? null, token, loading, login, register, upgradeInfluencer, logout };
}
