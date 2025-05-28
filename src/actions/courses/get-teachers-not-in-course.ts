import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Teacher } from "@/types";

export const getTeachersNotInCourse = async (id: string) => {
    return await requestApiWithAuthentication<Teacher[]>(
        `/courses/${id}/teachers-not-in-course`,
        "GET",
        {}
    );
};
