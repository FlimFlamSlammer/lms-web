"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, Class } from "@/types";

export type GetClassesResponse = APIResponse<{
    classes: Class[];
    total: number;
}>;

export const getClasses = async ({
    page = 1,
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
}): Promise<GetClassesResponse> => {
    return await requestApiWithAuthentication("/classes", "GET", {
        params: {
            page: String(page),
            size: String(size),
            mode,
            search: search || "",
            status,
        },
    });
};
