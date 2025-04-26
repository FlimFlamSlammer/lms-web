import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
    return <main className="w-full min-h-screen">{children}</main>;
};

export default AuthLayout;
