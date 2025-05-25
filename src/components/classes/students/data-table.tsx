"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Class, Student } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { removeStudentsFromClass } from "@/actions/classes/manage-students";
import { useDataContext } from "@/components/providers/data-provider";
import { reloadPage } from "@/helpers/reload-page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const columns: ColumnDef<Student>[] = [
    {
        header: "Name",
        cell: ({ row }) => {
            const student = row.original;
            return student.user?.name;
        },
    },
    {
        header: "Email",
        cell: ({ row }) => {
            const student = row.original;
            return student.user?.email;
        },
    },
];

interface Props {
    data: Student[];
    rowCount: number;
    page: number;
    pageSize: number;
}

export function ClassUserDataTable(props: Props) {
    const $class = useDataContext() as Class | null;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const removeStudent = (id: string) => {
        if (!$class) {
            throw new Error("Class to edit not found!");
        }

        removeStudentsFromClass($class.id, [id]);
        reloadPage(router, pathname, searchParams);
    };

    const renderRowActions = (student: Student) => {
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
        <DataTable<Student>
            {...props}
            columns={columns}
            renderRowActions={renderRowActions}
        />
    );
}
