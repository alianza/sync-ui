import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
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

  await dbConnect();
  const dbUser = (await User.findById(session.user?.id).populate("clients"))?.toObject({
    flattenObjectIds: true,
  }) as MergeType<UserDoc, { clients: UserDoc[] }>;

  if (!dbUser) redirect("/login");

  const newClientButton = (
    <Link href="/dashboard/clients/new">
      <Button>
        <PlusIcon /> Nodig nieuwe klant uit
      </Button>
    </Link>
  );

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
            {newClientButton}
          </div>
        }
      />

      {dbUser.clients.length > 0 ? (
        <div className="self-start">{newClientButton}</div>
      ) : (
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle>Voeg je eerste klant toe!</CardTitle>
            <CardDescription>
              Je hebt nog geen klanten toegevoegd. Klik op de knop hieronder om je eerste klant uit te nodigen!
            </CardDescription>
          </CardHeader>
          <CardContent>{newClientButton}</CardContent>
        </Card>
      )}
    </div>
  );
}
