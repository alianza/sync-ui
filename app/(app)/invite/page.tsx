import { isValidObjectId, MergeType } from "mongoose";
import { InvitePage } from "@/components/sections/InvitePage";
import dbConnect from "@/lib/dbConnect";
import ClientInvite from "@/models/ClientInvite";
import { ClientInviteDoc } from "@/models/ClientInvite.type";
import { UserDoc } from "@/models/User.type";
import { serializeDoc } from "@/lib/server.utils";

type Props = { searchParams: Promise<{ id: string }> };

export default async function Invite({ searchParams }: Props) {
  const { id } = await searchParams;

  if (!isValidObjectId(id)) {
    return (
      <section className="flex w-full flex-col items-center py-12 md:py-24 lg:py-32 xl:py-48">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Invalid invite link</h1>
        <span className="text-lg text-neutral-500 dark:text-neutral-400">
          The invite link you are trying to access is invalid.
        </span>
      </section>
    );
  }

  await dbConnect();

  const invite = serializeDoc(await ClientInvite.findById(id).populate("inviter")) as MergeType<
    ClientInviteDoc,
    UserDoc
  >;

  if (!invite) {
    return (
      <section className="flex w-full flex-col items-center py-12 md:py-24 lg:py-32 xl:py-48">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Invite not found</h1>
        <span className="text-lg text-neutral-500 dark:text-neutral-400">
          The invite you are trying to access does not exist.
        </span>
      </section>
    );
  }

  if (invite.status !== "pending") {
    return (
      <section className="flex w-full flex-col items-center py-12 md:py-24 lg:py-32 xl:py-48">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Invite already accepted</h1>
        <span className="text-lg text-neutral-500 dark:text-neutral-400">
          The invite you are trying to access has already been accepted or has expired.
        </span>
      </section>
    );
  }

  return <InvitePage invite={invite} />;
}
