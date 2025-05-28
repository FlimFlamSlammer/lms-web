"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export const addClassesToCourse = async (id: string, classIds: string[]) => {
    return await requestApiWithAuthentication(
        `/courses/${id}/add-classes`,
        "PATCH",
        {
            body: {
                classIds,
            },
        }
    );
};

export const removeClassesFromCourse = async (
    id: string,
    classIds: string[]
) => {
    return await requestApiWithAuthentication(
        `/courses/${id}/remove-classes`,
        "PATCH",
        {
            body: {
                classIds,
            },
        }
    );
};
