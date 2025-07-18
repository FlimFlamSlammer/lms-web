"use client";

import { Form } from "../ui/form";
import { FormButton } from "../ui/form-button";
import { FormInput } from "../ui/form-input";
import { useCallback } from "react";
import { createClass, CreateClassDTO } from "@/actions/classes/create-class";
import { Class } from "@/types";
import { updateClass } from "@/actions/classes/update-class";

export const CreateClassForm = () => {
    const action = useCallback((formData: FormData) => {
        const data: CreateClassDTO = {
            name: formData.get("name") as string,
        };

        return createClass(data);
    }, []);

    return (
        <Form action={action} redirectURL="/classes">
            <FormInput
                name="name"
                id="name"
                placeholder="Class Name"
                errorFieldPath="name"
            >
                Class Name
            </FormInput>
            <FormButton className="ml-auto">Submit</FormButton>
        </Form>
    );
};

export const UpdateClassForm = ({ $class }: { $class?: Class }) => {
    const action = (formData: FormData) => {
        const data: CreateClassDTO = {
            name: formData.get("name") as string,
        };

        return updateClass($class?.id || "", data);
    };

    return (
        <Form action={action} redirectURL="/classes">
            {$class && (
                <>
                    <FormInput
                        name="name"
                        id="name"
                        placeholder="Class Name"
                        errorFieldPath="name"
                        defaultValue={$class?.name}
                    >
                        Class Name
                    </FormInput>
                </>
            )}

            <FormButton className="ml-auto">Save</FormButton>
        </Form>
    );
};
