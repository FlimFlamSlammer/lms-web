"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { TabMenu, TabMenuItem } from "@/components/ui/tab-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ReactNode } from "react";

const tabMenuItems: TabMenuItem[] = [
    {
        title: "Profile",
        href: "/account/profile",
    },
    {
        title: "Settings",
        href: "/account/settings",
    },
];

type Props = {
    children: ReactNode;
};

const AccountLayout = ({ children }: Props) => {
    const { logout } = useAuth();

    return (
        <div className="flex flex-row w-full h-full p-4">
            <div className="relative z-10 flex flex-col max-w-max flex-1 justify-center items-start h-fit gap-1">
                <TabMenu items={tabMenuItems}></TabMenu>
                <button
                    className={`${navigationMenuTriggerStyle()} w-[6rem]`}
                    onClick={() => {
                        logout();
                    }}
                >
                    Log out
                </button>
            </div>

            {children}
        </div>
    );
};

export default AccountLayout;
