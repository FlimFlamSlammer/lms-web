"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export const activateCourse = async (id: string) => {
    return await requestApiWithAuthentication(
        `/subjects/${id}/activate`,
        "PATCH",
        {}
    );
};

export const deactivateCourse = async (id: string) => {
    return await requestApiWithAuthentication(
        `/subjects/${id}/deactivate`,
        "PATCH",
        {}
    );
};
