"use client";

import {
    createSubject,
    CreateSubjectDTO,
} from "@/actions/subjects/create-subject";
import { Form } from "../ui/form";
import { FormButton } from "../ui/form-button";
import { FormInput } from "../ui/form-input";
import { useCallback } from "react";

export const CreateCourseForm = () => {
    const action = useCallback((formData: FormData) => {
        const data: CreateSubjectDTO = {
            name: formData.get("name") as string,
            grade: parseInt(formData.get("grade") as string),
            startYear: parseInt(formData.get("startYear") as string),
            endYear: parseInt(formData.get("endYear") as string),
        };

        return createSubject(data);
    }, []);

    return (
        <Form action={action}>
            <FormInput
                name="name"
                id="name"
                placeholder="Course Name"
                errorFieldPath="name"
            >
                Course Name
            </FormInput>
            <FormInput
                name="grade"
                id="grade"
                placeholder="Grade"
                errorFieldPath="grade"
                type="number"
            >
                Grade
            </FormInput>
            <FormInput
                name="startYear"
                id="startYear"
                placeholder="2024"
                errorFieldPath="startYear"
                type="number"
            >
                Start Year
            </FormInput>
            <FormInput
                name="endYear"
                id="endYear"
                placeholder="2025"
                errorFieldPath="endYear"
                type="number"
            >
                End Year
            </FormInput>
            <FormButton className="ml-auto">Submit</FormButton>
        </Form>
    );
};
