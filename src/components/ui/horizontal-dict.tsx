import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type HorizontalDictProps = {
    className?: string;
    children?: ReactNode;
};

export const HorizontalDict = ({
    className,
    children,
}: HorizontalDictProps) => {
    return (
        <div
            className={cn(
                className,
                "flex justify-start gap-x-10 gap-y-2 text-base flex-wrap"
            )}
        >
            {children}
        </div>
    );
};

export type HorizontalDictItemProps = {
    className?: string;
    children?: ReactNode;
};

export const HorizontalDictItem = ({
    className,
    children,
}: HorizontalDictItemProps) => {
    return <div className={cn(className, "flex gap-x-3")}>{children}</div>;
};

type HorizontalDictTextProps = {
    className?: string;
    children?: ReactNode;
};

export const HorizontalDictKey = ({
    className,
    children,
}: HorizontalDictTextProps) => {
    return (
        <span className={cn(className, "text-muted-foreground")}>
            {children}
        </span>
    );
};

export const HorizontalDictValue = ({
    className,
    children,
}: HorizontalDictTextProps) => {
    return <span className={className}>{children}</span>;
};
