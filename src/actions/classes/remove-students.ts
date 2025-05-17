"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export const removeStudents = async (id: string, studentIds: string[]) => {
    return await requestApiWithAuthentication(
        `/classes/${id}/remove-students`,
        "PATCH",
        {
            body: {
                studentIds,
            },
        }
    );
};
