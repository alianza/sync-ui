"use client";

import { PencilIcon, XIcon } from "lucide-react";
import { ListingType } from "@/types/listing";
import { deleteListing } from "@/app/listings/actions";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LISTING_TYPES } from "@/models/Listing";

interface ListingCardProps {
  listing: ListingType;
  redirectAfterDelete?: string;
}

export function ListingCard({ listing, redirectAfterDelete }: ListingCardProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  return (
    <Card className={`flex justify-between transition-opacity ${isDeleting ? "pointer-events-none opacity-50" : ""}`}>
      <CardHeader>
        <CardTitle>
          <Link className="underline-hover" href={`/listings/${listing._id}`}>
            {listing.title}
          </Link>
        </CardTitle>
        <CardDescription>{listing.description}</CardDescription>
        <CardDescription className="text-xs">
          {LISTING_TYPES[listing.type as keyof typeof LISTING_TYPES]}
        </CardDescription>
      </CardHeader>
      <div className="flex flex-col items-center justify-between">
        <button
          onClick={async () => {
            setIsDeleting(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const { error, message } = await deleteListing(listing._id);
            if (message) toast.success(message);
            if (error) {
              toast.error(error);
              setIsDeleting(false);
            }
            if (redirectAfterDelete) router.replace(redirectAfterDelete);
          }}
          className={`scale-hover-xl cursor-pointer p-2`}
          disabled={isDeleting}
        >
          <XIcon className="size-6 text-neutral-500 dark:text-neutral-400" />
        </button>
        <Link href={`/listings/${listing._id}/edit`} className="scale-hover-xl cursor-pointer p-2">
          <PencilIcon className="size-5 text-neutral-500 dark:text-neutral-400" />
        </Link>
      </div>
    </Card>
  );
}
