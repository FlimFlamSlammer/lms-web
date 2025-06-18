"use server";

import { getSubmissions } from "@/actions/courses/assignments/get-submissions";
import { SubmissionDataTable } from "@/components/courses/assignments/submissions/data-table";
import { FormFilter, FormFilterField } from "@/components/ui/form-filter";
import { SearchParams } from "@/types";

type Props = {
    searchParams: Promise<Omit<SearchParams, "status">>;
    params: Promise<{
        id: string;
        assignmentId: string;
    }>;
};

const filterFields: FormFilterField[] = [
    {
        name: "search",
        placeholder: "Search",
    },
];

const SubmissionsPage = async ({ searchParams, params }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);
    const { id, assignmentId } = await params;

    const { data, error } = await getSubmissions(id, assignmentId, {
        page,
        search: (await searchParams).search,
    });

    if (error) {
        throw new Error(error);
    }

    if (!data) return;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <FormFilter fields={filterFields} />
            </div>
            <SubmissionDataTable
                data={data.data}
                rowCount={data.total}
                page={page}
                pageSize={10}
            />
        </div>
    );
};

export default SubmissionsPage;
