"use client";

import { getSubject } from "@/actions/subjects/get-subject";
import { DictTable, DictTableRow } from "@/components/ui/dict-table";
import { Subject } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CourseAssignmentsPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState<Subject>();

    useEffect(() => {
        getSubject(id as string).then((res) => {
            setCourse(res.data);
        });
    }, [id]);

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
            <h1 className="text-2xl mb-2">{course?.name}</h1>
            <DictTable rows={tableRows} className="w-fit" />
        </div>
    );
};

export default CourseAssignmentsPage;
