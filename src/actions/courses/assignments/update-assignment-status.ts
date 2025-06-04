import { requestApiWithAuthentication } from "@/helpers/fetch";

export const cancelAssignment = async (courseId: string, id: string) => {
    return requestApiWithAuthentication(
        `/courses/${courseId}/assignments/${id}/cancel`,
        "PATCH",
        {}
    );
};

export const postAssignment = async (courseId: string, id: string) => {
    return requestApiWithAuthentication(
        `/courses/${courseId}/assignments/${id}/post`,
        "PATCH",
        {}
    );
};

export const draftAssignment = async (courseId: string, id: string) => {
    return requestApiWithAuthentication(
        `/courses/${courseId}/assignments/${id}/draft`,
        "PATCH",
        {}
    );
};
