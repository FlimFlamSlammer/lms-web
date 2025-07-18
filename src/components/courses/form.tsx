"use client";

import {
    createCourse,
    CreateCoursetDTO,
} from "@/actions/courses/create-course";
import { Form } from "../ui/form";
import { FormButton } from "../ui/form-button";
import { FormInput } from "../ui/form-input";
import { useCallback } from "react";
import { Course } from "@/types";
import { updateCourse, UpdateCourseDTO } from "@/actions/courses/update-course";

export const CreateCourseForm = () => {
    const action = useCallback((formData: FormData) => {
        const data: CreateCoursetDTO = {
            name: formData.get("name") as string,
            grade: parseInt(formData.get("grade") as string),
            startYear: parseInt(formData.get("startYear") as string),
            endYear: parseInt(formData.get("endYear") as string),
        };

        return createCourse(data);
    }, []);

    return (
        <Form action={action} redirectURL="/courses">
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

export const UpdateCourseForm = ({ course }: { course?: Course }) => {
    const action = (formData: FormData) => {
        const data: UpdateCourseDTO = {
            name: formData.get("name") as string,
            grade: parseInt(formData.get("grade") as string),
            startYear: parseInt(formData.get("startYear") as string),
            endYear: parseInt(formData.get("endYear") as string),
        };

        return updateCourse(course?.id || "", data);
    };

    return (
        <Form action={action} redirectURL="/courses">
            {course && (
                <>
                    <FormInput
                        name="name"
                        id="name"
                        placeholder="Course Name"
                        defaultValue={course?.name}
                        errorFieldPath="name"
                    >
                        Course Name
                    </FormInput>
                    <FormInput
                        name="grade"
                        id="grade"
                        placeholder="Grade"
                        defaultValue={course?.grade?.toString()}
                        errorFieldPath="grade"
                        type="number"
                    >
                        Grade
                    </FormInput>
                    <FormInput
                        name="startYear"
                        id="startYear"
                        placeholder="2024"
                        defaultValue={course?.startYear?.toString()}
                        errorFieldPath="startYear"
                        type="number"
                    >
                        Start Year
                    </FormInput>
                    <FormInput
                        name="endYear"
                        id="endYear"
                        placeholder="2025"
                        defaultValue={course?.endYear?.toString()}
                        errorFieldPath="endYear"
                        type="number"
                    >
                        End Year
                    </FormInput>
                </>
            )}

            <FormButton className="ml-auto">Save</FormButton>
        </Form>
    );
};
