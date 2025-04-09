"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, User } from "@/types";

export const listAccounts = async ({
    page,
    size = 10,
    mode = "pagination",
    search,
    status,
}: {
    page: number;
    size?: number;
    mode?: "all" | "pagination";
    search?: string;
    status: "all" | "active" | "inactive";
}): Promise<
    APIResponse<{
        users: User[];
        total: number;
    }>
> => {
    return await requestApiWithAuthentication(`/users`, "GET", {
        params: {
            page: String(page),
            size: String(size),
            mode,
            search: search || "",
            status,
        },
    });
};
