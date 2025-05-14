import { AddStudentsToClassForm } from "@/components/classes/students/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddStudentsToClassPage = () => {
    return (
        <div className="flex justify-center">
            <Card>
                <CardHeader className="pt-0"></CardHeader>
                <CardContent>
                    <AddStudentsToClassForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default AddStudentsToClassPage;
