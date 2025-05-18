import { TabMenu, TabMenuItem } from "@/components/ui/tab-menu";
import { ReactNode } from "react";
import { getClass } from "@/actions/classes/get-class";
import { TabMenuLayout } from "@/components/shared/tab-menu-layout";

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
    params: {
        id: string;
    };
};

const ClassLayout = async ({ params: { id }, children }: Props) => {
    const { data: $class, error } = await getClass(id);

    if (error) throw new Error(error);
    if (!$class) return;

    return (
        <TabMenuLayout header={$class.name} contextData={$class}>
            <TabMenu URLPrefix={`/classes/${id}/`} items={tabMenuItems} />
            {children}
        </TabMenuLayout>
    );
};

export default ClassLayout;
