"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import React from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { ResponseStatus, ServerResponse } from "@/lib/types";
import { toast } from "sonner";

export function ImageDeleteButton({
  deleteImageAction,
  url,
}: {
  url: string;
  deleteImageAction: (formData: FormData) => Promise<ServerResponse<unknown>>;
}) {
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await deleteImageAction(formData);
    if (res.status === ResponseStatus.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message || "Er is een fout opgetreden bij het verwijderen van de afbeelding.");
    }
  };

  return (
    <ConfirmDialog
      customAction={
        <form onSubmit={handleDelete}>
          <AlertDialogAction type="submit" className="text-start">
            Bevestigen
          </AlertDialogAction>
          <input type="hidden" name="url" value={url} />
        </form>
      }
      title="Verwijderen"
      description="Weet je zeker dat je deze afbeelding wilt verwijderen?"
      asChild
    >
      <Button variant="destructive" className="absolute top-2 right-2" title="Verwijder afbeelding">
        <TrashIcon />
      </Button>
    </ConfirmDialog>
  );
}
