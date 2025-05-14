import { getClasses } from "@/actions/classes/get-classes";
import { ClassDataTable } from "@/components/classes/data-table";
import { Button } from "@/components/ui/button";
import { FormFilter, FormFilterField } from "@/components/ui/form-filter";
import { Header } from "@/components/ui/header";
import Link from "next/link";

type Props = {
    searchParams: Promise<{
        status?: "all" | "active" | "inactive";
        page?: string;
        search?: string;
    }>;
};

const filterFields: FormFilterField[] = [
    {
        name: "search",
        placeholder: "Search",
    },
];

const CoursesPage = async ({ searchParams }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);

    const {
        data: { classes, total },
        error,
    } = await getClasses({
        page,
        status: (await searchParams).status,
        search: (await searchParams).search,
    });

    if (error) {
        throw new Error(error);
    }

    return (
        <>
            <Header>Classes</Header>
            <div className="flex items-center justify-between mb-4">
                <FormFilter fields={filterFields} />
                <Button asChild>
                    <Link href="/classes/create">Add Class</Link>
                </Button>
            </div>
            <ClassDataTable
                data={classes}
                rowCount={total}
                page={page}
                pageSize={10}
            />
        </>
    );
};

export default CoursesPage;
