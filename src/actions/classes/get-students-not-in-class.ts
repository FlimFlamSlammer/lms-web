import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Student } from "@/types";

export const getStudentsNotInClass = (id: string) => {
    return requestApiWithAuthentication<Student[]>(
        `/classes/${id}/students-not-in-class`,
        "GET",
        {}
    );
};
