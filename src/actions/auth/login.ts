"use server";
// means only be access by server component.

import { setLoginCookie } from "@/helpers/auth/cookie";
import { requestApi } from "@/helpers/fetch";
import { APIResponse } from "@/types";

export type LoginResponse = APIResponse<{
    token: string;
}>;

export const login = async (dto: {
    email: string;
    password: string;
}): Promise<LoginResponse> => {
    const res: LoginResponse = await requestApi("/auth/login", "POST", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
    });

    if (res.data) {
        await setLoginCookie(res.data.token);
    }

    return res;
};
