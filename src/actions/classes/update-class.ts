"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Class } from "@/types";

export type CreateClassDTO = Omit<Class, "id">;

export const createClass = async (id: string, dto: CreateClassDTO) => {
    return await requestApiWithAuthentication<Class>(`/classes/${id}`, "PUT", {
        body: dto,
    });
};
