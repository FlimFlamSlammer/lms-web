"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { TabMenu, TabMenuItem } from "@/components/ui/tab-menu";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { TabMenuLayout } from "@/components/shared/tab-menu-layout";
import { DataProvider } from "@/components/providers/data-provider";

const tabMenuItems: TabMenuItem[] = [
    {
        title: "Profile",
        href: "profile",
    },
    {
        title: "Password Reset",
        href: "settings/change-password",
    },
];

type Props = {
    children: ReactNode;
};

const AccountLayout = ({ children }: Props) => {
    const { logout, user } = useAuth();

    return (
        <TabMenuLayout header="Account" contextData={user}>
            <DataProvider value={user}>
                <div className="vertical-menu">
                    <TabMenu
                        items={tabMenuItems}
                        URLPrefix="/account/"
                    ></TabMenu>
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
            </DataProvider>
        </TabMenuLayout>
    );
};

export default AccountLayout;
