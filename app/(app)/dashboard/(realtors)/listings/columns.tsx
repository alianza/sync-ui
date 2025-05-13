"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LISTING_TYPES, ListingObj, STATUS, STATUS_COLOR, STATUS_TEXT } from "@/models/Listing.type";
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
import { ArrowUpDown, Eye, LinkIcon, MoreHorizontal, Pencil, Send, SortAsc, SortDesc, Trash } from "lucide-react";
import Link from "next/link";
import { deleteListing, updateListingStatus } from "@/app/(app)/dashboard/(realtors)/listings/actions";
import ConfirmDialog from "@/components/ConfirmDialog";
import { capitalize } from "@/lib/common.utils";
import { toast } from "sonner";
import { ResponseStatus } from "@/lib/types";
import { Tooltip } from "@/components/ui/tooltip";

export const columns: ColumnDef<ListingObj>[] = [
  {
    accessorKey: "title",
    header: "Titel",
    cell: ({ row }) => {
      const title = row.getValue("title")?.toString();
      return (
        <Link className="underline-hover" href={`/dashboard/listings/${row.original._id}`}>
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
    accessorKey: "status",
    // add sorting
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const SortedIcon = !isSorted ? ArrowUpDown : isSorted === "asc" ? SortAsc : SortDesc;
      return (
        <Button
          className="text-[length:inherit]"
          variant="ghost"
          onClick={() =>
            column.getIsSorted() === "desc"
              ? column.clearSorting()
              : column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Status
          <SortedIcon className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status")?.toString();
      const statusLabel = STATUS[status as keyof typeof STATUS] || capitalize(status);
      const color = STATUS_COLOR[status as keyof typeof STATUS_COLOR] || "bg-gray-500";
      const statusExplanation = STATUS_TEXT[status as keyof typeof STATUS_TEXT] || "";
      return (
        <div className="flex items-center gap-2">
          <Tooltip tooltipContent={statusExplanation} asChild>
            <div className={`size-4 rounded-full p-1 ${color} bg-clip-content`} />
          </Tooltip>
          <span>{statusLabel}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    accessorFn: (row) => {
      const amount = row.createdAt ? new Date(row.createdAt).getTime() : null;
      return amount ? new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(amount) : "Geen datum";
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
          Toegevoegd op
          <SortedIcon className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("createdAt") ? new Date(row.getValue("createdAt")).getTime() : null;
      const formatted = amount
        ? new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(new Date(amount))
        : "Geen datum";

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const listing = row.original;

      return (
        <DropdownMenu key={listing._id}>
          <DropdownMenuTrigger asChild className="float-end">
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acties</DropdownMenuLabel>
            {/*<DropdownMenuItem onClick={() => navigator.clipboard.writeText(listing._id)}>*/}
            {/*  Kopieer link*/}
            {/*</DropdownMenuItem>*/}
            <DropdownMenuSeparator />
            <Link href={`/dashboard/listings/${listing._id}`}>
              <DropdownMenuItem>
                <Eye className="mr-1 size-3" />
                Bekijk woning
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/listings/${listing._id}/edit`}>
              <DropdownMenuItem>
                <Pencil className="mr-1 size-3" />
                Bewerk woning
              </DropdownMenuItem>
            </Link>
            {(listing.status === "available" || listing.status === "offer_received") && (
              <Link href={`/dashboard/listings/${listing._id}/link/`}>
                <DropdownMenuItem>
                  <LinkIcon className="mr-1 size-3" />
                  Koppel woning
                </DropdownMenuItem>
              </Link>
            )}
            {listing.status === "draft" && (
              <ConfirmDialog
                className="hover:bg-muted w-full cursor-default rounded"
                onConfirm={async () => {
                  const { message, status } = await updateListingStatus(listing._id, "available");
                  if (message) {
                    if (status === ResponseStatus.error) return toast.error(message);
                    toast.success(message);
                  }
                }}
              >
                <DropdownMenuItem className="pointer-events-none">
                  <Send className="mr-1 size-3" />
                  Publiceer woning
                </DropdownMenuItem>
              </ConfirmDialog>
            )}
            <ConfirmDialog
              className="hover:bg-muted w-full cursor-default rounded"
              description={`${listing.title} wordt verwijderd.`}
              onConfirm={async () => {
                const { message, status } = await deleteListing(listing._id);
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
