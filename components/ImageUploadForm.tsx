"use client";

import { Input } from "@/components/forms/input/Input";
import React, { startTransition, useActionState } from "react";
import { toast } from "sonner";
import { initialActionState, ResponseStatus, ServerResponse } from "@/lib/types";
import { SubmitButton } from "@/components/SubmitButton";

export default function ImageUploadForm({
  uploadImageAction,
}: {
  uploadImageAction: (prevState: unknown, formData: FormData) => Promise<ServerResponse<unknown>>;
}) {
  const [state, action] = useActionState(uploadImageAction, initialActionState);

  const handleImageUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  };

  React.useEffect(() => {
    if (state.status === ResponseStatus.success) {
      toast.success(state.message);
    } else if (state.status === ResponseStatus.error) {
      toast.error(state.message || "Er is een fout opgetreden bij het uploaden van de afbeelding.");
    }
  }, [state]);

  return (
    <form onSubmit={handleImageUpload} className="flex flex-col gap-2">
      <Input label="Afbeelding" type="file" accept="image/*" id="image" name="image" required />
      <SubmitButton label="Uploaden" loadingLabel="Uploaden..." />
    </form>
  );
}
