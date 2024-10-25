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
  return (
    <Card className="flex justify-between rounded-lg bg-white shadow-lg dark:bg-neutral-700">
      <CardHeader>
        <CardTitle>{listing.title}</CardTitle>
        <CardDescription>{listing.description}</CardDescription>
      </CardHeader>
      <button
        onClick={async () => {
          const { error, message } = await deleteListing(listing._id);
          if (message) toast.success(message);
          if (error) toast.error(error);
        }}
        className="scale-hover-xl cursor-pointer self-start p-2"
      >
        <XIcon className="size-6 text-neutral-500 dark:text-neutral-400" />
      </button>
    </Card>
  );
}
