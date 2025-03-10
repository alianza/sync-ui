"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, MoreHorizontal, SortAsc, SortDesc, Trash } from "lucide-react";
import Link from "next/link";
import ConfirmDialog from "@/components/ConfirmDialog";
import { toast } from "sonner";
import { ResponseStatus } from "@/lib/types";
import { UserObj } from "@/models/User.type";
import { deleteClient } from "@/app/(app)/dashboard/clients/actions";

export const columns: ColumnDef<UserObj>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Naam",
    accessorFn: (row) => {
      const firstName = row.firstName;
      const lastName = row.lastName;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <div className="text-right font-medium">{formatted}</div>;
    },
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const SortedIcon = !isSorted ? ArrowUpDown : isSorted === "asc" ? SortAsc : SortDesc;
      return (
        <Button
          className="float-end text-[length:inherit]"
          variant="ghost"
          onClick={() =>
            column.getIsSorted() === "desc"
              ? column.clearSorting()
              : column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Aangemaakt op
          <SortedIcon className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <DropdownMenu key={client._id}>
          <DropdownMenuTrigger asChild className="float-end">
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acties</DropdownMenuLabel>
            {/*<DropdownMenuItem onClick={() => navigator.clipboard.writeText(client._id)}>*/}
            {/*  Kopieer link*/}
            {/*</DropdownMenuItem>*/}
            <DropdownMenuSeparator />
            <Link href={`/dashboard/clients/${client._id}`}>
              <DropdownMenuItem>
                <Eye className="mr-1 size-3" />
                Bekijk klant
              </DropdownMenuItem>
            </Link>
            <ConfirmDialog
              className="hover:bg-muted w-full cursor-default rounded"
              onConfirm={async () => {
                const { message, status } = await deleteClient(client._id, client.email);
                if (message) {
                  if (status === ResponseStatus.error) return toast.error(message);
                  toast.success(message);
                }
              }}
            >
              <DropdownMenuItem className="pointer-events-none">
                <Trash className="mr-1 size-3" />
                Verwijderen
              </DropdownMenuItem>
            </ConfirmDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
