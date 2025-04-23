"use client";

import { Input } from "@/components/forms/input/Input";
import React, { startTransition, useActionState } from "react";
import { toast } from "sonner";
import { initialActionState, ResponseStatus, ServerResponse } from "@/lib/types";
import { SubmitButton } from "@/components/SubmitButton";

export default function ImageUploadForm({
  fileUploadAction,
}: {
  fileUploadAction: (prevState: unknown, formData: FormData) => Promise<ServerResponse<unknown>>;
}) {
  const [state, action] = useActionState(fileUploadAction, initialActionState);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const maxFileSize = parseFloat(process.env.NEXT_PUBLIC_BLOB_MAX_FILE_SIZE || "4.5") * 1024 * 1024; // 4.5MB
    const file = formData.get("file") as File;
    if (file && file.size > maxFileSize) return toast.error("Het bestand is te groot. Maximaal 4.5MB.");

    startTransition(() => action(formData));
  };

  React.useEffect(() => {
    if (state.status === ResponseStatus.success) {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (state.status !== ResponseStatus.pending) {
      toast.error(state.message || "Er is een fout opgetreden bij het uploaden van de afbeelding.");
    }
  }, [state]);

  return (
    <form ref={formRef} onSubmit={handleFileUpload} className="flex flex-col gap-2">
      <Input
        label="Bestand"
        type="file"
        accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, image/*"
        id="file"
        name="file"
        // required
        className="leading-6"
      />
      <SubmitButton label="Uploaden" loadingLabel="Uploaden..." />
    </form>
  );
}
