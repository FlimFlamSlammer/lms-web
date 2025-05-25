"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { User } from "@/types";

export const getAuthenticatedUser = async () => {
    return await requestApiWithAuthentication<User>("/auth/me", "GET", {});
};
