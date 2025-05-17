"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse } from "@/types";

export const activateClass = async (id: string): Promise<APIResponse> => {
    return await requestApiWithAuthentication(
        `/classes/${id}/activate`,
        "PATCH",
        {}
    );
};

export const deactivateClass = async (id: string): Promise<APIResponse> => {
    return await requestApiWithAuthentication(
        `/classes/${id}/deactivate`,
        "PATCH",
        {}
    );
};
