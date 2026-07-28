<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Naya Glows conventions

These are standing conventions for this codebase, established from direct user
feedback. Follow them for every new button/mutation/error path, not just the
ones already fixed.

## Every button that makes a request needs a loading state

- Use RTK Query's own `isLoading`/`isFetching` from the mutation hook's
  returned tuple — never a hand-rolled `useState` for "is this request in
  flight". RTK Query already tracks this; a parallel `useState` is redundant
  and can drift out of sync.
- **List rows (e.g. a delete button per row):** don't add a `useState` to
  track "which row is being deleted". Destructure `originalArgs` from the
  mutation hook's state — it holds the args of the most recent call — and
  compare it to the row's own identifier:
  ```tsx
  const [deleteEntry, { isLoading: deleting, originalArgs: deletingId }] =
    useDeleteEntryMutation();
  // ...
  disabled={deleting && deletingId === row.id}
  ```
- **Custom hooks that wrap a mutation** (e.g. `useUserAuth`'s `login`,
  `updateProfile`, `changePassword`, `useAdminAuth`'s `login`): destructure
  `isLoading` from the underlying mutation hook inside the custom hook and
  return it alongside the wrapped function (e.g. `updatingProfile`,
  `changingPassword`, `loggingIn`), so consumers use that directly instead of
  their own `useState`.
- **One button that can trigger one of several mutations** depending on mode
  (e.g. sign-in vs. create-account vs. resend-OTP on the same submit button):
  OR the individual `isLoading` flags together. They never fire concurrently
  from the same click, so this gives one accurate "busy" signal with no
  separate state to keep in sync.
- Local `useState` for "is this submitting" is only legitimate when a single
  handler orchestrates multiple *sequential* async steps that aren't 1:1 with
  one mutation call (rare) — reach for RTK's built-in state first.

## Every backend error must be visible somewhere on the frontend

- Every `.unwrap()`'d mutation call needs a `try/catch` that shows the error —
  `toast.error(getApiErrorMessage(err, "fallback message"))` for most cases,
  or an inline `setError(...)` where the page already has an error slot (e.g.
  signin, admin login).
- If a mutation is wrapped by a custom hook (`useUserAuth`, `useAdminAuth`),
  the hook itself should NOT swallow/catch the error — let it propagate so
  the calling component's `try/catch` can surface it. Don't double-catch.
- Silent failures are only acceptable for true background/best-effort syncs
  with no user-facing action tied to them (e.g. `StoreHydrator`'s debounced
  cart-sync-to-backend — the cart itself lives in Redux regardless of
  whether the sync succeeds).

## Every backend error must be logged with user-identifying info

- Routes wrapped in `asyncHandler` funnel uncaught errors to the global
  error handler in `backend/src/app.ts`, which already logs
  `${method} ${url} — user=${req.auth?.userId ?? "anonymous"} role=${req.auth?.role ?? "none"}`
  alongside the raw error. Prefer `asyncHandler` + letting errors propagate
  over a local `try/catch` that returns a response directly — the global
  handler's logging is the whole point.
- If a route handler must catch locally (e.g. to return a specific error
  message, like `uploads.routes.ts`'s Cloudinary failure message), log with
  the same `user=/role=` format manually in the catch block before
  responding — don't let a locally-caught error skip logging entirely.
- `AppError` catches that return a 4xx directly (validation/expected errors)
  don't need this — they're not the "something broke, go check Railway logs"
  case this convention is for.
