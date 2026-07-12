"use client";

import { useGetContentQuery } from "./userApi";
import { isApiConfigured } from "@/lib/api";

export function mergeContent<T extends Record<string, unknown>>(
  defaults: T,
  override: unknown,
): T {
  if (!override || typeof override !== "object") return defaults;
  return { ...defaults, ...(override as Partial<T>) };
}

// Merges a backend ContentBlock override over a hardcoded default. Any
// fetch failure (backend unset/unreachable) or 404 (no override saved yet)
// silently resolves to `defaults` — never an error state a visitor can see.
// Object fields merge shallowly (an admin can set just one field); array
// fields (ingredient lists, steps, testimonials, categories) are replaced
// wholesale when present, since "the list" is the natural editable unit.
export function useSectionContent<T extends Record<string, unknown>>(key: string, defaults: T): T {
  const { data } = useGetContentQuery(key, { skip: !isApiConfigured() });
  return mergeContent(defaults, data?.block?.data);
}

// `isLoading` (not `isFetching`) deliberately — true only until the first
// resolution (override found, none found, or request failed), so a skeleton
// shows once on initial load and never flickers back in on a background
// refetch. Safe to call alongside useSectionContent for the same key: RTK
// Query dedupes identical query subscriptions, so this doesn't add a
// second network request.
export function useSectionLoading(key: string): boolean {
  const { isLoading } = useGetContentQuery(key, { skip: !isApiConfigured() });
  return isLoading;
}
