"use client";

import {
    CreateStudentDTO,
    CreateTeacherDTO,
    createUser,
    CreateUserDTO,
} from "@/actions/users/create-user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { useOptimistic, useState } from "react";

const StudentInputs = ({
    errorFields,
}: {
    errorFields: Record<string, string>;
}) => {
    return (
        <>
            <FormInput
                type="date"
                name="birthDate"
                id="birthDate"
                errorMessage={errorFields["roleData.birthDate"]}
            >
                Birth Date
            </FormInput>
            <FormInput
                placeholder="0123456789"
                name="nis"
                id="nis"
                errorMessage={errorFields["roleData.nis"]}
            >
                NISN
            </FormInput>
            <FormInput
                placeholder="081987654321"
                name="contactPhoneNumber"
                id="contactPhoneNumber"
                type="tel"
                errorMessage={errorFields["roleData.contactPhoneNumber"]}
            >
                Contact Phone Number
            </FormInput>
            <FormInput
                placeholder="Father's Name"
                name="fatherName"
                id="fatherName"
                errorMessage={errorFields["roleData.fatherName"]}
            >
                Father&apos;s Name*
            </FormInput>
            <FormInput
                placeholder="Mother's Name"
                name="motherName"
                id="motherName"
                errorMessage={errorFields["roleData.motherName"]}
            >
                Mother&apos;s Name*
            </FormInput>
            <FormInput
                placeholder="Guardian's Name"
                name="guardianName"
                id="guardianName"
                errorMessage={errorFields["roleData.guardianName"]}
            >
                Guardian&apos;s Name*
            </FormInput>
        </>
    );
};

const TeacherInputs = ({
    errorFields,
}: {
    errorFields: Record<string, string>;
}) => {
    return (
        <>
            <FormInput
                placeholder="0123456789"
                name="nig"
                id="nig"
                errorMessage={errorFields["roleData.nig"]}
            >
                NIG
            </FormInput>
            <FormInput
                name="expertise"
                id="expertise"
                placeholder="Expertise"
                errorMessage={errorFields["roleData.expertise"]}
            >
                Expertise*
            </FormInput>
            <FormInput
                placeholder="Bachelor's Degree"
                name="bachelorDegree"
                id="bachelorDegree"
                errorMessage={errorFields["roleData.bachelorDegree"]}
            >
                Bachelor&apos;s Degree*
            </FormInput>
            <FormInput
                placeholder="Master's Degree"
                name="masterDegree"
                id="masterDegree"
                errorMessage={errorFields["roleData.masterDegree"]}
            >
                Master&apos;s Degree*
            </FormInput>
            <FormInput
                placeholder="Doctorate's Degree"
                name="doctorateDegree"
                id="doctorateDegree"
                errorMessage={errorFields["roleData.doctorateDegree"]}
            >
                Doctorate&apos;s Degree*
            </FormInput>
        </>
    );
};

type RoleDataInputsProps = {
    role?: UserRole;
    errorFields: Record<string, string>;
};

const RoleDataInputs = ({ role, errorFields }: RoleDataInputsProps) => {
    if (role == "student") {
        return <StudentInputs errorFields={errorFields} />;
    } else if (role == "teacher") {
        return <TeacherInputs errorFields={errorFields} />;
    }
    return null;
};

const CreateUserPage = () => {
    const router = useRouter();
    const [errorFields, seterrorFields] = useState<Record<string, string>>({});

    const [isSubmitting, setIsSubmitting] = useOptimistic(
        false,
        (_state, newIsSubmitting: boolean) => newIsSubmitting
    );

    const [selectedRole, setSelectedRole] = useState<UserRole | undefined>();

    const submitHandler = async (formData: FormData) => {
        setIsSubmitting(true);
        const data: {
            userData: CreateUserDTO;
            roleData: CreateStudentDTO | CreateTeacherDTO | undefined;
        } = {
            userData: {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                phoneNumber:
                    (formData.get("phoneNumber") as string) || undefined,
                role: selectedRole as UserRole,
            },
            roleData: undefined,
        };

        if (selectedRole === "student") {
            data.roleData = {
                nis: formData.get("nis") as string,
                motherName: formData.get("motherName") as string,
                fatherName: formData.get("fatherName") as string,
                guardianName: formData.get("guardianName") as string,
                birthDate: new Date(
                    formData.get("birthDate") as string
                ).toISOString(),
                contactPhoneNumber: formData.get(
                    "contactPhoneNumber"
                ) as string,
            };
        } else if (selectedRole === "teacher") {
            data.roleData = {
                nig: formData.get("nig") as string,
                expertise: formData.get("expertise") as string,
                bachelorDegree: formData.get("bachelorDegree") as string,
                masterDegree: formData.get("masterDegree") as string,
                doctorateDegree: formData.get("doctorateDegree") as string,
            };
        }

        console.log(data);

        seterrorFields({});

        createUser(data).then(({ error, errorFields }) => {
            if (errorFields !== null) {
                seterrorFields(errorFields);
            } else if (error !== null) {
                alert("Something wrong happened");
                console.log(error);
            } else {
                router.replace("/");
            }
        });
    };

    return (
        <div className="flex flex-col w-full h-full p-4">
            <h1 className="text-4xl font-light">Create User</h1>
            <Separator className="my-2"></Separator>
            <div className="flex justify-center">
                <Card>
                    <CardHeader className="pt-0"></CardHeader>
                    <CardContent>
                        <form
                            action={submitHandler}
                            className="flex flex-col space-y-3 w-80"
                        >
                            <FormInput
                                name="name"
                                id="name"
                                placeholder="Full Name"
                                errorMessage={errorFields["userData.name"]}
                            >
                                Full Name
                            </FormInput>
                            <FormInput
                                name="email"
                                id="email"
                                placeholder="Email"
                                errorMessage={errorFields["userData.email"]}
                                type="email"
                            >
                                Email
                            </FormInput>
                            <FormInput
                                name="phoneNumber"
                                id="phoneNumber"
                                placeholder="081987654321"
                                errorMessage={
                                    errorFields["userData.phoneNumber"]
                                }
                                type="tel"
                            >
                                Phone Number
                            </FormInput>
                            <FormInput
                                name="password"
                                id="password"
                                placeholder="Password"
                                errorMessage={errorFields["userData.password"]}
                                type="password"
                            >
                                Password
                            </FormInput>
                            <FormSelect
                                id="role"
                                name="role"
                                label="Role"
                                placeholder="Role"
                                errorMessage={errorFields["userData.role"]}
                                value={selectedRole}
                                onValueChange={(val) =>
                                    setSelectedRole(val as UserRole)
                                }
                            >
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </FormSelect>

                            <RoleDataInputs
                                role={selectedRole}
                                errorFields={errorFields}
                            />

                            <Button className="ml-auto" disabled={isSubmitting}>
                                Create
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CreateUserPage;
