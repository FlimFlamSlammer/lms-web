import { Separator } from "./separator";
import { ReactNode } from "react";

export const Header = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <h1 className="text-4xl font-light">{children}</h1>{" "}
            <Separator className="mt-2 mb-4"></Separator>
        </>
    );
};
