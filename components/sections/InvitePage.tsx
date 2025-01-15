import { ClientInviteDoc } from "@/models/ClientInvite.type";
import { UserDoc } from "@/models/User.type";
import { MergeType } from "mongoose";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InviteForm from "@/components/forms/InviteForm";
import React from "react";
import { LockIcon } from "lucide-react";

type Props = {
  invite: MergeType<ClientInviteDoc, UserDoc>;
};

export async function InvitePage({ invite }: Props) {
  return (
    <section className="container mx-auto flex items-center justify-center p-4 py-4 md:py-8 lg:py-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
            <span>Accept invite</span>
            <LockIcon />
          </CardTitle>
          <CardDescription className="flex flex-col gap-4 whitespace-pre-line text-center">
            {invite.inviter?.firstName} {invite.inviter?.lastName} has invited you to join HuizenHub. {"\n"}
            Enter your details below to create your account and accept the invite.
            <span className="text-xs">Your information is secure and will not be shared.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-start text-lg font-bold">Message</CardTitle>
              <CardDescription>
                <p className="whitespace-pre-line text-start">{invite.message}</p>
              </CardDescription>
            </CardHeader>
          </Card>
          <InviteForm invite={invite} />
        </CardContent>
      </Card>
    </section>
  );
}
