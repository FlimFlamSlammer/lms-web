"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Assignment } from "@/types";

export const getAssignment = async (courseId: string, id: string) => {
    return await requestApiWithAuthentication<Assignment>(
        `/courses/${courseId}/assignments/${id}`,
        "GET",
        {}
    );
};
