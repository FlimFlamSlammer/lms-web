"use client";

import { useAuth } from "@/components/providers/auth-provider";

const ProfilePage = () => {
    const { user } = useAuth();

    return <div className="flex flex-row justify-start"></div>;
};

export default ProfilePage;
