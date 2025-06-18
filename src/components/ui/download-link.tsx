import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type DownloadLinkProps = {
    children?: ReactNode;
    className?: string;
    href: string;
};

export const DownloadLink = ({
    href,
    children,
    className,
}: DownloadLinkProps) => {
    return (
        <a
            href={href}
            className={cn(" text-blue-500 hover:underline", className)}
            download
        >
            {children}
        </a>
    );
};
