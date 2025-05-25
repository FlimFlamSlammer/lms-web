import { getCourses } from "@/actions/courses/get-courses";
import { CourseDataTable } from "@/components/courses/data-table";
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
                <FormFilter fields={filterFields} />
                <Button asChild>
                    <Link href="/courses/create">Add Course</Link>
                </Button>
            </div>
            <CourseDataTable
                data={data.subjects}
                rowCount={data.total}
                page={page}
                pageSize={10}
            />
        </>
    );
};

export default CoursesPage;
