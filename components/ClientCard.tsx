"use client";

import { XIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ResponseStatus } from "@/lib/types";
import { UserDoc } from "@/models/User.type";
import { deleteClient } from "@/app/(app)/dashboard/clients/actions";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  client: UserDoc;
  redirectAfterDelete?: string;
}

export function ClientCard({ client, redirectAfterDelete }: ListingCardProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  return (
    <Card className={cn("flex justify-between transition-opacity", { "pointer-events-none opacity-50": isDeleting })}>
      <CardHeader>
        <CardTitle>
          <Link className="underline-hover" href={`/dashboard/clients/${client._id}`}>
            {client.firstName} {client.lastName}
          </Link>
        </CardTitle>
        <CardDescription>{client.email}</CardDescription>
        <CardDescription suppressHydrationWarning className="text-xs">
          {new Date(client.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <div className="flex flex-col items-center justify-between">
        <button
          onClick={async () => {
            setIsDeleting(true);
            const { message, status } = await deleteClient(client._id);
            if (message) {
              if (status === ResponseStatus.error) {
                toast({ description: message, variant: "destructive" });
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
      </div>
    </Card>
  );
}
