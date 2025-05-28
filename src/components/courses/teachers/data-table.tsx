"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Course, Teacher } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDataContext } from "@/components/providers/data-provider";
import { reloadPage } from "@/helpers/reload-page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { removeTeachersFromCourse } from "@/actions/courses/manage-teachers";

const columns: ColumnDef<Teacher>[] = [
    {
        header: "Name",
        cell: ({ row }) => {
            const teacher = row.original;
            return teacher.user?.name;
        },
    },
    {
        header: "Email",
        cell: ({ row }) => {
            const teacher = row.original;
            return teacher.user?.email;
        },
    },
];

interface Props {
    data: Teacher[];
    rowCount: number;
    page: number;
    pageSize: number;
}

export function CourseTeacherDataTable(props: Props) {
    const course = useDataContext() as Course | null;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const removeClass = (id: string) => {
        if (!course) {
            throw new Error("Course to edit not found!");
        }

        removeTeachersFromCourse(course.id, [id]).then(() => {
            reloadPage(router, pathname, searchParams);
        });
    };

    const renderRowActions = (teacher: Teacher) => {
        return (
            <ActionsDropdown>
                <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => removeClass(teacher.id)}
                >
                    Remove
                </DropdownMenuItem>
            </ActionsDropdown>
        );
    };

    return (
        <DataTable<Teacher>
            {...props}
            columns={columns}
            renderRowActions={renderRowActions}
        />
    );
}
