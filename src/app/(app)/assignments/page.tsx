import { getTodoAssignments } from "@/actions/assignments/get-todo-assignments";
import { AssignmentDataTable } from "@/components/assignments/data-table";
import { CourseAssignmentsDataTable } from "@/components/courses/assignments/data-table";
import { Header } from "@/components/ui/header";
import { AssignmentStatus } from "@/types";

type Props = {
    searchParams: Promise<{
        status?: AssignmentStatus | "all";
        page?: string;
        search?: string;
        active?: string;
        done?: string;
        started?: string;
    }>;
};

const TodoPage = async ({ searchParams }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);

    const { data, error } = await getTodoAssignments({
        page,
        status: (await searchParams).status,
        search: (await searchParams).search,
        active: (await searchParams).active,
        done: (await searchParams).done,
        started: (await searchParams).started,
    });

    if (error) {
        throw new Error(error);
    }

    if (!data) return;

    return (
        <>
            <Header>To-do Assignments</Header>
            <div className="w-full">
                <AssignmentDataTable
                    data={data.data}
                    rowCount={data.total}
                    page={page}
                    pageSize={10}
                />
            </div>
        </>
    );
};

export default TodoPage;
