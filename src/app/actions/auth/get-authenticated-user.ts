"use server";

import { getLoginCookie } from "@/helpers/auth/cookie";
import { requestApi } from "@/helpers/fetch";
import { APIResponse } from "@/types";

export const getAuthenticatedUser = async (): Promise<APIResponse> => {
    const token = await getLoginCookie();

    return await requestApi("/auth/me", "GET", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
        },
    });
};
