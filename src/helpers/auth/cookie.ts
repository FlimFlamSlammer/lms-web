"server only";
// can only be access by server action.

import { cookies } from "next/headers";

export const setLoginCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    path: "/",
    httpOnly: true,
    sameSite: true,
    maxAge: 2 * 24 * 60 * 60,
  });
};

export const deleteLoginCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};

export const getLoginCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token");
};
