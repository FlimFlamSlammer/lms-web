"use server";

import { setLoginCookie } from "@/helpers/auth/cookie";
import { requestApi } from "@/helpers/fetch";
import { User } from "@/types";

export type LoginResponseData = {
    token: string;
    user: User;
};

export const login = async (dto: { email: string; password: string }) => {
    const res = await requestApi<LoginResponseData>("/auth/login", "POST", {
        headers: { "Content-Type": "application/json" },
        body: dto,
    });

    if (res.data) {
        await setLoginCookie(res.data.token);
    }

    return res;
};
