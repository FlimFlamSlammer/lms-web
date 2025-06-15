import { requestApiWithAuthentication } from "@/helpers/fetch";
import { Assignment } from "@/types";

export type UpdateAssignmentDTO = Omit<
    Assignment,
    "id" | "status" | "courseId"
>;

export const updateAssignment = async (
    courseId: string,
    dto: UpdateAssignmentDTO
) => {
    return await requestApiWithAuthentication<Assignment>(
        `/courses/${courseId}/assignments`,
        "PUT",
        {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...dto, courseId }),
        }
    );
};
