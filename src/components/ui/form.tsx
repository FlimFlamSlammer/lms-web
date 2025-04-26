"use client";

import { ReactNode, useOptimistic, useState } from "react";
import { useRouter } from "next/navigation";
import { APIResponse } from "@/types";
import { createContext } from "react";

type FormContextValue = {
    errorFields: Record<string, string>;
    isSubmitting: boolean;
};

export const FormContext = createContext<FormContextValue>({
    errorFields: {},
    isSubmitting: false,
});

type FormProps = {
    children?: ReactNode;
    action: (formData: FormData) => Promise<APIResponse<unknown>>;
};

export const Form = ({ children, action }: FormProps) => {
    const router = useRouter();
    const [errorFields, setErrorFields] = useState<Record<string, string>>({});
    const [optimisticErrorFields, setOptimisticErrorFields] =
        useOptimistic(errorFields);
    const [isSubmitting, setIsSubmitting] = useOptimistic(false);

    const submitHandler = async (formData: FormData) => {
        setIsSubmitting(true);
        setOptimisticErrorFields({});

        action(formData).then(({ error, errorFields }) => {
            if (errorFields !== null) {
                setErrorFields(errorFields);
            } else if (error !== null) {
                alert("Something wrong happened. Please try again later.");
                console.log(error);
            } else {
                router.replace("/");
            }
        });
    };

    return (
        <form action={submitHandler} className="form">
            <FormContext.Provider
                value={{ errorFields: optimisticErrorFields, isSubmitting }}
            >
                {children}
            </FormContext.Provider>
        </form>
    );
};
