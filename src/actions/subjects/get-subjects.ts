"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Subject } from "@/types";

export type GetSubjectsResponseData = {
    subjects: Subject[];
    total: number;
};

export const getSubjects = async ({
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
    return await requestApiWithAuthentication<GetSubjectsResponseData>(
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
