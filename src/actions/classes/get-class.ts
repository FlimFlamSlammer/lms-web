"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, Class } from "@/types";

export const getClass = async (id: string): Promise<APIResponse<Class>> => {
    return await requestApiWithAuthentication(`/classes/${id}`, "GET", {});
};
