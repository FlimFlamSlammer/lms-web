"use server";

import { getClassesInCourse } from "@/actions/courses/get-classes";
import { CourseClassDataTable } from "@/components/courses/classes/data-table";
import { CourseClassSelector } from "@/components/courses/classes/selector";
import { FormFilter, FormFilterField } from "@/components/ui/form-filter";

type Props = {
    searchParams: Promise<{
        status?: "all" | "active" | "inactive";
        page?: string;
        search?: string;
    }>;
    params: Promise<{
        id: string;
    }>;
};

const filterFields: FormFilterField[] = [
    {
        name: "search",
        placeholder: "Search",
    },
];

const CourseClassesPage = async ({ searchParams, params }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);
    const id = (await params).id;

    const { data, error } = await getClassesInCourse(id, {
        page,
        status: (await searchParams).status,
        search: (await searchParams).search,
    });

    if (error) {
        throw new Error(error);
    }

    if (!data) return;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <FormFilter fields={filterFields} />
                <CourseClassSelector />
            </div>
            <CourseClassDataTable
                data={data.data}
                rowCount={data.total}
                page={page}
                pageSize={10}
            />
        </div>
    );
};

export default CourseClassesPage;
