"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse } from "@/types";

export const activateSubject = async (id: string): Promise<APIResponse> => {
    return await requestApiWithAuthentication(
        `/subjects/${id}/activate`,
        "PATCH",
        {}
    );
};

export const deactivateSubject = async (id: string): Promise<APIResponse> => {
    return await requestApiWithAuthentication(
        `/subjects/${id}/deactivate`,
        "PATCH",
        {}
    );
};
