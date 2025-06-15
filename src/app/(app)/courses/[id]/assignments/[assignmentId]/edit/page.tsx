"use client";

import { UpdateAssignmentForm } from "@/components/courses/assignments/form";
import { useDataContext } from "@/components/providers/data-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Assignment } from "@/types";

const CreateAssignmentPage = () => {
    const assignment = useDataContext() as Assignment;

    return (
        <>
            <div className="w-full flex justify-center items-center">
                <Card className="lg:w-2/3">
                    <CardHeader>
                        <CardTitle>Edit Assignment</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <UpdateAssignmentForm assignment={assignment} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CreateAssignmentPage;
