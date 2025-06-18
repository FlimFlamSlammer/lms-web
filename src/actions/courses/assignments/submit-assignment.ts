import { requestApiWithAuthentication } from "@/helpers/fetch";

type SubmitAssignmentDTO = {
    attachmentPath: string;
};

export const submitAssignment = async (
    courseId: string,
    id: string,
    dto: SubmitAssignmentDTO
) => {
    const res = await requestApiWithAuthentication(
        `/courses/${courseId}/assignments/${id}/submit`,
        "POST",
        {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto),
        }
    );

    console.log(res);

    return res;
};
