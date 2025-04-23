"use client";

import { ListingObj } from "@/models/Listing.type";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { startTransition, useActionState, useEffect } from "react";
import { LinkIcon } from "lucide-react";
import { UserObj } from "@/models/User.type";
import { Checkbox } from "@/components/ui/checkbox";
import { initialActionState, ResponseStatus } from "@/lib/types";
import { linkListing } from "@/app/(app)/dashboard/(realtors)/listings/[id]/link/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { toast } from "sonner";

type Props = { listing: ListingObj; clients: UserObj[] };

export function LinkListing({ listing, clients }: Props) {
  const [state, action] = useActionState(linkListing, initialActionState);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const parsedFormData = new FormData();

    parsedFormData.append("listingId", listing._id);
    const userIds = data.getAll("userIds[]");
    userIds.forEach((userId) => parsedFormData.append("linkUserIds[]", userId));

    const unlinkUserIds = clients.filter((client) => !userIds.includes(client._id)).map((client) => client._id);
    unlinkUserIds.forEach((userId) => parsedFormData.append("unlinkUserIds[]", userId));

    startTransition(() => action(parsedFormData));
  };

  useEffect(() => {
    if (state && state.status === ResponseStatus.success) {
      toast.success(state.message);
    }
  }, [state]);

  const isLinkedToClient = (client: UserObj) =>
    client.listings!.some((clientListing) => clientListing.listingId === listing._id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Klanten</CardTitle>
        <CardDescription className="flex flex-col gap-4 text-center">
          Selecteer klanten om {listing.title} aan te koppelen
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input type="hidden" name="listingId" value={listing._id} />
        <CardContent>
          <div className="flex flex-col gap-2">
            {clients.map((client) => (
              <div key={client._id} className="items-top flex space-x-2">
                <Checkbox
                  id={client._id}
                  name="userIds[]"
                  value={client._id}
                  defaultChecked={isLinkedToClient(client)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={client._id}
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {client.firstName} {client.lastName}
                  </label>
                  <p className="text-muted-foreground text-sm">{client.email}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton
            variant="outline"
            className="w-full"
            loadingLabel="Koppelen..."
            label={
              <>
                <LinkIcon className="mr-1 size-3" />
                Koppel
              </>
            }
          />
        </CardFooter>
      </form>
    </Card>
  );
}
