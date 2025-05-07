"use client";

import {
    CreateStudentDTO,
    CreateTeacherDTO,
    createUser,
    CreateUserDTO,
} from "@/actions/users/create-user";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/form-button";
import { Header } from "@/components/ui/header";
import { CreateUserInputs } from "@/components/users/form";
import { UserRole } from "@/types";

const CreateUserPage = () => {
    const action = (formData: FormData) => {
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

        return createUser(data);
    };

    return (
        <>
            <Header>Create User</Header>
            <div className="flex justify-center">
                <Card>
                    <CardHeader className="pt-0"></CardHeader>
                    <CardContent>
                        <Form action={action}>
                            <CreateUserInputs />
                            <FormButton className="ml-auto">Submit</FormButton>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CreateUserPage;
