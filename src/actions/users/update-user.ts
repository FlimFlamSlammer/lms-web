"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { APIResponse, User } from "@/types";
import { CreateStudentDTO, CreateTeacherDTO } from "./create-user";

export type UpdateUserDTO = Partial<Omit<User, "role" | "id">>;
export type UpdateStudentDTO = Partial<CreateStudentDTO>;
export type UpdateTeacherDTO = Partial<CreateTeacherDTO>;

export const updateUser = async (
    id: string,
    dto: {
        userData: UpdateUserDTO;
        roleData?: UpdateStudentDTO | UpdateTeacherDTO;
    }
): Promise<APIResponse<User>> => {
    return await requestApiWithAuthentication(`/users/${id}`, "PUT", {
        body: dto,
    });
};
