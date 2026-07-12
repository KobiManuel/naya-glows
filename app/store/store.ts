import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userAuthReducer from "./userAuthSlice";
import adminAuthReducer from "./adminAuthSlice";
import { userApi } from "./userApi";
import { adminApi } from "./adminApi";

export function makeStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
      userAuth: userAuthReducer,
      adminAuth: adminAuthReducer,
      [userApi.reducerPath]: userApi.reducer,
      [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware, adminApi.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
