import { getCourses } from "@/actions/courses/get-courses";
import { CourseDataTable } from "@/components/courses/data-table";
import { AccessControl } from "@/components/shared/access-control";
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
                <FormFilterWithStatus />
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
