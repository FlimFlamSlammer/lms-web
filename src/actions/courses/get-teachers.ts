"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { ListQueryParams, User } from "@/types";

export type GetTeachersInCourseResponseData = {
    data: User[];
    total: number;
};

export const getTeachersInCourse = async (
    id: string,
    {
        page,
        size = 10,
        mode = "pagination",
        search,
        status = "all",
    }: ListQueryParams
) => {
    return await requestApiWithAuthentication<GetTeachersInCourseResponseData>(
        `/courses/${id}/teachers`,
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
