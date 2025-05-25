"use server";

import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Student, Teacher, User } from "@/types";

export type CreateUserDTO = Omit<User, "status" | "id">;
export type CreateStudentDTO = Omit<Student, "id">;
export type CreateTeacherDTO = Omit<Teacher, "id">;

export const createUser = async (dto: {
    userData: CreateUserDTO;
    roleData?: CreateTeacherDTO | CreateStudentDTO;
}) => {
    return await requestApiWithAuthentication<User>("/users", "POST", {
        body: dto,
    });
};
