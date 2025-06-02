import { getAssignmentsInCourse } from "@/actions/courses/assignments/get-assignments";
import { CourseAssignmentDataTable } from "@/components/courses/assignments/data-table";
import { AccessControl } from "@/components/shared/access-control";
import { Button } from "@/components/ui/button";
import { AssignmentStatus } from "@/types";
import Link from "next/link";

type Props = {
    searchParams: Promise<{
        status?: AssignmentStatus | "all";
        page?: string;
        search?: string;
        active?: string;
        done?: string;
        started?: string;
    }>;
    params: Promise<{
        id: string;
    }>;
};

const filterFields: FormFilterField[] = [
    {
        name: "search",
        placeholder: "Search",
    },
];

const CourseAssignmentsPage = async ({ searchParams, params }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);
    const id = (await params).id;

    const { data, error } = await getAssignmentsInCourse(id, {
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
    console.log(data);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                {/* <FormFilter fields={filterFields} /> */}
                <AccessControl roles={["teacher"]}>
                    <Button asChild className="ml-auto">
                        <Link href={`/courses/${id}/assignments/create`}>
                            Add Course
                        </Link>
                    </Button>
                </AccessControl>
            </div>
            <CourseAssignmentDataTable
                data={data.data}
                rowCount={data.total}
                page={page}
                pageSize={10}
            />
        </div>
    );
};

export default CourseAssignmentsPage;
