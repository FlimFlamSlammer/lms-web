"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, Subject } from "@/types";

export type CreateSubjectDTO = Omit<Subject, "status" | "id">;

export const createSubject = async (
    dto: CreateSubjectDTO
): Promise<APIResponse<Subject>> => {
    return await requestApiWithAuthentication("/subjects", "POST", {
        body: JSON.stringify(dto),
    });
};
