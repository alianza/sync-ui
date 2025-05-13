"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePathname, useSearchParams } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  filterColumn?: string;
  filterPlaceholder?: string;
  emptyComponent?: React.ReactNode;
  infoLabel?: string;
  disableAnimations?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  filterColumn,
  filterPlaceholder,
  emptyComponent,
  infoLabel,
  disableAnimations = false,
}: DataTableProps<TData, TValue>) {
  "use no memo";

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialSorting = (() => {
    const sortParam = searchParams.get("sort");
    if (!sortParam) return [];
    const parsedSort = JSON.parse(sortParam);
    const sortColumn = Object.keys(parsedSort)[0];
    if (!(columns as { accessorKey: string }[]).find(({ accessorKey }) => accessorKey === sortColumn)) return [];
    if (parsedSort[sortColumn] !== "asc" && parsedSort[sortColumn] !== "desc") return [];
    return [{ id: sortColumn, desc: parsedSort[sortColumn] === "desc" }];
  })();
  const initialPage = parseInt(searchParams.get("page") ?? "1");

  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [parent, enableAnimations] = useAutoAnimate();

  useEffect(() => {
    if (disableAnimations) {
      enableAnimations(false);
    } else {
      enableAnimations(true);
    }
  }, [disableAnimations, enableAnimations]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
    onStateChange: (updater) => {
      const newState = typeof updater === "function" ? updater(table.getState()) : updater;
      const currentPage = newState.pagination.pageIndex + 1;
      const newSorting = newState.sorting[0];

      const params = new URLSearchParams(searchParams);
      if (currentPage > 1) params.set("page", `${currentPage}`);
      else params.delete("page");
      if (newSorting) params.set("sort", JSON.stringify({ [newSorting.id]: newSorting.desc ? "desc" : "asc" }));
      else params.delete("sort");
      window.history.pushState(null, "", `${pathname}?${params}`); // Update the URL without reloading
    },
  });

  useEffect(() => {
    if (initialPage) table.setPageIndex(initialPage - 1);
  }, []);

  useEffect(() => {
    if (pageSize) table.setPageSize(pageSize);
  }, [pageSize, table]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap-reverse items-center justify-between gap-2">
        {filterColumn && (
          <Input
            placeholder={filterPlaceholder || `Filter ${filterColumn}`}
            value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        )}
        {infoLabel && <span className="text-xs text-gray-500">{infoLabel}</span>}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="max-md:text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody ref={parent}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyComponent || "Geen resultaten gevonden."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs">
          {table.getRowCount()} {table.getRowCount() === 1 ? "resultaat" : "resultaten"}
        </div>
        {table.getRowCount() > 0 && (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Vorige
            </Button>
            <span className="text-xs">
              {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
            </span>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Volgende
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
