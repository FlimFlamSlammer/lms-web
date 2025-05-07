"use client";

import { FormInput } from "../ui/form-input";

export const CreateCourseInputs = () => {
    return (
        <>
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
        </>
    );
};
