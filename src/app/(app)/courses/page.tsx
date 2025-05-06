import { getSubjects } from "@/actions/subjects/get-subjects";
import { CourseDataTable } from "@/components/courses/data-table";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { UserFormFilter } from "@/components/users/form-filter";
import Link from "next/link";

type Props = {
    searchParams: Promise<{
        status?: "all" | "active" | "inactive";
        page?: string;
        search?: string;
    }>;
};

const CoursesPage = async ({ searchParams }: Props) => {
    const page = Math.max(parseInt((await searchParams).page || "1"), 1);

    const {
        data: { subjects, total },
        error,
    } = await getSubjects({
        page,
        status: (await searchParams).status,
        search: (await searchParams).search,
    });

    console.log(subjects);

    if (error) {
        throw new Error(error);
    }

    return (
        <>
            <Header>Courses</Header>
            <div className="flex items-center justify-between my-4">
                <UserFormFilter />
                <Button asChild>
                    <Link href="/users/create">Add Course</Link>
                </Button>
            </div>
            <CourseDataTable
                data={subjects}
                rowCount={total}
                page={page}
                pageSize={10}
            />
        </>
    );
};

export default CoursesPage;
