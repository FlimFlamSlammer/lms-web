"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
    redirect,
    RedirectType,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { User } from "@/types";
import { Checkbox } from "../ui/checkbox";
import {
    activateUser,
    deactivateUser,
} from "@/actions/users/update-user-status";
import { updateUser } from "@/actions/users/update-user";
import { DataTable } from "../ui/data-table";
import { useCallback } from "react";
import { ActionsDropdown } from "../ui/actions-dropdown";

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
        header: "Active",
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
        header: "Needs password change",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="h-full flex flex-col justify-center">
                    <Checkbox
                        className="hover:cursor-default"
                        checked={user.needsPasswordChange}
                    />
                </div>
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

export function UserDataTable(props: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const reloadTable = () => {
        const params = new URLSearchParams(searchParams);
        router.replace(`/users?${params.toString()}`);
    };

    const toggleUserStatus = async (user: User) => {
        if (user.status == "active") await deactivateUser(user.id);
        else await activateUser(user.id);

        reloadTable();
    };

    const resetUserPassword = useCallback((user: User) => {
        updateUser(user.id, {
            userData: {
                password: user.email,
                needsPasswordChange: true,
            },
        });
    }, []);

    const renderRowActions = (user: User) => {
        return (
            <ActionsDropdown>
                <DropdownMenuItem
                    onClick={() => {
                        redirect(`/users/${user.id}/edit`, RedirectType.push);
                    }}
                    className="hover:cursor-pointer"
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onClick={() => toggleUserStatus(user)}
                >
                    {user.status == "active" ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="hover:cursor-pointer text-red-500"
                    onClick={() => resetUserPassword(user)}
                >
                    Reset Password
                </DropdownMenuItem>
            </ActionsDropdown>
        );
    };
    return (
        <DataTable<User>
            {...props}
            columns={columns}
            renderRowActions={renderRowActions}
        />
    );
}
