"use client";

import { CourseTeacherDataTable } from "@/components/courses/teachers/data-table";
import { CourseTeacherSelector } from "@/components/courses/teachers/selector";
import { useDataContext } from "@/components/providers/data-provider";
import { FormFilter, FormFilterField } from "@/components/ui/form-filter";
import { Course } from "@/types";
import { useSearchParams } from "next/navigation";

const filterFields: FormFilterField[] = [
    {
        name: "search",
        placeholder: "Search",
    },
];

const CourseClassesPage = () => {
    const page = Math.max(parseInt(useSearchParams().get("page") || "1"), 1);
    const course = useDataContext() as Course | null;

    if (!course) {
        return;
    }

    if (course.teachers === undefined) {
        alert("Something went wrong! Please try again later.");
        throw new Error("Teachers in Course is undefined.");
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <FormFilter fields={filterFields} />
                <CourseTeacherSelector />
            </div>
            <CourseTeacherDataTable
                data={course.teachers}
                rowCount={course.teachers.length}
                page={page}
                pageSize={10}
            />
        </div>
    );
};

export default CourseClassesPage;
