import { AppSidebar } from "@/components/app-sidebar";
import { AuthGuard } from "@/components/providers/auth-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
    return (
        <AuthGuard>
            <SidebarProvider>
                <AppSidebar></AppSidebar>
                <main className="w-full min-h-screen">{children}</main>
            </SidebarProvider>
        </AuthGuard>
    );
};

export default AppLayout;
