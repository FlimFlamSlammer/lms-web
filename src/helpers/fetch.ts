"use server";

import { APIResponse } from "@/types";

const API_PORT = 5000;

const AVAILABLE_METHODS = ["GET", "POST", "PUT", "PATCH"] as const;
type Method = (typeof AVAILABLE_METHODS)[number];

type RequestApiDTO = {
    headers?: HeadersInit;
    body?: BodyInit;
};

export const requestApi = async (
    path: string,
    method: Method,
    { headers, body }: RequestApiDTO
): Promise<APIResponse> => {
    path = `http://localhost:${API_PORT}/api/v1${path}`;

    const response = await fetch(path, {
        method,
        headers,
        body,
    });

    const res: APIResponse = {
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
