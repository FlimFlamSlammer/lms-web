"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export const activateCourse = async (id: string) => {
    return await requestApiWithAuthentication(
        `/courses/${id}/activate`,
        "PATCH",
        {}
    );
};

export const deactivateCourse = async (id: string) => {
    return await requestApiWithAuthentication(
        `/courses/${id}/deactivate`,
        "PATCH",
        {}
    );
};
