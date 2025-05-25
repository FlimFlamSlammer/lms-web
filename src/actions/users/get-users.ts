"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { ListQueryParams, User } from "@/types";

export type GetUsersResponseData = {
    users: User[];
    total: number;
};

export const getUsers = async ({
    page = 1,
    size = 10,
    mode = "pagination",
    search,
    status = "all",
}: ListQueryParams) => {
    return await requestApiWithAuthentication<GetUsersResponseData>(
        "/users",
        "GET",
        {
            params: {
                page: String(page),
                size: String(size),
                mode,
                search: search || "",
                status,
            },
        }
    );
};

export const getStudents = async ({
    page = 1,
    size = 10,
    mode = "pagination",
    search,
    status = "all",
}: ListQueryParams) => {
    return await requestApiWithAuthentication<GetUsersResponseData>(
        "/users/students",
        "GET",
        {
            params: {
                page: String(page),
                size: String(size),
                mode,
                search: search || "",
                status,
            },
        }
    );
};

export const getTeachers = async ({
    page = 1,
    size = 10,
    mode = "pagination",
    search,
    status = "all",
}: ListQueryParams) => {
    return await requestApiWithAuthentication<GetUsersResponseData>(
        "/users/teacher",
        "GET",
        {
            params: {
                page: String(page),
                size: String(size),
                mode,
                search: search || "",
                status,
            },
        }
    );
};
