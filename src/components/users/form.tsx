"use client";

import { useCallback, useState } from "react";
import { FormInput } from "../ui/form-input";
import { FormSelect } from "../ui/form-select";
import { Student, Teacher, User, UserRole } from "@/types";
import { SelectItem } from "../ui/select";
import {
    CreateStudentDTO,
    CreateTeacherDTO,
    createUser,
    CreateUserDTO,
} from "@/actions/users/create-user";
import { Form } from "../ui/form";
import { FormButton } from "../ui/form-button";
import { updateUser } from "@/actions/users/update-user";
import { uploadFile } from "@/actions/upload-file";

export const CreateUserForm = () => {
    const [selectedRole, setSelectedRole] = useState<UserRole | undefined>();

    const action = useCallback((formData: FormData) => {
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
    }, []);

    return (
        <Form action={action} redirectURL="/users">
            <FormInput
                name="name"
                id="name"
                placeholder="Full Name"
                errorFieldPath="userData.name"
            >
                Full Name
            </FormInput>
            <FormInput
                name="email"
                id="email"
                placeholder="Email"
                errorFieldPath="userData.email"
                type="email"
            >
                Email
            </FormInput>
            <FormInput
                name="phoneNumber"
                id="phoneNumber"
                placeholder="081987654321"
                errorFieldPath="userData.phoneNumber"
                type="tel"
            >
                Phone Number
            </FormInput>
            <FormInput
                name="profileImage"
                id="profileImage"
                errorFieldPath="userData.profileImage"
                type="file"
            >
                Profile Picture
            </FormInput>
            <FormSelect
                id="role"
                name="role"
                label="Role"
                placeholder="Role"
                errorFieldPath="userData.role"
                value={selectedRole}
                onValueChange={(val) => setSelectedRole(val as UserRole)}
            >
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
            </FormSelect>

            <RoleDataInputs role={selectedRole} />
            <FormButton className="ml-auto">Submit</FormButton>
        </Form>
    );
};

export const UpdateUserForm = ({ user }: { user?: User }) => {
    const UpdateUserInputs = ({ user }: { user: User }) => {
        return (
            <>
                <FormInput
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    errorFieldPath="userData.name"
                    defaultValue={user?.name}
                >
                    Full Name
                </FormInput>
                <FormInput
                    name="email"
                    id="email"
                    placeholder="Email"
                    errorFieldPath="userData.email"
                    type="email"
                    defaultValue={user?.email}
                >
                    Email
                </FormInput>
                <FormInput
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="081987654321"
                    errorFieldPath="userData.phoneNumber"
                    type="tel"
                    defaultValue={user?.phoneNumber}
                >
                    Phone Number
                </FormInput>
                <FormInput
                    name="profileImage"
                    id="profileImage"
                    errorFieldPath="userData.profileImage"
                    type="file"
                >
                    Profile Picture
                </FormInput>

                <RoleDataInputs role={user?.role} roleData={user?.roleData} />
            </>
        );
    };

    const action = useCallback(
        async (formData: FormData) => {
            if (!user) {
                throw new Error("form submitted before user was gotten!");
            }

            const fileUploadRes = await uploadFile(
                formData.get("profileImage") as File
            );

            if (fileUploadRes.error) {
                alert(fileUploadRes.error);
                throw new Error();
            }

            const filePath = fileUploadRes.data?.filename;

            const data: {
                userData: CreateUserDTO;
                roleData: CreateStudentDTO | CreateTeacherDTO | undefined;
            } = {
                userData: {
                    name: formData.get("name") as string,
                    email: formData.get("email") as string,
                    password: formData.get("email") as string,
                    needsPasswordChange: user?.needsPasswordChange,
                    profileImage: filePath,
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

            return await updateUser(user?.id, data);
        },
        [user]
    );

    return (
        <Form action={action} redirectURL="/users">
            {user && <UpdateUserInputs user={user} />}
            <FormButton className="ml-auto">Submit</FormButton>
        </Form>
    );
};

type RoleDataInputsProps = {
    role?: string;
    roleData?: Teacher | Student;
};

const RoleDataInputs = ({ role, roleData }: RoleDataInputsProps) => {
    if (role === "student") {
        return <StudentInputs roleData={roleData && (roleData as Student)} />;
    } else if (role === "teacher") {
        return <TeacherInputs roleData={roleData && (roleData as Teacher)} />;
    }
};

const StudentInputs = ({ roleData }: { roleData?: Student }) => {
    return (
        <>
            <FormInput
                type="date"
                name="birthDate"
                id="birthDate"
                errorFieldPath="roleData.birthDate"
                defaultValue={
                    roleData?.birthDate.substring(
                        0,
                        10
                    ) /* only take the date, truncate time */
                }
            >
                Birth Date
            </FormInput>
            <FormInput
                placeholder="0123456789"
                name="nis"
                id="nis"
                errorFieldPath="roleData.nis"
                defaultValue={roleData?.nis}
            >
                NISN
            </FormInput>
            <FormInput
                placeholder="081987654321"
                name="contactPhoneNumber"
                id="contactPhoneNumber"
                type="tel"
                errorFieldPath="roleData.contactPhoneNumber"
                defaultValue={roleData?.contactPhoneNumber}
            >
                Contact Phone Number
            </FormInput>
            <FormInput
                placeholder="Father's Name"
                name="fatherName"
                id="fatherName"
                errorFieldPath="roleData.fatherName"
                defaultValue={roleData?.fatherName}
            >
                Father&apos;s Name*
            </FormInput>
            <FormInput
                placeholder="Mother's Name"
                name="motherName"
                id="motherName"
                errorFieldPath="roleData.motherName"
                defaultValue={roleData?.motherName}
            >
                Mother&apos;s Name*
            </FormInput>
            <FormInput
                placeholder="Guardian's Name"
                name="guardianName"
                id="guardianName"
                errorFieldPath="roleData.guardianName"
                defaultValue={roleData?.guardianName}
            >
                Guardian&apos;s Name*
            </FormInput>
        </>
    );
};

const TeacherInputs = ({ roleData }: { roleData?: Teacher }) => {
    return (
        <>
            <FormInput
                placeholder="0123456789"
                name="nig"
                id="nig"
                errorFieldPath="roleData.nig"
                defaultValue={roleData?.nig}
            >
                NIG
            </FormInput>
            <FormInput
                name="expertise"
                id="expertise"
                placeholder="Expertise"
                errorFieldPath="roleData.expertise"
                defaultValue={roleData?.expertise}
            >
                Expertise*
            </FormInput>
            <FormInput
                placeholder="Bachelor's Degree"
                name="bachelorDegree"
                id="bachelorDegree"
                errorFieldPath="roleData.bachelorDegree"
                defaultValue={roleData?.bachelorDegree}
            >
                Bachelor&apos;s Degree*
            </FormInput>
            <FormInput
                placeholder="Master's Degree"
                name="masterDegree"
                id="masterDegree"
                errorFieldPath="roleData.masterDegree"
                defaultValue={roleData?.masterDegree}
            >
                Master&apos;s Degree*
            </FormInput>
            <FormInput
                placeholder="Doctorate's Degree"
                name="doctorateDegree"
                id="doctorateDegree"
                errorFieldPath="roleData.doctorateDegree"
                defaultValue={roleData?.doctorateDegree}
            >
                Doctorate&apos;s Degree*
            </FormInput>
        </>
    );
};
