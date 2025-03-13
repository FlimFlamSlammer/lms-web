"use server";
// means only be access by server component.

import { setLoginCookie } from "@/helpers/auth/cookie";
import { request_api } from "@/helpers/fetch";
import { APIResponse } from "@/types";

export const login = async (dto: {
    email: string;
    password: string;
}): Promise<APIResponse> => {
    return await request_api("/auth/login", "POST", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
    });
};
