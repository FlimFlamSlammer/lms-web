"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Class, User } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { removeStudentsFromClass } from "@/actions/classes/manage-students";
import { useDataContext } from "@/components/providers/data-provider";
import { useRouter } from "next/navigation";

const columns: ColumnDef<User>[] = [
    {
        header: "Name",
        cell: ({ row }) => {
            const student = row.original;
            return student.name;
        },
    },
    {
        header: "Email",
        cell: ({ row }) => {
            const student = row.original;
            return student.email;
        },
    },
];

interface Props {
    data: User[];
    rowCount: number;
    page: number;
    pageSize: number;
}

export function ClassUserDataTable(props: Props) {
    const $class = useDataContext() as Class | null;
    const router = useRouter();

    const removeStudent = (id: string) => {
        if (!$class) {
            throw new Error("Class to edit not found!");
        }

        removeStudentsFromClass($class.id, [id]).then(() => {
            router.refresh();
        });
    };

    const renderRowActions = (student: User) => {
        return (
            <ActionsDropdown>
                <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => removeStudent(student.id)}
                >
                    Remove
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
