import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export function getApiErrorMessage(
  err: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (err && typeof err === "object") {
    const e = err as FetchBaseQueryError | SerializedError;
    if ("data" in e && e.data && typeof e.data === "object" && "error" in (e.data as object)) {
      const msg = (e.data as { error?: unknown }).error;
      if (typeof msg === "string") return msg;
    }
    if ("message" in e && typeof e.message === "string") return e.message;
  }
  return fallback;
}
