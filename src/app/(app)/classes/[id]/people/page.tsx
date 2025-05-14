import { getClass } from "@/actions/classes/get-class";
import { ClassUserDataTable } from "@/components/classes/students/data-table";
import { Button } from "@/components/ui/button";
import { FormFilter, FormFilterField } from "@/components/ui/form-filter";
import Link from "next/link";

type Props = {
    searchParams: Promise<{
        status?: "all" | "active" | "inactive";
        page?: string;
        search?: string;
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

const UsersPage = async ({ searchParams, params }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);

    const { data, error } = await getClass((await params).id);

    if (error) {
        throw new Error(error);
    }

    if (data.students === undefined) {
        alert("Something went wrong! Please try again later.");
        throw new Error("Students in Class is undefined.");
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <FormFilter fields={filterFields} />
                <Button asChild>
                    <Link href={`/classes/${(await params).id}/people/add`}>
                        Add Students
                    </Link>
                </Button>
            </div>
            <ClassUserDataTable
                data={data.students}
                rowCount={data.students.length}
                page={page}
                pageSize={10}
            />
        </div>
    );
};

export default UsersPage;
