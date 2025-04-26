"use client";

import {
    CreateStudentDTO,
    CreateTeacherDTO,
    CreateUserDTO,
} from "@/actions/users/create-user";
import { getUser } from "@/actions/users/get-user";
import { updateUser } from "@/actions/users/update-user";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/form-button";
import { Separator } from "@/components/ui/separator";
import { CreateUserInputs } from "@/components/users/user-form";
import { User, UserRole } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreateUserPage = () => {
    const { id }: { id: string } = useParams();
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
        getUser(id).then((res) => {
            setUser(res.data);
        });
    }, [setUser, id]);

    const action = (formData: FormData) => {
        if (!user) {
            throw new Error("form submitted before user was gotten!");
        }

        const data: {
            userData: CreateUserDTO;
            roleData: CreateStudentDTO | CreateTeacherDTO | undefined;
        } = {
            userData: {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                password: formData.get("email") as string,
                needsPasswordChange: true,
                phoneNumber:
                    (formData.get("phoneNumber") as string) || undefined,
                role: formData.get("role") as UserRole,
            },
            roleData: undefined,
        };

        if (data.userData.role === "student") {
            data.roleData = {
                nis: formData.get("nis") as string,
                motherName: formData.get("motherName") as string,
                fatherName: formData.get("fatherName") as string,
                guardianName: formData.get("guardianName") as string,
                birthDate: formData.get("birthDate")
                    ? new Date(
                          formData.get("birthDate") as string
                      ).toISOString()
                    : "",
                contactPhoneNumber: formData.get(
                    "contactPhoneNumber"
                ) as string,
            };
        } else if (data.userData.role === "teacher") {
            data.roleData = {
                nig: formData.get("nig") as string,
                expertise: formData.get("expertise") as string,
                bachelorDegree: formData.get("bachelorDegree") as string,
                masterDegree: formData.get("masterDegree") as string,
                doctorateDegree: formData.get("doctorateDegree") as string,
            };
        }

        return updateUser(user?.id, data);
    };

    return (
        <div className="flex flex-col w-full h-full p-4">
            <h1 className="text-4xl font-light">Create User</h1>
            <Separator className="my-2"></Separator>
            <div className="flex justify-center">
                <Card>
                    <CardHeader className="pt-0"></CardHeader>
                    <CardContent>
                        <Form action={action}>
                            <CreateUserInputs />
                            <FormButton className="ml-auto" disabled={!user}>
                                Submit
                            </FormButton>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CreateUserPage;
