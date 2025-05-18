import { ReactNode } from "react";
import { DataProvider } from "../providers/data-provider";
import { Header } from "../ui/header";

export type TabMenuLayoutProps = {
    children: ReactNode;
    header: string;
    contextData?: unknown;
};

export const TabMenuLayout = ({
    header,
    children,
    contextData,
}: TabMenuLayoutProps) => {
    return (
        <>
            <Header>{header}</Header>
            <div className="flex flex-row w-full h-min-full gap-8">
                <DataProvider value={contextData}>{children}</DataProvider>
            </div>
        </>
    );
};
