"use client";

import { Input } from "@/components/forms/input/Input";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import { ServerResponse } from "@/lib/types";

export default function ImageUploadForm({
  uploadImageAction,
}: {
  uploadImageAction: (formData: FormData) => Promise<ServerResponse<unknown>>;
}) {
  const handleImageUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await uploadImageAction(formData);
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error(res.message || "Er is een fout opgetreden bij het uploaden van de afbeelding.");
    }
  };

  return (
    <form onSubmit={handleImageUpload} className="flex flex-col gap-2">
      <Input label="Afbeelding" type="file" accept="image/*" id="image" name="image" required />
      <Button>Upload</Button>
    </form>
  );
}
