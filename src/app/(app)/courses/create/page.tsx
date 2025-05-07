import { CreateCourseForm } from "@/components/courses/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/ui/header";

const CreateCoursePage = () => {
    return (
        <>
            <Header>Create Course</Header>
            <div className="flex justify-center">
                <Card>
                    <CardHeader className="pt-0"></CardHeader>
                    <CardContent>
                        <CreateCourseForm />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CreateCoursePage;
