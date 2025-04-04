"use server";

import { deleteLoginCookie } from "@/helpers/auth/cookie";
import { redirect } from "next/navigation";

export const logout = async () => {
    await deleteLoginCookie();
    redirect("/login");
};
