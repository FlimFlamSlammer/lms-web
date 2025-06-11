"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";

export const addTeachersToCourse = async (id: string, teacherIds: string[]) => {
    return await requestApiWithAuthentication(
        `/courses/${id}/add-teachers`,
        "PATCH",
        {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                teacherIds,
            }),
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                teacherIds,
            }),
        }
    );
};
