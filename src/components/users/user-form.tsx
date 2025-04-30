"use client";

import { useState } from "react";
import { FormInput } from "../ui/form-input";
import { FormSelect } from "../ui/form-select";
import { Student, Teacher, User, UserRole } from "@/types";
import { SelectItem } from "../ui/select";

export const CreateUserInputs = () => {
    const [selectedRole, setSelectedRole] = useState<UserRole | undefined>();

    return (
        <>
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
        </>
    );
};

export const UpdateUserInputs = ({ user }: { user: User }) => {
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

            <RoleDataInputs role={user?.role} roleData={user?.roleData} />
        </>
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
