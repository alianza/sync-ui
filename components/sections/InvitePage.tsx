import InviteComponent from "@/components/InviteComponent";
import { ClientInviteDoc } from "@/models/ClientInvite.type";
import { UserDoc } from "@/models/User.type";
import { MergeType } from "mongoose";

type Props = {
  invite: MergeType<ClientInviteDoc, UserDoc>;
};

export async function InvitePage({ invite }: Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <InviteComponent invite={invite} />
    </section>
  );
}
