"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Class } from "@/types";

export const getClass = async (id: string) => {
    return await requestApiWithAuthentication<Class>(
        `/classes/${id}`,
        "GET",
        {}
    );
};
