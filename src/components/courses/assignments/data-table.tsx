"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Assignment, Course } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDataContext } from "@/components/providers/data-provider";
import { useRouter } from "next/navigation";
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

export function CourseAssignmentDataTable(props: Props) {
    const course = useDataContext() as Course | null;
    const router = useRouter();
    // const pathname = usePathname();
    // const searchParams = useSearchParams();

    columns[0].cell = ({ row }) => {
        const assignment = row.original;
        return (
            <Link
                className="link"
                href={`/courses/${course?.id}/assignments/${assignment.id}`}
            >
                {assignment.title}
            </Link>
        );
    };

    const editAssignment = (id: string) => {
        if (!course) {
            throw new Error("Course to edit not found!");
        }

        router.push(`/courses/${course.id}/assignments/${id}/edit`);
    };

    const renderRowActions = (assignment: Assignment) => {
        return (
            <ActionsDropdown>
                <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => editAssignment(assignment.id)}
                >
                    Edit
                </DropdownMenuItem>
            </ActionsDropdown>
        );
    };

    return (
        <DataTable<Assignment>
            {...props}
            columns={columns}
            renderRowActions={renderRowActions}
        />
    );
}
