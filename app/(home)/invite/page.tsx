import { isValidObjectId, MergeType } from "mongoose";
import { InvitePage } from "@/components/sections/InvitePage";
import dbConnect from "@/lib/dbConnect";
import ClientInvite from "@/models/ClientInvite";
import { ClientInviteDoc } from "@/models/ClientInvite.type";
import { UserObj } from "@/models/User.type";
import { serializeDoc } from "@/lib/server.utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type Props = { searchParams: Promise<{ id: string }> };

export default async function Invite({ searchParams }: Props) {
  const { id } = await searchParams;

  const Layout = ({ title, description }: { title: string; description: string }) => (
    <section className="container mx-auto flex h-full w-full items-center justify-center px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="flex flex-col gap-4 text-center">{description}</CardDescription>
        </CardHeader>
      </Card>
    </section>
  );

  if (!isValidObjectId(id)) {
    return Layout({
      title: "Invalid invite link",
      description: "The invite link you are trying to access is invalid.",
    });
  }

  await dbConnect();

  const invite = serializeDoc(await ClientInvite.findById(id).populate("inviter")) as MergeType<
    ClientInviteDoc,
    UserObj
  >;

  if (!invite) {
    return Layout({
      title: "Invite not found",
      description: "The invite you are trying to access does not exist.",
    });
  }

  if (invite.status === "accepted") {
    return Layout({
      title: "Invite already accepted",
      description: "The invite you are trying to access has already been accepted or has expired.",
    });
  }

  if (invite.status === "rejected") {
    return Layout({
      title: "Invite has been rejected",
      description: "The invite you are trying to access has been rejected.",
    });
  }

  return <InvitePage invite={invite} />;
}
