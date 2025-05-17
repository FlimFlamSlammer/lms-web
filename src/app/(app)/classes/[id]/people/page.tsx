"use client";

import { ClassUserDataTable } from "@/components/classes/students/data-table";
import { useDataContext } from "@/components/providers/data-provider";
import { Button } from "@/components/ui/button";
import { FormFilter, FormFilterField } from "@/components/ui/form-filter";
import { Class } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const filterFields: FormFilterField[] = [
    {
        name: "search",
        placeholder: "Search",
    },
];

const UsersPage = () => {
    const page = Math.max(parseInt(useSearchParams().get("page") || "1"), 1);
    const $class = useDataContext() as Class | null;

    if (!$class) {
        return;
    }

    if ($class.students === undefined) {
        alert("Something went wrong! Please try again later.");
        throw new Error("Students in Class is undefined.");
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <FormFilter fields={filterFields} />
                <Button asChild>
                    <Link href={`/classes/${$class.id}/people/add`}>
                        Add Students
                    </Link>
                </Button>
            </div>
            <ClassUserDataTable
                data={$class.students}
                rowCount={$class.students.length}
                page={page}
                pageSize={10}
            />
        </div>
    );
};

export default UsersPage;
