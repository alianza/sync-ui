import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/(app)/dashboard/clients/columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { MergeType } from "mongoose";
import { UserDoc } from "@/models/User.type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authGuard } from "@/lib/server.utils";

export default async function ClientsTable() {
  const session = await authGuard();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  await dbConnect();
  const dbUser = (await User.findById(session.user?.id).populate("clients"))?.toObject({
    flattenObjectIds: true,
  }) as MergeType<UserDoc, { clients: UserDoc[] }>;

  if (!dbUser) redirect("/login");

  return (
    <div className="flex flex-col gap-2">
      <DataTable
        columns={columns}
        data={dbUser.clients}
        filterColumn="email"
        filterPlaceholder="Filter klanten"
        emptyComponent={
          <div className="flex flex-col justify-center gap-2">
            Geen resultaten gevonden.
            <Link href="/dashboard/clients/new">
              <Button>
                <PlusIcon /> Nodig nieuwe klant uit
              </Button>
            </Link>
          </div>
        }
      />

      {dbUser.clients.length ? (
        <Link href="/dashboard/clients/new" className="self-start">
          <Button>
            <PlusIcon /> Nodig nieuwe klant uit
          </Button>
        </Link>
      ) : (
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle>Voeg je eerste klant toe!</CardTitle>
            <CardDescription>
              Je hebt nog geen klanten toegevoegd. Klik op de knop hieronder om je eerste klant uit te nodigen!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/clients/new">
              <Button>
                <PlusIcon /> Nodig je eerste klant uit
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
