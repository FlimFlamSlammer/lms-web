"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse } from "@/types";

export const getAuthenticatedUser = async (): Promise<APIResponse> => {
    return await requestApiWithAuthentication("/auth/me", "GET", {});
};
