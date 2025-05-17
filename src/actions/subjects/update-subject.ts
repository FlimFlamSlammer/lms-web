"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, Subject } from "@/types";

export type UpdateSubjectDTO = Omit<Subject, "id">;

export const createSubject = async (
    id: string,
    dto: UpdateSubjectDTO
): Promise<APIResponse<Subject>> => {
    return await requestApiWithAuthentication(`/subjects/${id}`, "PUT", {
        body: dto,
    });
};
