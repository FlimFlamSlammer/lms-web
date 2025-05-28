"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export const addTeachersToCourse = async (id: string, teacherIds: string[]) => {
    return await requestApiWithAuthentication(
        `/courses/${id}/add-teachers`,
        "PATCH",
        {
            body: {
                teacherIds,
            },
        }
    );
};

export const removeTeachersFromCourse = async (
    id: string,
    teacherIds: string[]
) => {
    return await requestApiWithAuthentication(
        `/courses/${id}/remove-teachers`,
        "PATCH",
        {
            body: {
                teacherIds,
            },
        }
    );
};
