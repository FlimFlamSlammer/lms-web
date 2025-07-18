"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Course } from "@/types";

export type UpdateCourseDTO = Partial<Omit<Course, "id">>;

export const updateCourse = async (id: string, dto: UpdateCourseDTO) => {
    return await requestApiWithAuthentication<Course>(`/courses/${id}`, "PUT", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
    });
};
