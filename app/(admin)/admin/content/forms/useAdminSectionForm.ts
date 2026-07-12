"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useGetContentQuery } from "../../../../store/userApi";
import { useUpsertContentMutation } from "../../../../store/adminApi";
import { getApiErrorMessage } from "../../../../store/apiError";
import { mergeContent } from "../../../../store/useSectionContent";
import { isApiConfigured } from "@/lib/api";

// Shared load-once-then-edit-locally-then-save pattern for every section
// form: seeds local form state from `default merged with saved override`
// exactly once (so it doesn't clobber in-progress edits on a background
// refetch), then saves back via the same admin upsertContent mutation.
export function useAdminSectionForm<T extends Record<string, unknown>>(key: string, defaults: T) {
  const { data, isLoading } = useGetContentQuery(key, { skip: !isApiConfigured() });
  const [upsertContent, { isLoading: saving }] = useUpsertContentMutation();
  const [form, setForm] = useState<T>(defaults);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current || isLoading) return;
    setForm(mergeContent(defaults, data?.block?.data));
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsertContent({ key, data: form }).unwrap();
      toast.success("Section updated");
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };

  return { form, setForm, save, saving, loading: isLoading && !hydrated.current };
}
