"use client";

import { useSearchParams } from "next/navigation";
import { FormFilter, FormFilterSelect } from "./form-filter";
import { Input } from "./input";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";

export const FormFilterWithSearch = () => {
    const searchParams = useSearchParams();

    return (
        <FormFilter>
            <Input
                name="search"
                placeholder="Search"
                defaultValue={searchParams.get("search") || ""}
            />
        </FormFilter>
    );
};

export const FormFilterWithStatus = () => {
    const searchParams = useSearchParams();

    return (
        <FormFilter>
            <Input
                name="search"
                placeholder="Search"
                defaultValue={searchParams.get("search") || ""}
            />
            <FormFilterSelect
                name="status"
                defaultValue={searchParams.get("status") || ""}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                </SelectContent>
            </FormFilterSelect>
        </FormFilter>
    );
};
