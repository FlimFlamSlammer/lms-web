"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Subject } from "@/types";

export type UpdateSubjectDTO = Omit<Subject, "id">;

export const createSubject = async (id: string, dto: UpdateSubjectDTO) => {
    return await requestApiWithAuthentication<Subject>(
        `/subjects/${id}`,
        "PUT",
        {
            body: dto,
        }
    );
};
