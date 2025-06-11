import { requestApiWithAuthentication } from "@/helpers/fetch";

export const gradeAssignment = async (
    courseId: string,
    id: string,
    studentId: string,
    grade: string
) => {
    return await requestApiWithAuthentication(
        `/courses/${courseId}/assignments/${id}/submissions/${studentId}/grade`,
        "PATCH",
        {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                grade,
            }),
        }
    );
};
