"use client";

import { UserRole } from "@/types";
import { ReactNode, useMemo } from "react";
import { useAuth } from "../providers/auth-provider";

export type AccessControlProps = {
    roles: UserRole[];
    children?: ReactNode;
};

export const AccessControl = ({ roles, children }: AccessControlProps) => {
    const { user } = useAuth();

    const hasAccess = useMemo(() => {
        return user && roles.includes(user.role);
    }, [user, roles]);

    if (!hasAccess) return null;

    return children;
};
