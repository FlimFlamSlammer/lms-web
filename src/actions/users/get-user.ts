"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { User } from "@/types";

export const getUser = async (id: string) => {
    return await requestApiWithAuthentication<User>(`/users/${id}`, "GET", {});
};
