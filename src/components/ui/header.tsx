"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./button";
import { Separator } from "./separator";
import { ReactNode } from "react";
import { useSidebar } from "./sidebar";
import { Menu } from "lucide-react";

export const Header = ({ children }: { children: ReactNode }) => {
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();

    return (
        <>
            <div className="flex flex-row gap-4 items-center">
                {isMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            toggleSidebar();
                        }}
                    >
                        <Menu strokeWidth={1} />
                    </Button>
                )}
                <h1 className="text-4xl font-light">{children}</h1>{" "}
            </div>

            <Separator className="mt-2 mb-4"></Separator>
        </>
    );
};
