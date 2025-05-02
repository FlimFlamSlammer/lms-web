"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";
import { Button } from "./button";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo } from "react";

type Props<T extends object> = {
    columns: ColumnDef<T, unknown>[];
    data: T[];
    rowCount: number;
    page: number;
    pageSize: number;
    renderRowActions?: (row: T) => ReactNode;
};

export function DataTable<T extends object>({
    data,
    columns,
    rowCount,
    page,
    pageSize,
    renderRowActions,
}: Props<T>) {
    const router = useRouter();
    const pathname = usePathname();

    const finalColumns = useMemo(() => {
        if (!renderRowActions) return columns;
        const actionColumn: ColumnDef<T> = {
            id: "action",
            header: "Actions",
            cell: ({ row }) => renderRowActions(row.original),
        };

        return [...columns, actionColumn];
    }, [columns, renderRowActions]);

    const table = useReactTable<T>({
        data,
        columns: finalColumns,
        rowCount,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        state: {
            pagination: {
                pageIndex: page - 1,
                pageSize,
            },
        },
    });

    const handlePageChange = (pageIndex: number) => {
        const searchParams = new URLSearchParams();
        searchParams.set("page", pageIndex.toString());
        router.push(`${pathname}?${searchParams.toString()}`);
    };

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <span className="text-sm">
                    Page {page} of {Math.ceil(rowCount / pageSize)}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        table.previousPage();
                        handlePageChange(page - 1);
                    }}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        table.nextPage();
                        handlePageChange(page + 1);
                    }}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
