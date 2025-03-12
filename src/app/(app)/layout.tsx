import { AuthGuard } from "@/components/providers/auth-provider";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <main className="bg-white w-full min-h-screen">{children}</main>
    </AuthGuard>
  );
};

export default AppLayout;
