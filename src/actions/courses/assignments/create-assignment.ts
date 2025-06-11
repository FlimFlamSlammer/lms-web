import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Assignment } from "@/types";

export type CreateAssignmentDTO = Omit<
    Assignment,
    "id" | "status" | "courseId"
>;

export const createAssignment = async (
    courseId: string,
    dto: CreateAssignmentDTO
) => {
    return await requestApiWithAuthentication<Assignment>(
        `/courses/${courseId}/assignments`,
        "POST",
        {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...dto, courseId }),
        }
    );
};
