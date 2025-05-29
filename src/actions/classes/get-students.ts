"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { ListQueryParams, User } from "@/types";

export type GetStudentsInClassResponseData = {
    data: User[];
    total: number;
};

export const getStudentsInClass = async (
    id: string,
    {
        page,
        size = 10,
        mode = "pagination",
        search,
        status = "all",
    }: ListQueryParams
) => {
    return await requestApiWithAuthentication<GetStudentsInClassResponseData>(
        `/classes/${id}/students`,
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
