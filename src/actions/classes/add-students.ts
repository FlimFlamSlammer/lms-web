"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export const addStudents = async (id: string, studentIds: string[]) => {
    return await requestApiWithAuthentication(
        `/classes/${id}/add-students`,
        "PATCH",
        {
            body: {
                studentIds,
            },
        }
    );
};
