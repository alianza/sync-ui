"use client";

import { ImageDeleteButton } from "@/components/ImageDeleteButton";
import Image from "next/image";
import React, { useState } from "react";
import { ServerResponse } from "@/lib/types";
import { ListBlobResultBlob } from "@vercel/blob";
import { ImageCarousel } from "@/components/ImageCarousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function ListingImages({
  blobs,
  deleteImageAction,
  listingTitle,
}: {
  blobs: ListBlobResultBlob[];
  deleteImageAction: (formData: FormData) => Promise<ServerResponse<unknown>>;
  listingTitle: string;
}) {
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    if (!dialogOpen) setDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {blobs.length > 0 ? (
          blobs.map((image, index) => (
            <div className="scale-hover relative cursor-pointer" key={image.pathname}>
              <ImageDeleteButton deleteImageAction={deleteImageAction} url={image.url} />
              <Image
                src={image.url}
                width={200}
                height={200}
                alt={`${listingTitle} image ${index + 1}`}
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
