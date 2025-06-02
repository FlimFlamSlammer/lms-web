import { CreateAssignmentForm } from "@/components/courses/assignments/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateAssignmentPage = () => {
    return (
        <>
            <div className="w-full flex justify-center items-center">
                <Card className="lg:w-2/3">
                    <CardHeader>
                        <CardTitle>Create Assignment</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <CreateAssignmentForm />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CreateAssignmentPage;
