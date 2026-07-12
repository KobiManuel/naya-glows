import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import type { RootState } from "./store";
import { clearAuth as clearUserAuth, USER_TOKEN_KEY, type AuthUser } from "./userAuthSlice";
import type { Product } from "@/lib/products";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userAuth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// 401 interceptor: clears the customer session, toasts, and sends the user
// back to /signin — kept separate from adminApi's version so an admin
// session in the same browser is never touched by a customer 401.
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    api.dispatch(clearUserAuth());
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_TOKEN_KEY);
      toast.error("Session expired — please sign in again.");
      window.location.href = "/signin";
    }
  }
  return result;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["SavedProducts"],
  endpoints: (builder) => ({
    register: builder.mutation<
      { user: AuthUser; token: string },
      { email: string; password: string; name: string; country?: string }
    >({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    login: builder.mutation<
      { user: AuthUser; token: string },
      { email: string; password: string }
    >({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    getMe: builder.query<{ user: AuthUser }, void>({
      query: () => "/auth/me",
    }),
    createOrder: builder.mutation<
      { order: { id: string } },
      {
        items: { slug: string; qty: number; isSubscription?: boolean }[];
        shippingDetails: Record<string, string>;
      }
    >({
      query: (body) => ({ url: "/orders", method: "POST", body }),
    }),
    trackOrder: builder.query<
      {
        order: {
          id: string;
          status: string;
          total: number;
          currency: string;
          items: { qty: number; product: { name: string } }[];
        };
        tracking: {
          currentStage: string | null;
          stages: { key: string; label: string; date: string; reached: boolean }[];
          estimatedDelivery: string | null;
        };
      },
      { id: string; email: string }
    >({
      query: ({ id, email }) => `/orders/track/${id}?email=${encodeURIComponent(email)}`,
    }),
    initializePayment: builder.mutation<
      { authorizationUrl: string; reference: string },
      { orderId: string }
    >({
      query: (body) => ({ url: "/payments/paystack/initialize", method: "POST", body }),
    }),
    verifyPayment: builder.query<
      { order: { id: string; status: string }; payment: { status: string } },
      string
    >({
      query: (reference) => `/payments/paystack/verify/${reference}`,
    }),
    // Public single-key content lookup. The backend returns 404 when no
    // override exists for this key — that's expected, not an error, so
    // callers (useSectionContent) treat a failed/empty result as "use the
    // hardcoded default" rather than surfacing it.
    getContent: builder.query<{ block: { key: string; data: unknown } }, string>({
      query: (key) => `/content/${key}`,
    }),
    submitConsultation: builder.mutation<
      { request: { id: string } },
      {
        name: string;
        email: string;
        phone?: string;
        skinConcern: string;
        preferredDate?: string;
        message?: string;
      }
    >({
      query: (body) => ({ url: "/consultations", method: "POST", body }),
    }),
    submitWholesaleInquiry: builder.mutation<
      { inquiry: { id: string } },
      { businessName: string; contactName: string; email: string; phone?: string; message?: string }
    >({
      query: (body) => ({ url: "/wholesale-inquiries", method: "POST", body }),
    }),
    submitContactMessage: builder.mutation<
      { contactMessage: { id: string } },
      { name: string; email: string; subject?: string; message: string }
    >({
      query: (body) => ({ url: "/contact-messages", method: "POST", body }),
    }),
    subscribeNewsletter: builder.mutation<{ subscribed: boolean }, { email: string }>({
      query: (body) => ({ url: "/newsletter/subscribe", method: "POST", body }),
    }),
    getPublicSettings: builder.query<
      { settings: { usdToNgnRate: number; subscriptionDiscountPercent: number } },
      void
    >({
      query: () => "/settings/public",
    }),
    toggleSavedProduct: builder.mutation<{ saved: boolean }, { slug: string }>({
      query: (body) => ({ url: "/saved-products/toggle", method: "POST", body }),
      invalidatesTags: [{ type: "SavedProducts", id: "LIST" }],
    }),
    listSavedProducts: builder.query<Product[], void>({
      query: () => "/saved-products/my",
      transformResponse: (res: { products: Product[] }) => res.products,
      providesTags: [{ type: "SavedProducts", id: "LIST" }],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useCreateOrderMutation,
  useInitializePaymentMutation,
  useVerifyPaymentQuery,
  useGetContentQuery,
  useTrackOrderQuery,
  useSubmitConsultationMutation,
  useSubmitWholesaleInquiryMutation,
  useSubmitContactMessageMutation,
  useSubscribeNewsletterMutation,
  useGetPublicSettingsQuery,
  useToggleSavedProductMutation,
  useListSavedProductsQuery,
} = userApi;
