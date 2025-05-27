"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Course } from "@/types";

export type UpdateCourseDTO = Omit<Course, "id">;

export const createCourse = async (id: string, dto: UpdateCourseDTO) => {
    return await requestApiWithAuthentication<Course>(`/courses/${id}`, "PUT", {
        body: dto,
    });
};
