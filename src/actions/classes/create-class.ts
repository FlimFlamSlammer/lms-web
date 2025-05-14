"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, Class } from "@/types";

export type CreateClassDTO = Omit<Class, "status" | "id">;

export const createClass = async (
    dto: CreateClassDTO
): Promise<APIResponse<Class>> => {
    return await requestApiWithAuthentication("/classes", "POST", {
        body: JSON.stringify(dto),
    });
};
