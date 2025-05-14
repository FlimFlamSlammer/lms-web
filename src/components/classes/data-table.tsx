"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Class } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { DataTable } from "../ui/data-table";
import Link from "next/link";

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
    return <DataTable<Class> {...props} columns={columns} />;
}
