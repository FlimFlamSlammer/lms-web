"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Class } from "@/types";

export type CreateClassDTO = Omit<Class, "status" | "id">;

export const createClass = async (dto: CreateClassDTO) => {
    return await requestApiWithAuthentication<Class>("/classes", "POST", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
    });
};
