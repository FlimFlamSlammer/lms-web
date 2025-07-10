"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Class, Course } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDataContext } from "@/components/providers/data-provider";
import { reloadPage } from "@/helpers/reload-page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { removeClassesFromCourse } from "@/actions/courses/manage-classes";

const columns: ColumnDef<Class>[] = [
    {
        header: "Class",
        cell: ({ row }) => {
            const $class = row.original;
            return (
                <Link className="link" href={`/classes/${$class.id}/`}>
                    {$class.name}
                </Link>
            );
        },
    },
];

interface Props {
    data: Class[];
    rowCount: number;
    page: number;
    pageSize: number;
}

export function CourseClassDataTable(props: Props) {
    const course = useDataContext() as Course | null;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const removeClass = (id: string) => {
        if (!course) {
            throw new Error("Course to edit not found!");
        }

        removeClassesFromCourse(course.id, [id]).then(() => {
            router.refresh();
        });
    };

    const renderRowActions = ($class: Class) => {
        return (
            <ActionsDropdown>
                <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => removeClass($class.id)}
                >
                    Remove
                </DropdownMenuItem>
            </ActionsDropdown>
        );
    };

    return (
        <DataTable<Class>
            {...props}
            columns={columns}
            renderRowActions={renderRowActions}
        />
    );
}
