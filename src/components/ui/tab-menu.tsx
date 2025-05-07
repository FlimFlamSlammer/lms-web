import Link from "next/link";
import { Button } from "./button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { useAuth } from "../providers/auth-provider";

export type TabMenuItem = {
    title: string;
    href: string;
    roles?: UserRole[];
};

export type TabMenuProps = {
    items: TabMenuItem[];
    URLPrefix?: string;
};

export const TabMenu = ({ items, URLPrefix }: TabMenuProps) => {
    const [selected, setSelected] = useState("");
    const { user } = useAuth();

    if (user) {
        return (
            <div className="vertical-menu">
                {items.map((item) => {
                    const userCanAccess =
                        !item.roles || item.roles.includes(user.role);
                    if (userCanAccess) {
                        return (
                            <Button
                                key={item.href}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start",
                                    selected == item.href && "bg-accent"
                                )}
                                onClick={() => {
                                    setSelected(item.href);
                                }}
                                asChild
                            >
                                <Link href={URLPrefix + item.href}>
                                    {item.title}
                                </Link>
                            </Button>
                        );
                    }
                })}
            </div>
        );
    }
};
