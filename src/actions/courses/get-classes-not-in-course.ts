import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Class } from "@/types";

export const getClassesNotInCourse = async (id: string) => {
    return await requestApiWithAuthentication<Class[]>(
        `/courses/${id}/classes-not-in-course`,
        "GET",
        {}
    );
};
