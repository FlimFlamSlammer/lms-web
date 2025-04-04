"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { TabMenu, TabMenuItem } from "@/components/tab-menu";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const tabMenuItems: TabMenuItem[] = [
    {
        type: "link",
        title: "Profile",
        href: "/account/profile",
    },
    {
        type: "link",
        title: "Settings",
        href: "/account/settings",
    },
    {
        type: "button",
        title: "Log out",
        onClick: undefined,
    },
];

type Props = {
    children: ReactNode;
};

const AccountLayout = ({ children }: Props) => {
    const { logout } = useAuth();
    const router = useRouter();

    tabMenuItems[tabMenuItems.length - 1].onClick = () => {
        console.log("yeah?");
        logout();
    };

    return (
        <div className="flex flex-row w-full h-full p-4">
            <TabMenu items={tabMenuItems}></TabMenu>
            {children}
        </div>
    );
};

export default AccountLayout;
