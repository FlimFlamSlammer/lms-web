import { ReactNode } from "react";
import { Header } from "../ui/header";

export type TabMenuLayoutProps = {
    children: ReactNode;
    header: string;
    contextData?: unknown;
};

export const TabMenuLayout = ({ header, children }: TabMenuLayoutProps) => {
    return (
        <>
            <Header>{header}</Header>
            <div className="flex flex-row w-full h-min-full gap-8">
                {children}
            </div>
        </>
    );
};
