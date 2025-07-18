import { TabMenu, TabMenuItem } from "@/components/ui/tab-menu";
import { ReactNode } from "react";
import { getCourse } from "@/actions/courses/get-course";
import { TabMenuLayout } from "@/components/shared/tab-menu-layout";
import { DataProvider } from "@/components/providers/data-provider";

const tabMenuItems: TabMenuItem[] = [
    {
        title: "Assignments",
        href: "assignments",
    },
    {
        title: "Classes",
        href: "classes",
        roles: ["admin", "superadmin"],
    },
    {
        title: "Teachers",
        href: "teachers",
        roles: ["admin", "superadmin"],
    },
    {
        title: "Details",
        href: "details",
    },
    {
        title: "Edit",
        href: "edit",
    },
];

type Props = {
    children: ReactNode;
    params: {
        id: string;
    };
};

const CourseLayout = async ({ params, children }: Props) => {
    const id = (await params).id;
    const { data: course, error } = await getCourse(id);

    if (error) {
        throw new Error(error);
    }

    if (!course) return;

    return (
        <TabMenuLayout header={course?.name} contextData={course}>
            <DataProvider value={course}>
                <TabMenu URLPrefix={`/courses/${id}/`} items={tabMenuItems} />
                {children}
            </DataProvider>
        </TabMenuLayout>
    );
};

export default CourseLayout;
