"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export const activateUser = async (id: string) => {
    return await requestApiWithAuthentication(
        `/users/${id}/activate`,
        "PATCH",
        {}
    );
};

export const deactivateUser = async (id: string) => {
    return await requestApiWithAuthentication(
        `/users/${id}/deactivate`,
        "PATCH",
        {}
    );
};
