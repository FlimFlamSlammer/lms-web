"use client";

import { useAuth } from "@/components/providers/auth-provider";

const ProfilePage = () => {
  const { user } = useAuth();

  return <div>{user?.name}</div>;
};

export default ProfilePage;
