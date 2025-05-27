"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Course } from "@/types";

export type CreateCoursetDTO = Omit<Course, "status" | "id">;

export const createCourse = async (dto: CreateCoursetDTO) => {
    return await requestApiWithAuthentication<Course>("/courses", "POST", {
        body: dto,
    });
};
