"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export const addStudentsToClass = async (id: string, studentIds: string[]) => {
    return await requestApiWithAuthentication(
        `/classes/${id}/add-students`,
        "PATCH",
        {
            body: JSON.stringify({
                studentIds,
            }),
        }
    );
};

export const removeStudentsFromClass = async (
    id: string,
    studentIds: string[]
) => {
    return await requestApiWithAuthentication(
        `/classes/${id}/remove-students`,
        "PATCH",
        {
            body: JSON.stringify({
                studentIds,
            }),
        }
    );
};
