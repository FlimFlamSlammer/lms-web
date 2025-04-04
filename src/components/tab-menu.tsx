import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export type TabMenuItem = {
    type: "link" | "button";
    title: string;
    href?: string;
    onClick?: () => void;
};

export type TabMenuProps = {
    items: TabMenuItem[];
};

export const TabMenu = ({ items }: TabMenuProps) => {
    return (
        <NavigationMenu orientation="vertical" className="items-start">
            <NavigationMenuList className="w-32">
                {items.map((item) => {
                    if (item.type == "link") {
                        if (!item.href) {
                            throw Error(
                                "Link in TabMenu does not contain href!"
                            );
                        }

                        return (
                            <NavigationMenuItem key={item.title}>
                                <Link href={item.href} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={`${navigationMenuTriggerStyle()} w-32`}
                                    >
                                        {item.title}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        );
                    } else {
                        return (
                            <NavigationMenuItem
                                key={item.title}
                                onClick={item.onClick}
                            >
                                {" "}
                                <span
                                    className={`${navigationMenuTriggerStyle()} w-32 hover:cursor-pointer`}
                                >
                                    {item.title}
                                </span>
                            </NavigationMenuItem>
                        );
                    }
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
};
