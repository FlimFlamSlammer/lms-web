import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "./navigation-menu";

export type TabMenuItem = {
    title: string;
    href: string;
};

export type TabMenuProps = {
    items: TabMenuItem[];
};

export const TabMenu = ({ items }: TabMenuProps) => {
    return (
        <NavigationMenu orientation="vertical" className="items-start">
            <NavigationMenuList className="w-[6rem]">
                {items.map((item) => {
                    return (
                        <NavigationMenuItem key={item.title}>
                            <Link href={item.href} legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={`${navigationMenuTriggerStyle()} w-[6rem]`}
                                >
                                    {item.title}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
};
