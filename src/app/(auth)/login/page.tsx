"use client";

import { useOptimistic, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form-input";

const LoginPage = () => {
    const router = useRouter();
    const [errorFields, setErrorFields] = useState<Record<string, string>>({});
    const [optimisticErrorFields, setOptimisticErrorFields] = useOptimistic(
        errorFields,
        (_state, newErrorFields: Record<string, string>) => newErrorFields
    );

    const [isSubmitting, setIsSubmitting] = useOptimistic(
        false,
        (_state, newIsSubmitting: boolean) => newIsSubmitting
    );

    const { login } = useAuth();

    const submitHandler = async (formData: FormData) => {
        setIsSubmitting(true);
        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
        setOptimisticErrorFields({});
        setErrorFields({});

        login(data).then(({ error, errorFields }) => {
            if (errorFields !== null) {
                setErrorFields(errorFields);
            } else if (error !== null) {
                alert("Something wrong happened");
                console.log(error);
            } else {
                router.replace("/");
            }
        });
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome!</CardTitle>
                    <CardDescription>Please login to continue.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={submitHandler}
                        className="flex flex-col space-y-3"
                    >
                        <FormInput
                            name="email"
                            id="email"
                            placeholder="Email"
                            errorMessage={optimisticErrorFields.email}
                            type="email"
                        >
                            Email
                        </FormInput>
                        <FormInput
                            name="password"
                            id="password"
                            placeholder="Password"
                            errorMessage={optimisticErrorFields.password}
                            type="password"
                        >
                            Password
                        </FormInput>
                        <Button disabled={isSubmitting}>Login</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
