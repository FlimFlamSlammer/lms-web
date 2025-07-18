"use client";

import { getCourse } from "@/actions/courses/get-course";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { UpdateCourseForm } from "@/components/courses/form";
import { Course } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditCoursePage = () => {
    const { id }: { id: string } = useParams();
    const [course, setCourse] = useState<Course | null>();

    useEffect(() => {
        getCourse(id).then((res) => {
            setCourse(res.data);
        });
    }, [setCourse, id]);

    return (
        <div className="flex justify-center w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Course</CardTitle>
                    <CardDescription>
                        Update this course&apos;s data.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateCourseForm course={course || undefined} />
                </CardContent>
            </Card>
        </div>
    );
};

export default EditCoursePage;
