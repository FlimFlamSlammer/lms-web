"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/types";
import { DataTable } from "@/components/ui/data-table";

const columns: ColumnDef<Student>[] = [
    {
        header: "Name",
        cell: ({ row }) => {
            const student = row.original;
            return student.user?.name;
        },
    },
    {
        header: "Role",
        cell: ({ row }) => {
            const student = row.original;
            return student.user?.role;
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
    return <DataTable<Student> {...props} columns={columns} />;
}
