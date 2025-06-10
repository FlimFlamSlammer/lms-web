"use client";
import { useDataContext } from "@/components/providers/data-provider";
import { DictTable, DictTableRow } from "@/components/ui/dict-table";
import { User } from "@/types";
import Image from "next/image";

const ProfilePage = () => {
    const user = useDataContext() as User | null;

    const tableRows: DictTableRow[] = [
        {
            key: "Email",
            value: user?.email,
        },
        {
            key: "Phone number",
            value: user?.phoneNumber,
        },
        {
            key: "Role",
            value: user?.role,
        },
    ];

    return (
        <div className="flex flex-row justify-start gap-8">
            {user?.profileImage && (
                <Image
                    src={`/api/file/${user?.profileImage}`}
                    alt="Profile picture"
                />
            )}

            <div>
                <h3 className="mb-2">{user?.name}</h3>
                <DictTable rows={tableRows} />
            </div>
        </div>
    );
};

export default ProfilePage;
