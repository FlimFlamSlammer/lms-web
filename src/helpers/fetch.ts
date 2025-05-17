"use server";

import { APIResponse } from "@/types";
import { getLoginCookie } from "./auth/cookie";

type Method = "GET" | "POST" | "PUT" | "PATCH";

type RequestApiDTO = {
    headers?: HeadersInit;
    body?: Record<string, unknown>;
    params?: Record<string, unknown>;
};

export const requestApi = async <T>(
    path: string,
    method: Method,
    { headers, body, params = {} }: RequestApiDTO
): Promise<APIResponse<T>> => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
    });

    path = `${process.env.BASE_URL}${path}?${searchParams.toString()}`;

    const response = await fetch(path, {
        method,
        headers,
        body: JSON.stringify(body),
    });

    const res: APIResponse<T> = {
        error: null,
        errorFields: null,
        data: null,
    };

    const data = await response.json();
    if (!response.ok) {
        if (data.error.message) {
            res.error = data.error.message;
        } else if (data.error.fields) {
            res.errorFields = data.error.fields;
        }
    } else {
        res.data = data.data;
    }

    return res;
};

export const requestApiWithAuthentication = async <T>(
    path: string,
    method: Method,
    { headers, body, params }: RequestApiDTO
): Promise<APIResponse<T>> => {
    const token = await getLoginCookie();

    return await requestApi(path, method, {
        headers: {
            ...headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
        },
        body,
        params,
    });
};
