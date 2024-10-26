"use client";

import { XIcon } from "lucide-react";
import { ListingType } from "@/types/listing";
import { deleteListing } from "@/app/test/actions";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { toast } from "react-toastify";

interface ListingCardProps {
  listing: ListingType;
}

export function ListingCard({ listing }: ListingCardProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  return (
    <Card className={`flex justify-between transition-opacity ${isDeleting ? "pointer-events-none opacity-50" : ""}`}>
      <CardHeader>
        <CardTitle>{listing.title}</CardTitle>
        <CardDescription>{listing.description}</CardDescription>
      </CardHeader>
      <button
        onClick={async () => {
          setIsDeleting(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const { error, message } = await deleteListing(listing._id);
          if (message) toast.success(message);
          if (error) toast.error(error);
          setIsDeleting(false);
        }}
        className={`cursor-pointer self-start p-2`}
        disabled={isDeleting}
      >
        <XIcon className="size-6 text-neutral-500 dark:text-neutral-400" />
      </button>
    </Card>
  );
}
