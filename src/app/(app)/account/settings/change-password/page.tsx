"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { Form } from "@/components/ui/form";
import { APIResponse } from "@/types";
import { updatePassword } from "@/actions/auth/update-password";

const ChangePasswordPage = () => {
    const action = async (formData: FormData) => {
        if (formData.get("newPassword") !== formData.get("confirmPassword")) {
            return {
                data: null,
                error: null,
                errorFields: {
                    newPassword: "Passwords do not match!",
                    confirmPassword: "Passwords do not match!",
                },
            } as APIResponse<null>;
        }

        return await updatePassword({
            password: formData.get("password") as string,
            newPassword: formData.get("newPassword") as string,
        });
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Enter your new password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form action={action}>
                        <FormInput
                            name="password"
                            id="password"
                            placeholder=""
                            errorFieldPath="password"
                            type="password"
                        >
                            Current password
                        </FormInput>
                        <FormInput
                            name="newPassword"
                            id="newPassword"
                            placeholder=""
                            errorFieldPath="newPassword"
                            type="password"
                        >
                            New password
                        </FormInput>
                        <FormInput
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder=""
                            errorFieldPath="confirmPassword"
                            type="password"
                        >
                            Re-Enter new password
                        </FormInput>
                        <Button>Update Password</Button>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChangePasswordPage;
