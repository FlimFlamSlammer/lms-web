"use client";
import { useDataContext } from "@/components/providers/data-provider";
import { User } from "@/types";

const ProfilePage = () => {
    const user = useDataContext() as User | null;

    return <div className="flex flex-row justify-start"></div>;
};

export default ProfilePage;
