"use client";

import { TabMenu, TabMenuItem } from "@/components/ui/tab-menu";
import { Header } from "@/components/ui/header";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

const tabMenuItems: TabMenuItem[] = [
    {
        title: "People",
        href: "people",
    },
    {
        title: "Details",
        href: "details",
        roles: ["teacher", "admin", "superadmin"],
    },
];

type Props = {
    children: ReactNode;
};

const CoursesLayout = ({ children }: Props) => {
    const { id }: { id: string } = useParams();
    return (
        <>
            <Header>Class</Header>
            <div className="flex flex-row w-full h-min-full gap-8">
                <TabMenu
                    URLPrefix={`/classes/${id}/`}
                    items={tabMenuItems}
                ></TabMenu>
                {children}
            </div>
        </>
    );
};

export default CoursesLayout;
