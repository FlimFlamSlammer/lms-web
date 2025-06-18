"use client";

import { submitAssignment } from "@/actions/courses/assignments/submit-assignment";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadFileWithAlert } from "@/helpers/upload-with-alert";
import { useParams } from "next/navigation";

export const SubmitAssignmentForm = () => {
    const { id, assignmentId } = useParams() as {
        id: string;
        assignmentId: string;
    };

    const action = async (formData: FormData) => {
        const attachmentPath = (await uploadFileWithAlert(
            formData.get("file") as File
        )) as string;

        return await submitAssignment(id, assignmentId, {
            attachmentPath,
        });
    };

    return (
        <Form
            action={action}
            redirectURL={`/courses/${id}/assignments/${assignmentId}`}
        >
            <div className="flex gap-x-2">
                <Input type="file" name="file" />
                <Button>Submit</Button>
            </div>
        </Form>
    );
};
