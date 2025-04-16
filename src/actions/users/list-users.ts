"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, User } from "@/types";

export type ListAccountsResponse = APIResponse<{
    users: User[];
    total: number;
}>;

export const listAccounts = async ({
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
}): Promise<ListAccountsResponse> => {
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
