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
import { UserObj } from "@/models/User.type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authGuard, serializeDoc } from "@/lib/server.utils";
import ClientInvite from "@/models/ClientInvite";
import { enOrNoEn } from "@/lib/common.utils";

export default async function ClientsTable() {
  const session = await authGuard();

  await dbConnect();
  const dbUser = serializeDoc(await User.findById(session.user?.id).populate("clients")) as MergeType<
    UserObj,
    { clients: UserObj[] }
  >;

  if (!dbUser) redirect("/login");

  const pendingInvites = await ClientInvite.countDocuments({ inviter: session.user?.id, status: "pending" });

  const newClientButton = (
    <Link href="/dashboard/clients/new">
      <Button>
        <PlusIcon />
        Nodig nieuwe klant uit
      </Button>
    </Link>
  );

  return (
    <div className="flex flex-col gap-2">
      <DataTable
        infoLabel={
          pendingInvites > 0
            ? `Je hebt ${pendingInvites} uitnodiging${enOrNoEn(pendingInvites)} in afwachting`
            : "Je hebt geen uitnodigingen in afwachting"
        }
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
