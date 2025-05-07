"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const CoursePage = () => {
    const { id }: { id: string } = useParams();
    const router = useRouter();
    useEffect(() => {
        router.replace(`/courses/${id}/assignments`);
    });
};

export default CoursePage;
