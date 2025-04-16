"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const UserFormFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    return (
        <form
            className="flex items-center gap-x-2"
            action={async (formData) => {
                const params = new URLSearchParams(searchParams);
                const searchValue = String(formData.get("search"));
                if (searchValue) {
                    params.set("search", searchValue);
                } else {
                    params.delete("search");
                }

                router.replace(`/users?${params.toString()}`);
            }}
        >
            <Input
                placeholder="Search"
                className="max-w-sm"
                name="search"
                id="search"
                defaultValue={searchParams.get("search") || ""}
            />
            <Button type="submit">Search</Button>
        </form>
    );
};
