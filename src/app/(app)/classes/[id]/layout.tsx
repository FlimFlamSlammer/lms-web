"use client";

import { TabMenu, TabMenuItem } from "@/components/ui/tab-menu";
import { Header } from "@/components/ui/header";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { DataProvider } from "@/components/providers/data-provider";
import { getClass } from "@/actions/classes/get-class";
import { Class } from "@/types";

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

const ClassLayout = ({ children }: Props) => {
    const { id }: { id: string } = useParams();
    const [$class, setClass] = useState<Class | null>(null);

    useEffect(() => {
        getClass(id).then((res) => {
            setClass(res.data);
        });
    }, [id]);

    return (
        <>
            <Header>{$class?.name}</Header>
            <div className="flex flex-row w-full h-min-full gap-8">
                <TabMenu
                    URLPrefix={`/classes/${id}/`}
                    items={tabMenuItems}
                ></TabMenu>
                <DataProvider value={$class}>{children}</DataProvider>
            </div>
        </>
    );
};

export default ClassLayout;
