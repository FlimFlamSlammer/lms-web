"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Class, ListQueryParams } from "@/types";

export type GetClassesInCourseResponseData = {
    data: Class[];
    total: number;
};

export const getClassesInCourse = async (
    id: string,
    {
        page,
        size = 10,
        mode = "pagination",
        search,
        status = "all",
    }: ListQueryParams
) => {
    return await requestApiWithAuthentication<GetClassesInCourseResponseData>(
        `/courses/${id}/classes`,
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
