"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "../providers/auth-provider";
import { UserRole } from "@/types";
import Link from "next/link";

export type MenuItem = {
    title: string;
    href: string;
    roles?: UserRole[];
};

const menuItems: MenuItem[] = [
    {
        title: "Account",
        href: "/account/profile",
        roles: ["student", "teacher", "admin", "superadmin"],
    },
    {
        title: "Courses",
        href: "/courses",
        roles: ["student", "teacher", "admin", "superadmin"],
    },
    {
        title: "Classes",
        href: "/classes",
        roles: ["admin", "superadmin"],
    },
    {
        title: "Users",
        href: "/users",
        roles: ["admin", "superadmin"],
    },
];

export function AppSidebar() {
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
        <Sidebar variant="sidebar">
            <SidebarHeader />
            <SidebarContent>
                <SidebarMenu>
                    {visibleMenuItems.map((menuItem) => (
                        <SidebarMenuItem
                            className="flex flex-row"
                            key={menuItem.title}
                        >
                            <SidebarMenuButton asChild>
                                <Link href={menuItem.href}>
                                    {menuItem.title}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
