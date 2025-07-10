import { getClasses } from "@/actions/classes/get-classes";
import { ClassDataTable } from "@/components/classes/data-table";
import { Button } from "@/components/ui/button";
import { FormFilterWithStatus } from "@/components/ui/generic-form-filters";
import { Header } from "@/components/ui/header";
import { SearchParams } from "@/types";
import Link from "next/link";

type Props = {
    searchParams: Promise<SearchParams>;
};

const CoursesPage = async ({ searchParams }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);

    const { data, error } = await getClasses({
        page,
        status: (await searchParams).status,
        search: (await searchParams).search,
    });

    if (error) {
        throw new Error(error);
    }

    if (!data) return;

    return (
        <>
            <Header>Classes</Header>
            <div className="flex items-center justify-between mb-4">
                <FormFilterWithStatus />
                <Button asChild>
                    <Link href="/classes/create">Add Class</Link>
                </Button>
            </div>
            <ClassDataTable
                data={data.data}
                rowCount={data.total}
                page={page}
                pageSize={10}
            />
        </>
    );
};

export default CoursesPage;
