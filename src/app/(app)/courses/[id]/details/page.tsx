"use client";

import { getSubject } from "@/actions/subjects/get-subject";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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

    const tableRows = [
        {
            key: "Course",
            value: course?.name,
        },
        {
            key: "Grade",
            value: course?.grade,
        },
        {
            key: "Start year",
            value: course?.startYear,
        },
        {
            key: "End year",
            value: course?.endYear,
        },
    ];

    return (
        <Table>
            <TableBody>
                {tableRows.map((row) => {
                    return (
                        <TableRow key={row.key}>
                            <TableCell>{row.key}</TableCell>
                            <TableCell>{row.value}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default CourseAssignmentsPage;
