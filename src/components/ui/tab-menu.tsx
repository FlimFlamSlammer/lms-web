import Link from "next/link";
import { Button } from "./button";

export type TabMenuItem = {
    title: string;
    href: string;
};

export type TabMenuProps = {
    items: TabMenuItem[];
};

export const TabMenu = ({ items }: TabMenuProps) => {
    return (
        <div className="vertical-menu">
            {items.map((item) => {
                return (
                    <Button
                        key={item.title}
                        variant="ghost"
                        className="w-full justify-start"
                    >
                        <Link href={item.href}>{item.title}</Link>
                    </Button>
                );
            })}
        </div>
    );
};
