import { TabMenu, TabMenuItem } from "@/components/ui/tab-menu";
import { ReactNode } from "react";
import { getUser } from "@/actions/users/get-user";
import { TabMenuLayout } from "@/components/shared/tab-menu-layout";
import { DataProvider } from "@/components/providers/data-provider";

const tabMenuItems: TabMenuItem[] = [
    {
        title: "Profile",
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

const UserLayout = async ({ params, children }: Props) => {
    const id = (await params).id;
    const { data: user, error } = await getUser(id);

    if (error) {
        throw new Error(error);
    }

    if (!user) return;

    return (
        <TabMenuLayout header={user?.name} contextData={user}>
            <DataProvider value={user}>
                <TabMenu URLPrefix={`/users/${id}/`} items={tabMenuItems} />
                {children}
            </DataProvider>
        </TabMenuLayout>
    );
};

export default UserLayout;
