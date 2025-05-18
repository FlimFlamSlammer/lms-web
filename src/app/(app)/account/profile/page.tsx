"use client";
import { useDataContext } from "@/components/providers/data-provider";
import { DictTable, DictTableRow } from "@/components/ui/dict-table";
import { User } from "@/types";

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
            <span>profile picture</span>
            <div>
                <h1 className="text-2xl mb-2">{user?.name}</h1>
                <DictTable rows={tableRows} />
            </div>
        </div>
    );
};

export default ProfilePage;
