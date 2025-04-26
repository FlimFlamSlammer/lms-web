"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, User } from "@/types";

export const updatePassword = async (dto: {
    password: string;
    newPassword: string;
}): Promise<APIResponse<User>> => {
    return await requestApiWithAuthentication("/auth/update-password", "PUT", {
        body: JSON.stringify(dto),
    });
};
