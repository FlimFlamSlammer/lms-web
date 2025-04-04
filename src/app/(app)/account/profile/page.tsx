"use client";

import { useAuth } from "@/components/providers/auth-provider";

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-row justify-start gap-8">
            <span>profile picture</span>
            <div className="flex flex-col justify-start">
                <h1 className="text-3xl">{user?.name}</h1>
            </div>
        </div>
    );
};

export default ProfilePage;
