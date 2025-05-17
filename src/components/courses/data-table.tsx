"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Subject } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { DataTable } from "../ui/data-table";
import Link from "next/link";
import { ActionsDropdown } from "../ui/actions-dropdown";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    activateSubject,
    deactivateSubject,
} from "@/actions/subjects/update-subject-status";
import { reloadPage } from "@/helpers/reload-page";

const columns: ColumnDef<Subject>[] = [
    {
        header: "Name",
        cell: ({ row }) => {
            const course = row.original;
            return (
                <Link className="link" href={`/courses/${course.id}/`}>
                    {course.name}
                </Link>
            );
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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const toggleCourseStatus = async (course: Subject) => {
        if (course.status == "active") await deactivateSubject(course.id);
        else activateSubject(course.id);
        reloadPage(router, pathname, searchParams);
    };

    const renderRowActions = (course: Subject) => {
        return (
            <ActionsDropdown>
                <DropdownMenuItem onClick={() => toggleCourseStatus(course)}>
                    {course.status == "active" ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </ActionsDropdown>
        );
    };

    return (
        <DataTable<Subject>
            {...props}
            columns={columns}
            renderRowActions={renderRowActions}
        />
    );
}
