"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Assignment } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import {
    cancelAssignment,
    draftAssignment,
    postAssignment,
} from "@/actions/courses/assignments/update-assignment-status";

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

export function CourseAssignmentsDataTable(props: Props) {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const { user } = useAuth();

    const usedColumns = [...columns];

    usedColumns[0].cell = ({ row }) => {
        const assignment = row.original;
        return (
            <Link
                className="link"
                href={`/courses/${id}/assignments/${assignment.id}`}
            >
                {assignment.title}
            </Link>
        );
    };

    if (["teacher", "admin", "superadmin"].includes(user?.role || "")) {
        usedColumns.push({
            header: "Status",
            accessorKey: "status",
        });
    }

    const editAssignmentAction = (assignmentId: string) => {
        router.push(`/courses/${id}/assignments/${assignmentId}/edit`);
    };

    const assignmentSubmissionsAction = (assignmentId: string) => {
        router.push(`/courses/${id}/assignments/${assignmentId}/submissions`);
    };

    const renderRowActions = (assignment: Assignment) => {
        return (
            <ActionsDropdown>
                <DropdownMenuItem
                    onClick={async () => {
                        if (assignment.status == "posted") {
                            const { error } = await draftAssignment(
                                id,
                                assignment.id
                            );
                            if (error) {
                                alert(error);
                            }
                            router.refresh();
                        } else {
                            await postAssignment(id, assignment.id);
                            router.refresh();
                        }
                    }}
                >
                    {assignment.status == "posted" ? "Draft" : "Post"}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => editAssignmentAction(assignment.id)}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => assignmentSubmissionsAction(assignment.id)}
                >
                    Submissions
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-red-500"
                    onClick={async () => {
                        await cancelAssignment(id, assignment.id);
                        router.refresh();
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
            renderRowActions={
                ["teacher", "admin", "superadmin"].includes(user?.role || "")
                    ? renderRowActions
                    : undefined
            }
        />
    );
}
