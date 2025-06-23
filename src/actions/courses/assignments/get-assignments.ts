"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Assignment, ListQueryParams } from "@/types";

export type GetAssignmentsResponseData = {
    data: Assignment[];
    total: number;
};

export type AssignmentStatus = "draft" | "posted" | "canceled";

export type AssignmentListQueryParams = Omit<ListQueryParams, "status"> & {
    status?: AssignmentStatus | "all";
    active?: string;
    done?: string;
    started?: string;
};

export const getAssignmentsInCourse = async (
    id: string,
    {
        page,
        size = 10,
        mode = "pagination",
        search,
        status = "all",
        active = "all",
        done = "all",
        started = "all",
    }: AssignmentListQueryParams
) => {
    return await requestApiWithAuthentication<GetAssignmentsResponseData>(
        `/courses/${id}/assignments`,
        "GET",
        {
            params: {
                page: String(page),
                size: String(size),
                mode,
                search: search || "",
                status,
                active,
                done,
                started,
            },
        }
    );
};
