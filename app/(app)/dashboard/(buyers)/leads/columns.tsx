"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LISTING_TYPES, ListingObj } from "@/models/Listing.type";
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
import { ArrowUpDown, Eye, MoreHorizontal, SortAsc, SortDesc } from "lucide-react";
import Link from "next/link";
import { capitalize } from "@/lib/common.utils";

export const columns: ColumnDef<
  ListingObj & {
    linkedAt: Date;
  }
>[] = [
  {
    accessorKey: "title",
    header: "Titel",
    cell: ({ row }) => {
      const title = row.getValue("title")?.toString();
      return (
        <Link className="underline-hover" href={`/dashboard/leads/${row.original._id}`}>
          {title}
        </Link>
      );
    },
  },
  {
    accessorKey: "city",
    header: "Stad",
  },
  {
    accessorKey: "askingPrice",
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
          Prijs
          <SortedIcon className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("askingPrice"));
      const formatted = isNaN(amount)
        ? "Geen prijs"
        : new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type")?.toString();
      return LISTING_TYPES[type as keyof typeof LISTING_TYPES] || capitalize(type);
    },
  },
  {
    accessorKey: "yearBuilt",
    header: "Bouwjaar",
  },
  {
    accessorKey: "rooms.roomCount",
    header: "Kamers",
  },
  {
    accessorKey: "measurements.squareMetersTotal",
    header: "Oppervlakte",
    accessorFn: (row) => {
      const amount = row.measurements.squareMetersTotal;
      return isNaN(amount) ? "Onbekend" : new Intl.NumberFormat("nl-NL").format(amount);
    },
  },
  // {
  //   accessorKey: "stories",
  //   header: "Verdiepingen",
  // },
  {
    accessorKey: "linkedAt",
    header: "Gekoppeld op",
    accessorFn: (row) => {
      const date = new Date(row.linkedAt);
      return date.toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" });
    },
  },
  {
    accessorKey: "district",
    header: "Wijk",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lead = row.original;

      return (
        <DropdownMenu key={lead._id}>
          <DropdownMenuTrigger asChild className="float-end">
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acties</DropdownMenuLabel>
            {/*<DropdownMenuItem onClick={() => navigator.clipboard.writeText(lead._id)}>*/}
            {/*  Kopieer link*/}
            {/*</DropdownMenuItem>*/}
            <DropdownMenuSeparator />
            <Link href={`/dashboard/leads/${lead._id}`}>
              <DropdownMenuItem>
                <Eye className="mr-1 size-3" />
                Bekijk lead
              </DropdownMenuItem>
            </Link>
            {/*<ConfirmDialog*/}
            {/*  className="w-full cursor-default rounded hover:bg-muted"*/}
            {/*  onConfirm={async () => {*/}
            {/*    const { message, status } = await deleteListing(lead._id);*/}
            {/*    if (message) {*/}
            {/*      if (status === ResponseStatus.error) {*/}
            {/*        toast({ title: "error", description: message, variant: "destructive" });*/}
            {/*        return;*/}
            {/*      }*/}

            {/*      toast({ title: message });*/}
            {/*    }*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <DropdownMenuItem className="pointer-events-none">*/}
            {/*    <Trash className="mr-1 size-3" />*/}
            {/*    Verwijderen*/}
            {/*  </DropdownMenuItem>*/}
            {/*</ConfirmDialog>*/}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
