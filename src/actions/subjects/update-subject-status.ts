"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export const activateSubject = async (id: string) => {
    return await requestApiWithAuthentication(
        `/subjects/${id}/activate`,
        "PATCH",
        {}
    );
};

export const deactivateSubject = async (id: string) => {
    return await requestApiWithAuthentication(
        `/subjects/${id}/deactivate`,
        "PATCH",
        {}
    );
};
