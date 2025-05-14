"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, ListQueryParams, User } from "@/types";

export type GetUsersResponse = APIResponse<{
    users: User[];
    total: number;
}>;

export const getUsers = async ({
    page = 1,
    size = 10,
    mode = "pagination",
    search,
    status = "all",
}: ListQueryParams): Promise<GetUsersResponse> => {
    return await requestApiWithAuthentication("/users", "GET", {
        params: {
            page: String(page),
            size: String(size),
            mode,
            search: search || "",
            status,
        },
    });
};

export const getStudents = async ({
    page = 1,
    size = 10,
    mode = "pagination",
    search,
    status = "all",
}: ListQueryParams): Promise<GetUsersResponse> => {
    return await requestApiWithAuthentication("/users/students", "GET", {
        params: {
            page: String(page),
            size: String(size),
            mode,
            search: search || "",
            status,
        },
    });
};

export const getTeachers = async ({
    page = 1,
    size = 10,
    mode = "pagination",
    search,
    status = "all",
}: ListQueryParams): Promise<GetUsersResponse> => {
    return await requestApiWithAuthentication("/users/teacher", "GET", {
        params: {
            page: String(page),
            size: String(size),
            mode,
            search: search || "",
            status,
        },
    });
};
