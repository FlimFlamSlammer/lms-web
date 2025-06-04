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
import { useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";

const ChangePasswordPage = () => {
    const { user, updatePassword } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.needsPasswordChange) {
            router.replace("/account/profile");
        }
    }, [user, router]);

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
            <Card className="w-min">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                        Your password has been reset, and needs to be changed
                        before you can use your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form action={action} redirectURL="/account/profile">
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
