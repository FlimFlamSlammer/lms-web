import { getCourses } from "@/actions/courses/get-courses";
import { CourseDataTable } from "@/components/courses/data-table";
import { AccessControl } from "@/components/shared/access-control";
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

    const { data, error } = await getCourses({
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
            <Header>Courses</Header>
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
                <AccessControl roles={["superadmin", "admin"]}>
                    <Button asChild>
                        <Link href="/courses/create">Add Course</Link>
                    </Button>
                </AccessControl>
            </div>
            <CourseDataTable
                data={data.data}
                rowCount={data.total}
                page={page}
                pageSize={10}
            />
        </>
    );
};

export default CoursesPage;
