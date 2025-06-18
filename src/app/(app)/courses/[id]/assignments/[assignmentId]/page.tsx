"use server";

import { getAssignment } from "@/actions/courses/assignments/get-assignment";
import { getMySubmissions } from "@/actions/courses/assignments/get-my-submissions";
import { SubmitAssignmentForm } from "@/components/courses/assignments/submissions/form";
import { DownloadLink } from "@/components/ui/download-link";
import { Markdown } from "@/components/ui/markdown";
import { Separator } from "@/components/ui/separator";

type Props = {
    params: {
        id: string;
        assignmentId: string;
    };
};

const AssignmentPage = async ({ params }: Props) => {
    const { id, assignmentId } = await params;
    const assignment = (await getAssignment(id, assignmentId)).data;
    const submissions = (await getMySubmissions(id, assignmentId)).data;

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="mb-1">{assignment?.title}</h2>
                <div className="flex gap-x-2">
                    {submissions && submissions[0] ? (
                        <DownloadLink
                            href={`/api/file/${submissions[0].attachmentPath}`}
                        >
                            Download Sumission
                        </DownloadLink>
                    ) : (
                        <SubmitAssignmentForm />
                    )}
                </div>
            </div>

            <Separator className="mb-3" />
            <Markdown>{assignment?.description}</Markdown>
        </div>
    );
};

export default AssignmentPage;
