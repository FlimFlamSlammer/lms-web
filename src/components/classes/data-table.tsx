"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Class } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { DataTable } from "../ui/data-table";
import Link from "next/link";
import { ActionsDropdown } from "../ui/actions-dropdown";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
    activateClass,
    deactivateClass,
} from "@/actions/classes/update-class-status";
import { reloadPage } from "@/helpers/reload-page";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const columns: ColumnDef<Class>[] = [
    {
        header: "Name",
        cell: ({ row }) => {
            const $class = row.original;
            return (
                <Link className="link" href={`/classes/${$class.id}/`}>
                    {$class.name}
                </Link>
            );
        },
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
    data: Class[];
    rowCount: number;
    page: number;
    pageSize: number;
}

export function ClassDataTable(props: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const toggleClassStatus = async ($class: Class) => {
        if ($class.status == "active") await deactivateClass($class.id);
        else await activateClass($class.id);
        reloadPage(router, pathname, searchParams);
    };

    const renderRowActions = ($class: Class) => {
        return (
            <ActionsDropdown>
                <DropdownMenuItem onClick={() => toggleClassStatus($class)}>
                    {$class.status == "active" ? "Deactivate" : "Activate"}
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
