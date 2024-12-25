import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getNameFromAlias } from "@/lib/common.utils";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          Welcome to the dashboard, {getNameFromAlias(session.user.name!)}!
        </div>
      </div>
    </section>
  );
}
