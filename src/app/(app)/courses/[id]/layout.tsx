"use client";

import { TabMenu, TabMenuItem } from "@/components/ui/tab-menu";
import { Header } from "@/components/ui/header";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { getSubject } from "@/actions/subjects/get-subject";
import { Subject } from "@/types";
import { DataProvider } from "@/components/providers/data-provider";

const tabMenuItems: TabMenuItem[] = [
    {
        title: "Assignments",
        href: "assignments",
    },
    {
        title: "Classes",
        href: "classes",
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

const CourseLayout = ({ children }: Props) => {
    const { id }: { id: string } = useParams();
    const [course, setCourse] = useState<Subject | null>(null);

    useEffect(() => {
        getSubject(id as string).then((res) => {
            setCourse(res.data);
        });
    }, [id]);

    return (
        <>
            <Header>{course?.name}</Header>
            <div className="flex flex-row w-full h-min-full gap-8">
                <TabMenu
                    URLPrefix={`/courses/${id}/`}
                    items={tabMenuItems}
                ></TabMenu>
                <DataProvider value={course}>{children}</DataProvider>
            </div>
        </>
    );
};

export default CourseLayout;
