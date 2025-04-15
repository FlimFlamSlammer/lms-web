"use client";

import { listAccounts, ListAccountsResponse } from "@/actions/users/list-users";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { User } from "@/types";
import { useEffect, useState, use } from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    searchParams: Promise<{
        status?: string;
        page?: string;
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
];

const UsersPage = (props: Props) => {
    const searchParams = use(props.searchParams);
    const router = useRouter();
    const pathname = usePathname();
    const [
        { data: { users, total } } = {
            data: {
                users: [],
                total: 0,
            },
        },
        setData,
    ] = useState<ListAccountsResponse>();

    const page = Math.max(parseInt(searchParams.page || "1"), 1);

    useEffect(() => {
        listAccounts({
            page,
            status: "all",
        }).then((res) => {
            setData(res);
        });
    }, [page]);

    console.log(users);
    console.log(total);

    return (
        <div>
            <DataTable
                columns={columns}
                data={users}
                rowCount={total}
                page={page}
                pageSize={10}
                onPageChange={(pageIndex) => {
                    const params = new URLSearchParams(searchParams);
                    if (pageIndex) {
                        params.set("page", pageIndex.toString());
                    }
                    router.replace(`${pathname}?${params.toString()}`);
                }}
            ></DataTable>
        </div>
    );
};

export default UsersPage;
