import React from "react";
import dbConnect from "@/lib/dbConnect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import User from "@/models/User";
import { UserDoc } from "@/models/User.type";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MergeType } from "mongoose";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/(app)/dashboard/clients/columns";

export const revalidate = 60;

export default async function ClientsPage() {
  const session = await auth();

  if (!session) redirect("/login");

  await dbConnect();
  const dbUser = (await User.findById(session.user?.id).populate("clients"))?.toObject({
    flattenObjectIds: true,
  }) as MergeType<UserDoc, { clients: UserDoc[] }>;

  if (!dbUser) redirect("/login");

  return (
    <section className="container mx-auto flex w-full flex-col gap-12 px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Klanten</h2>
        <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Bekijk en bewerk hier de klanten die je hebt toegevoegd. Je kunt ook nieuwe klanten toevoegen.
        </p>
      </div>

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
    </section>
  );
}
