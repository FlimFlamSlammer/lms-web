"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";
import { HTMLInputTypeAttribute } from "react";
import { Input } from "./input";

export type FormFilterField = {
    name: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
};

export const FormFilter = ({ fields }: { fields: FormFilterField[] }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <form
            className="flex items-center gap-x-2"
            action={async (formData) => {
                const params = new URLSearchParams(searchParams);
                for (const pair of formData.entries()) {
                    if (pair[1]) {
                        params.set(pair[0], pair[1].toString());
                    } else {
                        params.delete(pair[0]);
                    }
                }

                router.replace(`${pathname}?${params.toString()}`);
            }}
        >
            {fields.map((field: FormFilterField) => {
                return (
                    <Input
                        placeholder={field.placeholder}
                        name={field.name}
                        key={field.name}
                        type={field.name}
                        defaultValue={searchParams.get(field.name) || ""}
                    />
                );
            })}
            <Button type="submit" variant="outline">
                Search
            </Button>
        </form>
    );
};
