import { getClasses } from "@/actions/classes/get-classes";
import { ClassDataTable } from "@/components/classes/data-table";
import { Button } from "@/components/ui/button";
import { FormFilter, FormFilterSelect } from "@/components/ui/form-filter";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
                <FormFilter>
                    <Input
                        name="search"
                        placeholder="Search"
                        defaultValue={(await searchParams).search}
                    />
                    <FormFilterSelect name="status">
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                    </FormFilterSelect>
                </FormFilter>
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
