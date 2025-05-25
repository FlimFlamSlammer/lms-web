"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Course } from "@/types";

export type GetCoursesResponseData = {
    subjects: Course[];
    total: number;
};

export const getCourses = async ({
    page,
    size = 10,
    mode = "pagination",
    search,
    status = "all",
}: {
    page: number;
    size?: number;
    mode?: "all" | "pagination";
    search?: string;
    status?: "all" | "active" | "inactive";
}) => {
    return await requestApiWithAuthentication<GetCoursesResponseData>(
        "/subjects",
        "GET",
        {
            params: {
                page: String(page),
                size: String(size),
                mode,
                search: search || "",
                status,
            },
        }
    );
};
