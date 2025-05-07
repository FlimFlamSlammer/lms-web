"use client";

import {
    createSubject,
    CreateSubjectDTO,
} from "@/actions/subjects/create-subject";
import { CreateCourseInputs } from "@/components/courses/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/form-button";
import { Header } from "@/components/ui/header";

const CreateCoursePage = () => {
    const action = (formData: FormData) => {
        const data: CreateSubjectDTO = {
            name: formData.get("name") as string,
            grade: parseInt(formData.get("grade") as string),
            startYear: parseInt(formData.get("startYear") as string),
            endYear: parseInt(formData.get("endYear") as string),
        };

        return createSubject(data);
    };

    return (
        <>
            <Header>Create Course</Header>
            <div className="flex justify-center">
                <Card>
                    <CardHeader className="pt-0"></CardHeader>
                    <CardContent>
                        <Form action={action}>
                            <CreateCourseInputs />
                            <FormButton className="ml-auto">Submit</FormButton>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CreateCoursePage;
