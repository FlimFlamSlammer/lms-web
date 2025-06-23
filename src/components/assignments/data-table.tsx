"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Assignment } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";

const columns: ColumnDef<Assignment>[] = [
    {
        header: "Assignment", // placeholder
    },
    {
        header: "Start time",
        cell: ({ row }) => {
            const assignment = row.original;
            return new Date(assignment.startTime).toLocaleString();
        },
    },
    {
        header: "Due date",
        cell: ({ row }) => {
            const assignment = row.original;
            return new Date(assignment.endTime).toLocaleString();
        },
    },
];

interface Props {
    data: Assignment[];
    rowCount: number;
    page: number;
    pageSize: number;
}

export function AssignmentDataTable(props: Props) {
    const usedColumns = [...columns];

    usedColumns[0].cell = ({ row }) => {
        const assignment = row.original;
        return (
            <Link
                className="link"
                href={`/courses/${assignment.courseId}/assignments/${assignment.id}`}
            >
                {assignment.title}
            </Link>
        );
    };

    return <DataTable<Assignment> {...props} columns={usedColumns} />;
}
