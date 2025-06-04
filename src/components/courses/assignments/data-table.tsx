"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Assignment, Course } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDataContext } from "@/components/providers/data-provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import {
    cancelAssignment,
    draftAssignment,
    postAssignment,
} from "@/actions/courses/assignments/update-assignment-status";
import { reloadPage } from "@/helpers/reload-page";

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
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { user } = useAuth();

    if (!course) {
        throw new Error("Course to edit not found!");
    }

    // const pathname = usePathname();
    // const searchParams = useSearchParams();

    const usedColumns = [...columns];

    usedColumns[0].cell = ({ row }) => {
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

    if (user?.role == "teacher") {
        usedColumns.push({
            header: "Status",
            accessorKey: "status",
        });
    }

    const editAssignment = (id: string) => {
        router.push(`/courses/${course.id}/assignments/${id}/edit`);
    };

    const renderRowActions = (assignment: Assignment) => {
        return (
            <ActionsDropdown>
                <DropdownMenuItem
                    onClick={async () => {
                        if (assignment.status == "posted") {
                            const { error } = await draftAssignment(
                                course.id,
                                assignment.id
                            );
                            if (error) {
                                alert(error);
                            }
                            reloadPage(router, pathname, searchParams);
                        } else {
                            await postAssignment(course.id, assignment.id);
                            reloadPage(router, pathname, searchParams);
                        }
                    }}
                >
                    {assignment.status == "posted" ? "Draft" : "Post"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editAssignment(assignment.id)}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-red-500"
                    onClick={async () => {
                        await cancelAssignment(course.id, assignment.id);
                        reloadPage(router, pathname, searchParams);
                    }}
                >
                    Cancel
                </DropdownMenuItem>
            </ActionsDropdown>
        );
    };

    return (
        <DataTable<Assignment>
            {...props}
            columns={usedColumns}
            renderRowActions={renderRowActions}
        />
    );
}
