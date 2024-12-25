import React from "react";
import dbConnect from "@/lib/dbConnect";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import User from "@/models/User";
import { UserDoc } from "@/models/User.type";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClientCard } from "@/components/ClientCard";
import { MergeType } from "mongoose";

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
    <>
      <section className="container mx-auto flex w-full flex-col gap-8 px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Clients</h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            These are your clients. You can add, edit, and delete them as you see fit.
          </p>
        </div>
        <div className="mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          {dbUser.clients.length > 0 ? (
            dbUser.clients.map((client) => <ClientCard key={client._id} client={client} />)
          ) : (
            <EmptyCard />
          )}
        </div>
        <div className="flex w-full items-center">
          {dbUser.clients.length > 0 && (
            <Button asChild className="mx-auto">
              <Link href="/dashboard/clients/new">
                <Plus /> Invite a client
              </Link>
            </Button>
          )}
        </div>
      </section>
    </>
  );
}

function EmptyCard() {
  return (
    <Card className="col-span-full mx-auto max-w-screen-sm">
      <CardHeader>
        <CardTitle>No clients found</CardTitle>
        <CardDescription>
          You have no clients on your file yet. You can create an invite for a new client here!
        </CardDescription>
        <Button asChild>
          <Link href="/dashboard/clients/new">
            <Plus /> Invite a client
          </Link>
        </Button>
      </CardHeader>
    </Card>
  );
}
