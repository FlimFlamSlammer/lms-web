"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Class } from "@/types";

export type GetClassesResponseData = {
    classes: Class[];
    total: number;
};

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
}) => {
    return await requestApiWithAuthentication<GetClassesResponseData>(
        "/classes",
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
