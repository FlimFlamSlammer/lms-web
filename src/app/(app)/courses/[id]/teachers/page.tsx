"use server";

import { getTeachersInCourse } from "@/actions/courses/get-teachers";
import { CourseTeacherDataTable } from "@/components/courses/teachers/data-table";
import { CourseTeacherSelector } from "@/components/courses/teachers/selector";
import { FormFilterWithSearch } from "@/components/ui/generic-form-filters";

type Props = {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>;
    params: Promise<{
        id: string;
    }>;
};

const CourseTeachersPage = async ({ searchParams, params }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);
    const id = (await params).id;

    const { data, error } = await getTeachersInCourse(id, {
        page,
        status: "active",
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
                <FormFilterWithSearch />
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
