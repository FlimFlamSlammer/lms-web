"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse } from "@/types";

export const activateUser = async (id: string): Promise<APIResponse> => {
    return await requestApiWithAuthentication(
        `/users/${id}/activate`,
        "PATCH",
        {}
    );
};

export const deactivateUser = async (id: string): Promise<APIResponse> => {
    return await requestApiWithAuthentication(
        `/users/${id}/deactivate`,
        "PATCH",
        {}
    );
};
