"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { User } from "@/types";
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
) => {
    return await requestApiWithAuthentication<User>(`/users/${id}`, "PUT", {
        body: dto,
    });
};
