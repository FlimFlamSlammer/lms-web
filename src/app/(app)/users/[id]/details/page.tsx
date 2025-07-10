"use client";

import { useDataContext } from "@/components/providers/data-provider";
import { DictTable, DictTableRow } from "@/components/ui/dict-table";
import { Student, Teacher, User } from "@/types";
import Image from "next/image";

const UserDetailsPage = () => {
    const user = useDataContext() as User;

    if (!user) {
        throw new Error("User not found");
    }

    const tableRows: DictTableRow[] = [
        {
            key: "Email",
            value: user.email,
        },
        {
            key: "Phone Number",
            value: user.phoneNumber || "-",
        },
        {
            key: "Role",
            value: user.role,
        },
    ];

    if (user.role === "student") {
        const roleData = user.roleData as Student;
        tableRows.push(
            {
                key: "NIS",
                value: roleData.nis || "-",
            },
            {
                key: "Birth Date",
                value: roleData.birthDate || "-",
            },
            {
                key: "Description",
                value: roleData.description || "-",
            },
            {
                key: "Father Name",
                value: roleData.fatherName || "-",
            },
            {
                key: "Mother Name",
                value: roleData.motherName || "-",
            },
            {
                key: "Guardian Name",
                value: roleData.guardianName || "-",
            },
            {
                key: "Contact Phone Number",
                value: roleData.contactPhoneNumber || "-",
            }
        );
    } else if (user.role === "teacher") {
        const roleData = user.roleData as Teacher;
        tableRows.push(
            {
                key: "NIG",
                value: roleData.nig || "-",
            },
            {
                key: "Expertise",
                value: roleData.expertise || "-",
            },
            {
                key: "Bachelor Degree",
                value: roleData.bachelorDegree || "-",
            },
            {
                key: "Master Degree",
                value: roleData.masterDegree || "-",
            },
            {
                key: "Doctorate Degree",
                value: roleData.doctorateDegree || "-",
            },
            {
                key: "Description",
                value: roleData.description || "-",
            }
        );
    }

    return (
        <div className="flex flex-row justify-start gap-8">
            {user?.profileImage && (
                <Image
                    src={`/api/file/${user?.profileImage}`}
                    alt="Profile picture"
                    width="128"
                    height="128"
                    className="w-[128px] h-[128px] object-cover rounded-full"
                />
            )}

            <div>
                <h3 className="mb-2">{user.name}</h3>
                <DictTable rows={tableRows} className="w-fit" />
            </div>
        </div>
    );
};

export default UserDetailsPage;
