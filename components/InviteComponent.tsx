import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InviteForm from "@/components/forms/InviteForm";
import { ClientInviteDoc } from "@/models/ClientInvite.type";
import { MergeType } from "mongoose";
import { UserDoc } from "@/models/User.type";

type Props = {
  invite: MergeType<ClientInviteDoc, UserDoc>;
};

function InviteComponent({ invite }: Props) {
  return (
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
  );
}

export default InviteComponent;
