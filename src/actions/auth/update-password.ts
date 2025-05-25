"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { User } from "@/types";

export const updatePassword = async (dto: {
    password: string;
    newPassword: string;
}) => {
    return await requestApiWithAuthentication<User>(
        "/auth/update-password",
        "PUT",
        {
            body: dto,
        }
    );
};
