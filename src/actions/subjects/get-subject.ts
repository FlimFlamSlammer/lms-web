"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, Subject } from "@/types";

export const getSubject = async (id: string): Promise<APIResponse<Subject>> => {
    return await requestApiWithAuthentication(`/subjects/${id}`, "GET", {});
};
