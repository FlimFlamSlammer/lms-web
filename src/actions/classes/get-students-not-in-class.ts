import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Student } from "@/types";

export const getStudentsNotInClass = async (id: string) => {
    return await requestApiWithAuthentication<Student[]>(
        `/classes/${id}/students-not-in-class`,
        "GET",
        {}
    );
};
