"use client";

import { useState } from "react";
import { login } from "../actions/auth/login";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <form
        action={async (formData) => {
          const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
          };

          const { error, errorFields } = await login(data);

          if (errorFields !== null) {
            setErrorFields(errorFields);
          } else if (error !== null) {
            alert("Something wrong happen");
          } else {
            router.replace("/");
          }
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Input email" />
          <p>{errorFields.email}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input name="password" placeholder="Input password" />
          <p>{errorFields.password}</p>
        </div>
        <button>Login</button>
      </form>
    </main>
  );
};

export default LoginPage;
