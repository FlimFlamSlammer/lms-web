"use client";

import { listAccounts, ListAccountsResponse } from "@/actions/users/list-users";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    searchParams: {
        status?: string;
        page?: string;
    };
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

const UsersPage = ({ searchParams }: Props) => {
    const router = useRouter();
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
                onPaginationChange={(paginationData) => {
                    const { pageIndex } = paginationData as PaginationState;
                    router.query.page = pageIndex.toString();
                    router.push(router.route);
                }}
            ></DataTable>
        </div>
    );
};

export default UsersPage;
