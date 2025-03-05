"use server";

import { getLoginCookie } from "@/helpers/auth/cookie";
import { User } from "@/types";

export const getAuthenticatedUser = async () => {
  const token = await getLoginCookie();

  const response = await fetch("http://localhost:5000/api/v1/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  const res: {
    error: string | null;
    errorFields: Record<string, string> | null;
    data: User | null;
  } = {
    error: null,
    errorFields: null,
    data: null,
  };

  if (!response.ok) {
    const data = await response.json();

    if (data.error.message) {
      res.error = data.error.message;
    } else if (data.error.fields) {
      res.errorFields = data.error.fields;
    }
  } else {
    const data = await response.json();
    res.data = data.data;
  }

  return res;
};
