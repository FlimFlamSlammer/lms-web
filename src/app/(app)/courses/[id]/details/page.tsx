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
            key: "Course",
            value: course?.name,
        },
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

    return <DictTable rows={tableRows} />;
};

export default CourseAssignmentsPage;
