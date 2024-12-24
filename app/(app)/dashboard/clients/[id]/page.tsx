import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import User from "@/models/User";
import { UserDoc } from "@/models/User.type";
import { isValidObjectId } from "mongoose";

export default async function ClientsPage(props: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session) redirect("/login");

  const { id } = await props.params;

  if (!isValidObjectId(id)) {
    return (
      <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Invalid client ID</h2>
            <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The client ID you are trying to access is invalid.
            </p>
          </div>
        </div>
      </section>
    );
  }

  await dbConnect();
  const client = (await User.findById(id))?.toObject({ flattenObjectIds: true }) as UserDoc;

  if (!client) {
    return (
      <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Client not found</h2>
            <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The client you are trying to access does not exist.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {client.firstName} {client.lastName}
          </h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {client.email}
          </p>
        </div>
      </div>
      {/*<div className="mx-auto mt-12">*/}
      {/*  <ListingCard key={client._id} listing={client} redirectAfterDelete="/dashboard/listings" />*/}
      {/*</div>*/}
    </section>
  );
}
