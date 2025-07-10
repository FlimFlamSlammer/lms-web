import { getStudentsInClass } from "@/actions/classes/get-students";
import { ClassUserDataTable } from "@/components/classes/students/data-table";
import { StudentSelector } from "@/components/classes/students/selector";
import { FormFilterWithSearch } from "@/components/ui/generic-form-filters";

type Props = {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>;
    params: Promise<{
        id: string;
    }>;
};

const UsersPage = async ({ params, searchParams }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);
    const { data, error } = await getStudentsInClass((await params).id, {
        page,
        search: (await searchParams).search,
        status: "active",
    });

    if (error) {
        throw new Error(error);
    }

    if (!data) return;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <FormFilterWithSearch />
                <StudentSelector />
            </div>
            <ClassUserDataTable
                data={data.data}
                rowCount={data.total}
                page={page}
                pageSize={10}
            />
        </div>
    );
};

export default UsersPage;
