"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Course, User } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDataContext } from "@/components/providers/data-provider";
import { reloadPage } from "@/helpers/reload-page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { removeTeachersFromCourse } from "@/actions/courses/manage-teachers";

const columns: ColumnDef<User>[] = [
    {
        header: "Name",
        cell: ({ row }) => {
            const teacher = row.original;
            return teacher.name;
        },
    },
    {
        header: "Email",
        cell: ({ row }) => {
            const teacher = row.original;
            return teacher.email;
        },
    },
];

interface Props {
    data: User[];
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
            router.refresh();
        });
    };

    const renderRowActions = (user: User) => {
        return (
            <ActionsDropdown>
                <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => removeClass(user.id)}
                >
                    Remove
                </DropdownMenuItem>
            </ActionsDropdown>
        );
    };

    return (
        <DataTable<User>
            {...props}
            columns={columns}
            renderRowActions={renderRowActions}
        />
    );
}
