"use server";

import { getAssignment } from "@/actions/courses/assignments/get-assignment";
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

    return (
        <div className="w-full">
            <h2 className="mb-1">{assignment?.title}</h2>
            <Separator className="mb-3" />
            <Markdown>{assignment?.description}</Markdown>
        </div>
    );
};

export default AssignmentPage;
