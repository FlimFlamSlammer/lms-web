"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Subject } from "@/types";

export const getSubject = async (id: string) => {
    return await requestApiWithAuthentication<Subject>(
        `/subjects/${id}`,
        "GET",
        {}
    );
};
