"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Subject } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { DataTable } from "../ui/data-table";
import Link from "next/link";

const columns: ColumnDef<Subject>[] = [
    {
        header: "Name",
        cell: ({ row }) => {
            const course = row.original;
            return <Link href={`/courses/${course.id}/`} />;
        },
    },
    {
        accessorKey: "grade",
        header: "Grade",
    },
    {
        accessorKey: "startYear",
        header: "Start year",
    },
    {
        accessorKey: "endYear",
        header: "End year",
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
];

interface Props {
    data: Subject[];
    rowCount: number;
    page: number;
    pageSize: number;
}

export function CourseDataTable(props: Props) {
    return <DataTable<Subject> {...props} columns={columns} />;
}
