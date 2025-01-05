import { ClientInviteDoc } from "@/models/ClientInvite.type";
import { UserDoc } from "@/models/User.type";
import { MergeType } from "mongoose";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InviteForm from "@/components/forms/InviteForm";
import React from "react";

type Props = {
  invite: MergeType<ClientInviteDoc, UserDoc>;
};

export async function InvitePage({ invite }: Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Accept invite</CardTitle>
          <CardDescription className="flex flex-col gap-4 text-center">
            {invite.inviter?.firstName} {invite.inviter?.lastName} has invited you to join HuizenHub. {"\n"}
            Enter your details below to create your account and accept the invite
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-lg font-bold">Message</CardTitle>
                <CardDescription className="text-center">{invite.message}</CardDescription>
              </CardHeader>
            </Card>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InviteForm invite={invite} />
        </CardContent>
      </Card>
    </section>
  );
}
