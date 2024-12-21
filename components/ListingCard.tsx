"use client";

import { PencilIcon, XIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteListing } from "@/app/(app)/dashboard/listings/actions";
import { useToast } from "@/hooks/use-toast";
import { LISTING_TYPES, ListingDoc } from "@/models/Listing.type";
import { ResponseStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: ListingDoc;
  redirectAfterDelete?: string;
}

export function ListingCard({ listing, redirectAfterDelete }: ListingCardProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  return (
    <Card className={cn("flex justify-between transition-opacity", { "pointer-events-none opacity-50": isDeleting })}>
      <CardHeader>
        <CardTitle>
          <Link className="underline-hover" href={`/dashboard/listings/${listing._id}`}>
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
            const { message, status } = await deleteListing(listing._id);
            if (message) {
              if (status === ResponseStatus.error) {
                toast({ title: "error", description: message, variant: "destructive" });
                setIsDeleting(false);
                return;
              }

              if (redirectAfterDelete) router.replace(redirectAfterDelete);

              toast({ title: message });
            }
          }}
          className={`scale-hover-xl cursor-pointer p-2`}
          disabled={isDeleting}
        >
          <XIcon className="size-6 text-neutral-500 dark:text-neutral-400" />
        </button>
        <Link href={`/dashboard/listings/${listing._id}/edit`} className="scale-hover-xl cursor-pointer p-2">
          <PencilIcon className="size-5 text-neutral-500 dark:text-neutral-400" />
        </Link>
      </div>
    </Card>
  );
}
