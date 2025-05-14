import { CreateClassForm } from "@/components/classes/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/ui/header";

const CreateCoursePage = () => {
    return (
        <>
            <Header>Create Class</Header>
            <div className="flex justify-center">
                <Card>
                    <CardHeader className="pt-0"></CardHeader>
                    <CardContent>
                        <CreateClassForm />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CreateCoursePage;
