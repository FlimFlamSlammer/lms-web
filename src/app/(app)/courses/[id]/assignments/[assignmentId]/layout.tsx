import { getAssignment } from "@/actions/courses/assignments/get-assignment";
import { DataProvider } from "@/components/providers/data-provider";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    params: {
        id: string;
        assignmentId: string;
    };
};

const AssignmentLayout = async (props: Props) => {
    const { id, assignmentId } = await props.params;
    const { data, error } = await getAssignment(id, assignmentId);

    if (error) {
        throw new Error(error);
    }

    if (!data) return;

    return <DataProvider value={data}>{props.children}</DataProvider>;
};

export default AssignmentLayout;
