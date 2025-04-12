"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ResponseStatus, ServerResponse } from "@/lib/types";
import { ListBlobResultBlob } from "@vercel/blob";
import { ImageCarousel } from "@/components/ImageCarousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export default function ListingImages({
  blobs,
  deleteAction,
  listingTitle,
}: {
  blobs: ListBlobResultBlob[];
  deleteAction: ((formData: FormData) => Promise<ServerResponse<unknown>>) | null;
  listingTitle: string;
}) {
  const [parent] = useAutoAnimate();
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    if (!dialogOpen) setDialogOpen(true);
  };

  return (
    <>
      <div ref={parent} className="grid grid-cols-2 gap-4">
        {blobs.length > 0 ? (
          blobs.map((image, index) => (
            <div className="scale-hover relative cursor-pointer" key={image.pathname}>
              {deleteAction && <ImageDeleteButton deleteImageAction={deleteAction} url={image.url} />}
              <Image
                src={image.url}
                width={200}
                height={200}
                alt={`${listingTitle} image ${index + 1}`}
                title={image.pathname.split("/").pop()}
                className="w-full"
                onClick={() => handleImageClick(image.url)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center text-gray-500">
            Geen afbeeldingen beschikbaar
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)]">
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>{listingTitle} Afbeeldingen</DialogTitle>
              <DialogDescription>
                Afbeeldingen van {listingTitle}. Klik op het pijltje om naar de volgende afbeelding te gaan.
              </DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          <ImageCarousel
            onlyScrollOnFirstLoad
            images={blobs.map((image) => image.url)}
            currentImageUrl={currentImage}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

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
