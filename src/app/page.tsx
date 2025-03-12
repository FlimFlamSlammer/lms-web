"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { redirect } from "next/navigation";

const IndexPage = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    redirect("/profile");
  } else {
    redirect("/login");
  }

  return null;
};

export default IndexPage;
