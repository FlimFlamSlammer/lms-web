"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Submission } from "@/types";

export const getMySubmissions = async (courseId: string, id: string) => {
    return await requestApiWithAuthentication<Submission[]>(
        `/courses/${courseId}/assignments/${id}/my-submissions`,
        "GET",
        {}
    );
};
