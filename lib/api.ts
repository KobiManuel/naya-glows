const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {}

async function request<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {},
): Promise<T> {
  if (!API_URL) throw new ApiError("NEXT_PUBLIC_API_URL is not configured");

  const { token, headers, ...rest } = options;
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    // Next.js caches a bare server-side fetch() indefinitely by default
    // (and, for a route with no other dynamic API in use, prerenders the
    // whole page statically at build time on top of that) — meaning any
    // admin change (a price edit, restocking a product, a content update)
    // would never show up until the next Vercel deploy. Every request this
    // app makes is either public read data that must reflect the current
    // DB, or an authenticated/mutating call — neither should ever be
    // served from a stale cache.
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body?.error || `Request failed with status ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, token?: string | null) => request<T>(path, { method: "GET", token }),
  post: <T>(path: string, body?: unknown, token?: string | null) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body), token }),
  put: <T>(path: string, body?: unknown, token?: string | null) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body), token }),
  del: <T>(path: string, token?: string | null) =>
    request<T>(path, { method: "DELETE", token }),
};

export function isApiConfigured() {
  return Boolean(API_URL);
}
