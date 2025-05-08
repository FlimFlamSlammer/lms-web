"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./button";
import { Separator } from "./separator";
import { ReactNode } from "react";
import { useSidebar } from "./sidebar";

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
                        className="material-symbols-outlined text-4xl"
                        onClick={() => {
                            toggleSidebar();
                        }}
                    >
                        menu
                    </Button>
                )}
                <h1 className="text-4xl font-light">{children}</h1>{" "}
            </div>

            <Separator className="mt-2 mb-4"></Separator>
        </>
    );
};
