"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { TabMenu, TabMenuItem } from "@/components/ui/tab-menu";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Header } from "@/components/ui/header";

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
        <>
            <Header>Account</Header>
            <div className="flex flex-row w-full h-full gap-8">
                <div className="vertical-menu">
                    <TabMenu items={tabMenuItems}></TabMenu>
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                            logout();
                        }}
                    >
                        Log out
                    </Button>
                </div>

                {children}
            </div>
        </>
    );
};

export default AccountLayout;
