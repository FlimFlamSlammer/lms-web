"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";
import { ReactNode, useEffect } from "react";

type Props = { children: ReactNode };

export const RedirectIfAuthenticated = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/profile");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return children;
};
