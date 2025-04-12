import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { UserObj } from "@/models/User.type";
import { isValidObjectId } from "mongoose";
import { authGuard, serializeDoc } from "@/lib/server.utils";
import React from "react";
import { FileQuestion, FileWarning } from "lucide-react";

export default async function ClientsPage(props: { params: Promise<{ id: string }> }) {
  await authGuard({ buyerOnly: true });

  const { id } = await props.params;

  if (!isValidObjectId(id)) {
    return (
      <ErrorSection
        icon={<FileWarning size={128} />}
        title="Ongeldige agent ID"
        message="De agent ID die je probeert te openen is ongeldig."
      />
    );
  }

  await dbConnect();
  const agent = serializeDoc(await User.findById(id)) as UserObj;

  if (!agent) {
    return (
      <ErrorSection
        icon={<FileQuestion size={128} />}
        title="Agent niet gevonden"
        message="De agent die je probeert te openen bestaat niet."
      />
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

function ErrorSection({ icon, title, message }: { icon: React.ReactNode; title: string; message: string }) {
  return (
    <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        {icon}
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{title}</h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}
