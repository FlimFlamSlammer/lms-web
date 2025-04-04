"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "./providers/auth-provider";
import { UserRole } from "@/types";

export type MenuItem = {
    title: string;
    roles?: UserRole[];
};

export function AppSidebar() {
    const menuItems: MenuItem[] = [
        {
            title: "Account",
            roles: ["student", "teacher", "admin", "superadmin"],
        },
        {
            title: "Courses",
            roles: ["student", "teacher", "admin", "superadmin"],
        },
    ];

    const visibleMenuItems: MenuItem[] = [];

    const { user } = useAuth();

    if (user) {
        menuItems.forEach((menuItem) => {
            const userCanAccess =
                !menuItem.roles || menuItem.roles.includes(user.role);
            if (userCanAccess) {
                visibleMenuItems.push({
                    ...menuItem,
                    roles: undefined,
                });
            }
        });
    }

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarMenu>
                    {visibleMenuItems.map((menuItem) => (
                        <SidebarMenuItem
                            className="flex flex-row"
                            key={menuItem.title}
                        >
                            <SidebarMenuButton>
                                {menuItem.title}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
