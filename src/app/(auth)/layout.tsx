import { RedirectIfAuthenticated } from "@/components/shared/redirect-if-authenticated";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <RedirectIfAuthenticated>
      <main className="bg-white w-full min-h-screen">{children}</main>
    </RedirectIfAuthenticated>
  );
};

export default AuthLayout;
