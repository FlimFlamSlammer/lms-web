"use client";

import { listAccounts, ListAccountsResponse } from "@/actions/users/list-users";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/users/data-table";
import { User } from "@/types";
import { useEffect, useState, use } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
    searchParams: Promise<{
        status?: string;
        page?: string;
        search?: string;
    }>;
};

export type UserTableData = {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
};

export const columns: ColumnDef<User>[] = [
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
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>
                            {user.status == "active"
                                ? "Deactivate"
                                : "Activate"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const UsersPage = (props: Props) => {
    const searchParams = use(props.searchParams);
    const router = useRouter();
    const pathname = usePathname();
    const [{ users, total }, setData] = useState<ListAccountsResponse["data"]>({
        users: [],
        total: 0,
    });

    const page = Math.max(parseInt(searchParams.page || "1"), 1);

    useEffect(() => {
        listAccounts({
            page,
            status: "all",
            search: searchParams.search,
        }).then((res) => {
            setData(res.data);
        });
    }, [page, searchParams.search]);

    return (
        <div className="flex flex-col w-full h-full p-4">
            <div className="flex items-center py-4">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();

                        const params = new URLSearchParams(searchParams);
                        const target = event.target as typeof event.target & {
                            search: { value: string };
                        };

                        const searchValue = target.search.value;
                        if (searchValue) {
                            params.set("search", searchValue);
                        } else {
                            params.delete("search");
                        }

                        router.replace(`${pathname}?${params.toString()}`);
                    }}
                >
                    <Input
                        placeholder="Search"
                        className="max-w-sm"
                        name="search"
                        id="search"
                    />
                </form>
            </div>
            <DataTable
                columns={columns}
                data={users}
                rowCount={total}
                page={page}
                pageSize={10}
                onPageChange={(pageIndex) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("page", pageIndex.toString());
                    router.replace(`${pathname}?${params.toString()}`);
                }}
            ></DataTable>
        </div>
    );
};

export default UsersPage;
