"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, User } from "@/types";

export const getUser = async (id: string): Promise<APIResponse<User>> => {
    return await requestApiWithAuthentication(`/users/${id}`, "GET", {});
};
