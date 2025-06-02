"use client";

import { useDataContext } from "@/components/providers/data-provider";
import { DictTable, DictTableRow } from "@/components/ui/dict-table";
import { Course } from "@/types";
const CourseAssignmentsPage = () => {
    const course = useDataContext() as Course;

    const tableRows: DictTableRow[] = [
        {
            key: "Grade",
            value: course?.grade.toString(),
        },
        {
            key: "Start year",
            value: course?.startYear.toString(),
        },
        {
            key: "End year",
            value: course?.endYear.toString(),
        },
    ];

    return (
        <div>
            <h3 className="mb-2">{course?.name}</h3>
            <DictTable rows={tableRows} className="w-fit" />
        </div>
    );
};

export default CourseAssignmentsPage;
