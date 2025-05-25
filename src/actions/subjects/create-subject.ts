"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Subject } from "@/types";

export type CreateSubjectDTO = Omit<Subject, "status" | "id">;

export const createSubject = async (dto: CreateSubjectDTO) => {
    return await requestApiWithAuthentication<Subject>("/subjects", "POST", {
        body: dto,
    });
};
