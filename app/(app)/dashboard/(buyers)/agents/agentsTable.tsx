import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import React from "react";
import dbConnect from "@/lib/dbConnect";
import User, { UserObjType } from "@/models/User";
import { authGuard } from "@/lib/server.utils";

export default async function AgentsTable() {
  const session = await authGuard();

  await dbConnect();

  const agentsDocs = await User.find({ clients: { $elemMatch: { $eq: session.user?.id } } });
  const agents: UserObjType[] = agentsDocs.map((agent) => agent.toObject<UserObjType>({ flattenObjectIds: true }));

  return (
    <div className="flex flex-col gap-2">
      <DataTable
        columns={columns}
        data={agents}
        filterColumn="email"
        filterPlaceholder="Filter klanten"
        emptyComponent={<div className="flex flex-col justify-center gap-2">Geen resultaten gevonden.</div>}
      />
    </div>
  );
}
