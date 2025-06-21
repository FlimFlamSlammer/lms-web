"use server";

import { getAssignment } from "@/actions/courses/assignments/get-assignment";
import { getMySubmissions } from "@/actions/courses/assignments/get-my-submissions";
import { SubmitAssignmentForm } from "@/components/courses/assignments/submissions/form";
import { DownloadLink } from "@/components/ui/download-link";
import {
    HorizontalDict,
    HorizontalDictItem,
    HorizontalDictKey,
    HorizontalDictValue,
} from "@/components/ui/horizontal-dict";
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

            <Separator className="mb-2 mt-1" />
            <HorizontalDict>
                <HorizontalDictItem>
                    <HorizontalDictKey>Starts at</HorizontalDictKey>
                    <HorizontalDictValue>
                        {new Date(
                            assignment?.startTime as string
                        ).toLocaleString()}
                    </HorizontalDictValue>
                </HorizontalDictItem>
                <HorizontalDictItem>
                    <HorizontalDictKey>Available until</HorizontalDictKey>
                    <HorizontalDictValue>
                        {new Date(
                            assignment?.endTime as string
                        ).toLocaleString()}
                    </HorizontalDictValue>
                </HorizontalDictItem>
                {submissions && submissions[0] ? (
                    <HorizontalDictItem>
                        <HorizontalDictKey>Grade</HorizontalDictKey>
                        <HorizontalDictValue>
                            {submissions[0].grade || "-"}
                        </HorizontalDictValue>
                    </HorizontalDictItem>
                ) : undefined}
                <HorizontalDictItem>
                    <HorizontalDictKey>Max grade</HorizontalDictKey>
                    <HorizontalDictValue>
                        {assignment?.maxGrade}
                    </HorizontalDictValue>
                </HorizontalDictItem>
            </HorizontalDict>
            <Separator className="mb-3 mt-2" />

            <Markdown>{assignment?.description}</Markdown>
        </div>
    );
};

export default AssignmentPage;
