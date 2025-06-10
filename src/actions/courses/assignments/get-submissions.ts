"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { ListQueryParams, Status, Submission } from "@/types";

type GetSubmissionsResponseData = {
    data: Submission[];
    total: number;
};

export const getSubmissions = async (
    courseId: string,
    assignmentId: string,
    {
        page,
        size = 10,
        mode = "pagination",
        search,
    }: Omit<ListQueryParams, Status>
) => {
    return await requestApiWithAuthentication<GetSubmissionsResponseData>(
        `/courses/${courseId}/assignments/${assignmentId}/submissions`,
        "GET",
        {
            params: {
                page: String(page),
                size: String(size),
                mode,
                search: search || "",
            },
        }
    );
};
