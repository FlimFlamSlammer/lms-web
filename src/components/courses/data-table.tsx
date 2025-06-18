"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Course } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { DataTable } from "../ui/data-table";
import Link from "next/link";
import { ActionsDropdown } from "../ui/actions-dropdown";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    activateCourse,
    deactivateCourse,
} from "@/actions/courses/update-course-status";
import { reloadPage } from "@/helpers/reload-page";
import { useAuth } from "../providers/auth-provider";

const columns: ColumnDef<Course>[] = [
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
    data: Course[];
    rowCount: number;
    page: number;
    pageSize: number;
}

export const CourseDataTable = (props: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { user } = useAuth();

    const toggleCourseStatus = async (course: Course) => {
        if (course.status == "active") await deactivateCourse(course.id);
        else await activateCourse(course.id);
        reloadPage(router, pathname, searchParams);
    };

    const renderRowActions = (course: Course) => {
        return (
            <ActionsDropdown>
                <DropdownMenuItem onClick={() => toggleCourseStatus(course)}>
                    {course.status == "active" ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
            </ActionsDropdown>
        );
    };

    return (
        <DataTable<Course>
            {...props}
            columns={columns}
            renderRowActions={
                ["admin", "superadmin"].includes(user?.role || "")
                    ? renderRowActions
                    : undefined
            }
        />
    );
};
