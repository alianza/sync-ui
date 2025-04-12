"use client";

import React, { useState } from "react";
import { ResponseStatus, ServerResponse } from "@/lib/types";
import { ListBlobResultBlob } from "@vercel/blob";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatFileSize } from "@/lib/common.utils";

export default function ListingDocuments({
  blobs,
  deleteAction,
  listingTitle,
}: {
  blobs: ListBlobResultBlob[];
  deleteAction: ((formData: FormData) => Promise<ServerResponse<unknown>>) | null;
  listingTitle: string;
}) {
  const [parent] = useAutoAnimate();
  const [currentDocument, setCurrentDocument] = useState<string | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDocumentOpenClick = (documentUrl: string) => {
    setCurrentDocument(documentUrl);
    if (!dialogOpen) setDialogOpen(true);
  };

  return (
    <>
      <div ref={parent} className="flex max-h-128 flex-col gap-4 overflow-y-auto">
        {blobs.length > 0 ? (
          blobs.map((document) => (
            <Card key={document.pathname}>
              <CardHeader className="p-4">
                <a href={document.url} target="_blank" rel="noreferrer" className="underline-hover">
                  {document.pathname.split("/").pop()}
                </a>
                <div className="flex flex-row flex-wrap items-center gap-1">
                  <p className="text-sm text-gray-500">{new Date(document.uploadedAt).toLocaleDateString("nl-NL")}</p>
                  <span className="text-gray-500">|</span>
                  <p className="text-sm text-gray-500">{formatFileSize(document.size)}</p>
                </div>
              </CardHeader>
              <CardContent className="flex flex-row items-center justify-between gap-2">
                <Button variant="outline" className="grow" onClick={() => handleDocumentOpenClick(document.url)}>
                  Openen
                </Button>
                {deleteAction && <DocumentDeleteButton deleteImageAction={deleteAction} url={document.url} />}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center text-gray-500">
            Geen documenten beschikbaar
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="h-full max-h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)]">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>{listingTitle} Afbeeldingen</DialogTitle>
              <DialogDescription>
                Afbeeldingen van {listingTitle}. Klik op het pijltje om naar de volgende afbeelding te gaan.
              </DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
          <div className="relative">
            <object data={currentDocument} type="application/pdf" className="z-10 h-full w-full">
              <p>Dit document kan niet worden weergegeven.</p>
              <embed src={currentDocument} type="application/pdf" className="z-20 h-full w-full" />
            </object>
            <p className="absolute right-0 bottom-0 left-0 -z-10 bg-white p-4 text-center text-sm text-gray-500">
              Dit document kan niet worden weergegeven. Download het document om het te bekijken.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function DocumentDeleteButton({
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
      toast.error(res.message || "Er is een fout opgetreden bij het verwijderen van het document.");
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
          <input type="hidden" name="entity" value={"document"} />
        </form>
      }
      title="Verwijderen"
      description="Weet je zeker dat je dit document wilt verwijderen?"
      asChild
    >
      <Button variant="destructive" className="aspect-square" title="Verwijder document">
        <TrashIcon />
      </Button>
    </ConfirmDialog>
  );
}
