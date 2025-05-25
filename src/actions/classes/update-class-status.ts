"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export const activateClass = async (id: string) => {
    return await requestApiWithAuthentication(
        `/classes/${id}/activate`,
        "PATCH",
        {}
    );
};

export const deactivateClass = async (id: string) => {
    return await requestApiWithAuthentication(
        `/classes/${id}/deactivate`,
        "PATCH",
        {}
    );
};
