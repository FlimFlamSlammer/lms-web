import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "./dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { ReactNode } from "react";

export const ActionsDropdown = ({ children }: { children: ReactNode }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">{children}</DropdownMenuContent>
        </DropdownMenu>
    );
};
