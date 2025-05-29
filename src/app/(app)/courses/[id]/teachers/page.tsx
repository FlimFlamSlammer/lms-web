"use server";

import { getTeachersInCourse } from "@/actions/courses/get-teachers";
import { CourseTeacherDataTable } from "@/components/courses/teachers/data-table";
import { CourseTeacherSelector } from "@/components/courses/teachers/selector";
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

const CourseTeachersPage = async ({ searchParams, params }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);
    const id = (await params).id;

    const { data, error } = await getTeachersInCourse(id, {
        page,
        status: (await searchParams).status,
        search: (await searchParams).search,
    });

    if (error) {
        throw new Error(error);
    }

    if (!data) return;
    console.log(data);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <FormFilter fields={filterFields} />
                <CourseTeacherSelector />
            </div>
            <CourseTeacherDataTable
                data={data.data}
                rowCount={data.total}
                page={page}
                pageSize={10}
            />
        </div>
    );
};

export default CourseTeachersPage;
