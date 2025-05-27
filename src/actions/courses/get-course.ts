"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Course } from "@/types";

export const getCourse = async (id: string) => {
    return await requestApiWithAuthentication<Course>(
        `/courses/${id}`,
        "GET",
        {}
    );
};
