import { TabMenu, TabMenuItem } from "@/components/ui/tab-menu";
import { ReactNode } from "react";
import { getSubject } from "@/actions/subjects/get-subject";
import { TabMenuLayout } from "@/components/shared/tab-menu-layout";

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
    params: {
        id: string;
    };
};

const CourseLayout = async ({ params: { id }, children }: Props) => {
    const { data: course, error } = await getSubject(id);

    if (error) {
        throw new Error(error);
    }

    if (!course) return;

    return (
        <TabMenuLayout header={course?.name} contextData={course}>
            <TabMenu URLPrefix={`/courses/${id}/`} items={tabMenuItems} />
            {children}
        </TabMenuLayout>
    );
};

export default CourseLayout;
