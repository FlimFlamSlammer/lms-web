import { TabMenu, TabMenuItem } from "@/components/ui/tab-menu";
import { ReactNode } from "react";
import { getClass } from "@/actions/classes/get-class";
import { TabMenuLayout } from "@/components/shared/tab-menu-layout";
import { DataProvider } from "@/components/providers/data-provider";

const tabMenuItems: TabMenuItem[] = [
    {
        title: "People",
        href: "people",
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

const ClassLayout = async ({ params, children }: Props) => {
    const id = (await params).id;
    const { data: $class, error } = await getClass(id);

    if (error) throw new Error(error);
    if (!$class) return;

    return (
        <TabMenuLayout header={$class.name} contextData={$class}>
            <DataProvider value={$class}>
                <TabMenu URLPrefix={`/classes/${id}/`} items={tabMenuItems} />
                {children}
            </DataProvider>
        </TabMenuLayout>
    );
};

export default ClassLayout;
