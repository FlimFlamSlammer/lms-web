"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "../ui/button";
import {
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
import { DataTable } from "../ui/data-table";

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

    const resetUserPassword = (user: User) => {
        updateUser(user.id, {
            userData: {
                password: user.email,
                needsPasswordChange: true,
            },
        });
    };

    const renderRowActions = (user: User) => {
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
                </DropdownMenuContent>
            </DropdownMenu>
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
