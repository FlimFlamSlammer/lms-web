import { requestApiWithAuthentication } from "@/helpers/fetch";
import { User } from "@/types";

export const getStudentsNotInClass = async (id: string) => {
    return await requestApiWithAuthentication<User[]>(
        `/classes/${id}/students-not-in-class`,
        "GET",
        {}
    );
};
