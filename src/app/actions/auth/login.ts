"use server";
// means only be access by server component.

import { setLoginCookie } from "@/helpers/auth/cookie";

export const login = async (dto: { email: string; password: string }) => {
  const response = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(dto),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = {
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
    await setLoginCookie(data.data.token);
    res.data = data.data.user;
  }

  return res;
};
