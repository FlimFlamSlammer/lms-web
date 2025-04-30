"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    RowData,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import {
    ReadonlyURLSearchParams,
    redirect,
    RedirectType,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "@/types";
import { Checkbox } from "../ui/checkbox";
import {
    activateUser,
    deactivateUser,
} from "@/actions/users/update-user-status";
import { updateUser } from "@/actions/users/update-user";

declare module "@tanstack/table-core" {
    interface TableMeta<TData extends RowData> {
        searchParams: ReadonlyURLSearchParams;
        toggleUserStatus: (user: User) => void;
        resetUserPassword: (user: User) => void;
    }
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        header: "Active?",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="h-full flex flex-col justify-center">
                    <Checkbox
                        className="hover:cursor-default"
                        checked={user.status == "active"}
                    />
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => {
                                redirect(
                                    `/users/${user.id}/edit`,
                                    RedirectType.push
                                );
                            }}
                            className="hover:cursor-pointer"
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="hover:cursor-pointer"
                            onClick={() =>
                                table.options.meta?.toggleUserStatus(user)
                            }
                        >
                            {user.status == "active"
                                ? "Deactivate"
                                : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="hover:cursor-pointer text-red-500"
                            onClick={() =>
                                table.options.meta?.resetUserPassword(user)
                            }
                        >
                            Reset Password
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

interface Props {
    data: User[];
    rowCount: number;
    page: number;
    pageSize: number;
}

export function UserDataTable({ data, rowCount, page, pageSize }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const reloadTable = () => {
        const params = new URLSearchParams(searchParams);
        router.replace(`/users?${params.toString()}`);
    };

    const table = useReactTable({
        data,
        columns,
        rowCount,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        state: {
            pagination: {
                pageIndex: page - 1, // zero-indexing
                pageSize,
            },
        },
        meta: {
            searchParams,
            toggleUserStatus: (user: User) => {
                if (user.status == "active") deactivateUser(user.id);
                else activateUser(user.id).then(reloadTable);
            },
            resetUserPassword: (user: User) => {
                updateUser(user.id, {
                    userData: {
                        password: user.email,
                        needsPasswordChange: true,
                    },
                });
            },
        },
    });

    const onPageChange = (pageIndex: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageIndex.toString());
        router.replace(`/users?${params.toString()}`);
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
                        onPageChange(page - 1);
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
                        onPageChange(page + 1);
                    }}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
