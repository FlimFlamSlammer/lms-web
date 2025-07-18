"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Class } from "@/types";

export type CreateClassDTO = Partial<Omit<Class, "id">>;

export const updateClass = async (id: string, dto: CreateClassDTO) => {
    return await requestApiWithAuthentication<Class>(`/classes/${id}`, "PUT", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
    });
};
