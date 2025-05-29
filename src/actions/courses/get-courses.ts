"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Course, ListQueryParams } from "@/types";

export type GetCoursesResponseData = {
    data: Course[];
    total: number;
};

export const getCourses = async ({
    page,
    size = 10,
    mode = "pagination",
    search,
    status = "all",
}: ListQueryParams) => {
    return await requestApiWithAuthentication<GetCoursesResponseData>(
        "/courses",
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
