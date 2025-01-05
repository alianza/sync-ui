import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { UserDoc } from "@/models/User.type";
import { isValidObjectId } from "mongoose";
import { authGuard, serializeDoc } from "@/lib/server.utils";

export default async function ClientsPage(props: { params: Promise<{ id: string }> }) {
  await authGuard({ buyerOnly: true });

  const { id } = await props.params;

  if (!isValidObjectId(id)) {
    return (
      <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Invalid client ID</h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The client ID you are trying to access is invalid.
          </p>
        </div>
      </section>
    );
  }

  await dbConnect();
  const agent = serializeDoc(await User.findById(id)) as UserDoc;

  if (!agent) {
    return (
      <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Client not found</h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The client you are trying to access does not exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {agent.firstName} {agent.lastName}
        </h2>
        <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          {agent.email}
        </p>
      </div>
    </section>
  );
}
