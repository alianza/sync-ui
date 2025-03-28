"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import React from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import { AlertDialogAction } from "@/components/ui/alert-dialog";

export function ImageDeleteButton({
  deleteImageAction,
  url,
}: {
  url: string;
  deleteImageAction: (url: string) => Promise<void>;
}) {
  return (
    <ConfirmDialog
      onConfirm={() => deleteImageAction(url)}
      title="Verwijderen"
      description="Weet je zeker dat je deze afbeelding wilt verwijderen?"
      className="underline-hover p-2 text-start text-sm font-bold underline-offset-4"
      asChild
    >
      <Button variant="destructive" className="absolute top-2 right-2" title="Verwijder afbeelding">
        <TrashIcon />
      </Button>
    </ConfirmDialog>
  );
}
