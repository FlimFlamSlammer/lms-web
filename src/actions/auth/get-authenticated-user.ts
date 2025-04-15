"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, User } from "@/types";

export type GetUserResponse = APIResponse<{
    user: User;
}>;

export const getAuthenticatedUser = async (): Promise<GetUserResponse> => {
    return await requestApiWithAuthentication("/auth/me", "GET", {});
};
